import React, { useMemo, useState, useEffect, useRef } from "react";
import CreatePostModal from "../create-post-modal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventDateFormat from "../calender-events/DateFormat";
import Event from "../calender-events";
import InstaReel from "../../assets/InstaReel";
import Grid from "../../assets/Grid";
import useConnections from "../customHooks/useConnections";
import dayjs from "dayjs";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import {
  abbreviateString,
  getTextForRoleInfo,
  isJSON,
} from "../../utils/commonUtils";
import StoryCarousel from "../mockups/facebook/StoryCarousel";
import { useAppContext } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/Interceptor";
import {
  API_URL,
  SocialPlatforms,
  toastrError,
  toastrSuccess,
} from "../../utils";
import PostsService from "../../services/PostsService";
import SocialPreviews from "../social-previews/SocialPreviews";
import PostStatusIcon from "../common/PostStatusIcon";
import PostStatusFilterDropdown from "../common/PostStatusFilterDropdown";

const PostCalendar = (props) => {
  const [statusFilter, setStatusFilter] = React.useState([]);
  const { validations } = useAppContext();
  const navigate = useNavigate();
  const { getPostData, events, role } = props;
  const [files, setFiles] = useState([]);
  const [videoDurations, setVideoDurations] = useState([]);
  const [caption, setCaption] = useState("");
  const [postData, setPostData] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setModal] = useState(false);
  const [textForRoleInfo, setTextForRoleInfo] = useState(null);
  const [draggingEvent, setDraggingEvent] = useState(false);
  const [showAlert, setShowAlert] = useState(true); // Add state to control visibility
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [refreshPreview, setRefreshPreview] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const { connections } = useConnections();
  const fullAccess = useMemo(() => !role || role?.fullAccessPlanner, [role]);
  const calendarRef = useRef(null);
  const renderContentType = (type) => {
    if (type === "reels") {
      return <InstaReel height={12} width={12} />;
    } else if (type === "post") {
      return <Grid height={12} width={12} />;
    }
  };
  const onDrawerTransitionEnd = () => {
    calendarRef.current?.getApi().updateSize();
    window.dispatchEvent(new Event("resize"));
  };

  const updatePostData = async (
    eventInfo,
    openModalOverride = true,
    indexOverride = null
  ) => {
    let eventDef, extendedProps;

    // Handle both FullCalendar eventInfo and raw event object
    if (eventInfo.event) {
      eventDef = eventInfo.event._def;
      extendedProps = eventInfo.event._def.extendedProps;
    } else {
      eventDef = eventInfo; // raw event
      extendedProps = eventInfo.extendedProps || {};
    }

    const {
      title = "",
      rowId,
      files,
      platform,
      postdate,
      status,
      socialPresets,
      thumbnailPresets,
      thumbnailFiles,
    } = {
      ...eventDef,
      ...extendedProps,
    };

    if (!platform || platform.length === 0) return false;

    let result = await PostsService.getPostInsights(rowId);
    let postInsights = [];
    if (result.status === true) {
      postInsights = result.data.postInsights;
    }

    const data = {
      caption: title,
      id: rowId,
      files: files,
      platforms: isJSON(platform) ? JSON.parse(platform) : platform,
      status: status,
      socialPresets: socialPresets ? JSON.parse(socialPresets) : null,
      postInsights,
      thumbnailPresets: thumbnailPresets ? JSON.parse(thumbnailPresets) : null,
      thumbnailFiles: thumbnailFiles ? thumbnailFiles : [],
    };

    setPostData(data);
    setCaption(title);
    setFiles([...files]);
    setScheduledDate(dayjs(postdate));
    setIsEdit(true);

    let idx =
      indexOverride !== null
        ? indexOverride
        : events.findIndex((ev) => {
            return ev.rowId === rowId;
          });

    setSelectedPostIndex(idx !== -1 ? idx : null);
    if (openModalOverride) setModal(true);
  };

  const handlePrevPost = async (e) => {
    if (e) e.stopPropagation();
    if (selectedPostIndex > 0) {
      const prevEvent = events[selectedPostIndex - 1];
      await updatePostData(prevEvent, true, selectedPostIndex - 1);
    }
  };

  const handleNextPost = async (e) => {
    if (e) e.stopPropagation();
    if (selectedPostIndex < events.length - 1) {
      const nextEvent = events[selectedPostIndex + 1];
      await updatePostData(nextEvent, true, selectedPostIndex + 1);
    }
  };

  const renderEventContent = (eventInfo) => {
    const images_arr = eventInfo.event._def.extendedProps.files;
    const status = eventInfo.event._def.extendedProps.status;
    const rowId = eventInfo.event._def.extendedProps.rowId;

    const publishDate = eventInfo.event._context.dateProfileGenerator.nowDate;
    let dateStr = EventDateFormat(publishDate);
    let postDate = new Date(eventInfo.event._def.extendedProps.postdate);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedPostTime = postDate.toLocaleTimeString("en-US", timeOptions);
    const formattedPostDate = postDate.toLocaleDateString("en-US", options);

    return (
      <Event
        caption={eventInfo.event._def.title}
        status={status}
        dataData={dateStr}
        eventTime={formattedPostTime}
        postDate={formattedPostDate}
        setIsEdit={setIsEdit}
        platformsData={eventInfo.event._def.extendedProps.platform}
        eventContentType={renderContentType(
          eventInfo.event._def.extendedProps.contentType
        )}
        postId={rowId}
        files={images_arr}
      />
    );
  };

  const handleModal = () => {
    if (openModal) {
      setModal(false);
      setIsEdit(false);
      setSelectedPostIndex(null);
      clearPostData();
    } else {
      setModal(true);
    }
  };

  const selectData = (info) => {
    const date = dayjs(info.date);
    setScheduledDate(date);
    setModal(true);
  };

  const clearPostData = () => {
    setPostData(null);
    setCaption("");
    setFiles([]);
    setIsEdit(false);
    setSelectedPostIndex(null);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  }, [drawerOpen]);

  const handleEventDrop = async (info) => {
    const { event } = info;
    let date = dayjs(event.start).startOf("minute");

    const { rowId } = event._def.extendedProps;
    const status = info.event._def.extendedProps.status;

    const data = {
      scheduledDate: date,
      status,
    };

    try {
      const response = await axiosInstance.patch(
        API_URL + `/user/update/post-time/${rowId}`,
        data
      );
      if (response.status === 200) {
        getPostData();
        toastrSuccess("Post schedule has been updated");
      } else {
        toastrError("Failed to update post");
      }
    } catch (err) {
      console.log(err);
      toastrError("Error updating post");
    }
  };

  const eventDragStart = (info) => {
    const status = info.event._def.extendedProps.status;
    setDraggingEvent(status === "SaveAsDraft" || status === "Pending");
  };

  const eventAllow = (dropInfo, draggedEvent) => {
    const start = dropInfo.start;
    const now = new Date();
    return draggingEvent && start >= now;
  };

  useEffect(() => {
    let textForRoleInfo = getTextForRoleInfo(role);

    setTextForRoleInfo(textForRoleInfo);
  }, [role]);

  useEffect(() => {
    if (connections && connections.length > 0) {
      setSelectedConnection(connections[0]);
    }
  }, [connections]);

  return (
    <>
      <div className="md:my-2 xl:mt-24 lg:mt-24 relative">
        {/* Role Info Section */}
        {textForRoleInfo != null &&
          textForRoleInfo.length != 0 &&
          showAlert && (
            <>
              <div
                id="alert-additional-content-1"
                className="relative p-4 mb-4 mt-8 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <h3 className="text-lg font-medium">
                    {textForRoleInfo &&
                      textForRoleInfo?.map(
                        (value, index) =>
                          value.title +
                          (textForRoleInfo.length - 1 < index ? " , " : "")
                      )}
                  </h3>
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-blue-800 bg-transparent hover:bg-blue-200 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setShowAlert(false)} // Hide the alert
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <div className="mt-2 mb-4 text-sm">
                  {textForRoleInfo &&
                    textForRoleInfo?.map((value, index) => (
                      <React.Fragment key={index}>
                        {value.description}
                        <br />
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </>
          )}
        {/* Role Info Section End Here */}
        {fullAccess && (
          <>
            <div className="flex items-center justify-between border-2 border-black rounded-md py-2 px-5 mb-5">
              <span className="text-sm text-black">
                {/* You have posted{" "}
                <strong>
                  {" "}
                  {validations?.posts_count_monthly} out of your{" "}
                  {validations?.max_posts_monthly}{" "}
                </strong>{" "}
                available posts in your plan this month.
                {validations?.max_posts_monthly < 12000 &&
                  "Upgrade your plan to increase the limit."} */}
                Easily upgrade and downgrade your OnQue subscription to suite
                your clients needs.
              </span>
              {/* {validations.max_posts_monthly < 12000 && ( */}
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block gradient-button-solid normal-case whitespace-nowrap text-sm md:text-sm mr-1"
                onClick={() => navigate("/setting/price")}
              >
                Upgrade
              </Button>
              {/* )} */}
            </div>

            {/* {validations?.posts_count_monthly <
              validations?.max_posts_monthly && ( */}
            <>
              <Button
                size="sm"
                onClick={handleModal}
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center flex items-center"
              >
                <IoMdAdd className="w-5 h-5 mr-1" />
                Create Post
              </Button>
            </>
            {/* )} */}
          </>
        )}

        {/* Main content: calendar and drawer side by side */}
        <div className="flex w-full transition-all duration-300">
          <div className="flex-1 min-w-0 transition-all duration-300">
            <Card className="mt-2">
              <CardBody>
                <FullCalendar
                  key={`calendar-${drawerOpen}`}
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    right: `today prev,next${
                      !drawerOpen ? " feedPreview" : " closePreview"
                    }`,
                    left: "title",
                  }}
                  customButtons={{
                    feedPreview: {
                      text: "Feed Preview",
                      click: () => setDrawerOpen(true),
                    },
                    closePreview: {
                      text: "Close Preview",
                      click: () => setDrawerOpen(false),
                    },
                  }}
                  buttonText={{
                    today: "Today",
                  }}
                  firstDay={1}
                  weekends={true}
                  allDaySlot={false}
                  events={events}
                  nowIndicator={true}
                  eventContent={renderEventContent}
                  eventMinHeight={80}
                  eventBackgroundColor="transparent"
                  eventBorderColor="transparent"
                  eventTextColor="#000000"
                  eventMouseEnter={(e) => {
                    const x = e.el;
                    x.parentNode.style.zIndex = 999;
                  }}
                  eventMouseLeave={(e) => {
                    const x = e.el;
                    x.parentNode.style.zIndex = 1;
                  }}
                  eventClick={function (info) {
                    updatePostData(info, true); // always open modal on calendar click
                  }}
                  dateClick={function (info) {
                    if (info.date >= new Date()) {
                      selectData(info);
                    }
                  }}
                  height="76vh"
                  editable={true}
                  droppable={true}
                  eventDrop={handleEventDrop}
                  eventDragStart={eventDragStart}
                  eventAllow={eventAllow}
                />
                {openModal && (
                  <CreatePostModal
                    openModal={openModal}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    setModal={setModal}
                    handleModal={handleModal}
                    connections={connections}
                    postData={postData}
                    clearPostData={clearPostData}
                    files={files}
                    setFiles={setFiles}
                    videoDurations={videoDurations}
                    setVideoDurations={setVideoDurations}
                    setCaption={setCaption}
                    caption={caption}
                    getPostData={getPostData}
                    scheduledDate={scheduledDate}
                    setScheduledDate={setScheduledDate}
                    setRefreshPreview={setRefreshPreview}
                    onPrev={handlePrevPost}
                    onNext={handleNextPost}
                    canPrev={selectedPostIndex > 0}
                    canNext={selectedPostIndex < events.length - 1}
                  />
                )}
              </CardBody>
            </Card>
          </div>
          {/* Drawer as a sibling, not fixed */}
          <div
            onTransitionEnd={onDrawerTransitionEnd}
            className={`transition-all duration-300 ${
              drawerOpen ? "w-88" : "w-0"
            } ...`}
            style={{ width: drawerOpen ? "22rem" : 0 }}
          >
            {drawerOpen && (
              <div className="h-full flex flex-col">
                <PostStatusFilterDropdown onStatusChange={setStatusFilter} />
                {/* Only show icons for connections */}
                <div className="flex gap-3 px-4 py-2 border-b">
                  {connections &&
                    connections.map((conn, idx) => {
                      const platformObj = SocialPlatforms[conn.platform];
                      if (!platformObj) return null;
                      const isSelected =
                        selectedConnection && selectedConnection.id === conn.id;
                      return (
                        <div
                          key={conn.id}
                          className={`cursor-pointer rounded-full p-1 border ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedConnection(conn)}
                          title={conn.screenName}
                        >
                          {isSelected
                            ? platformObj.coloredIcon(28, 28)
                            : platformObj.nonColoredIcon(28, 28)}
                        </div>
                      );
                    })}
                </div>
                <div className="p-4 flex-1">
                  <SocialPreviews
                    connection={selectedConnection}
                    statusFilter={statusFilter || []}
                    refreshPreview={refreshPreview}
                    setRefreshPreview={setRefreshPreview}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCalendar;
