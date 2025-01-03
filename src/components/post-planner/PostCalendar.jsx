import React, { useMemo, useState, useEffect } from "react";
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
import { IoMdAdd } from "react-icons/io";
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
  toastrError,
  toastrSuccess
} from "../../utils";

const PostCalendar = (props) => {
  const  {validations}  = useAppContext();
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
  const { connections } = useConnections();
  const fullAccess = useMemo(() => !role || role?.fullAccessPlanner, [role]);

  const renderContentType = (type) => {
    if (type === "reels") {
      return <InstaReel height={12} width={12} />;
    } else if (type === "post") {
      return <Grid height={12} width={12} />;
    }
  };

  const updatePostData = async (eventInfo) => {
    const { title = "", extendedProps = {} } = eventInfo.event._def;

    const { rowId, files, platform, postdate, status, socialPresets } =
      extendedProps;

    if (!platform || platform.length == 0) return false;
    const data = {
      caption: title,
      id: rowId,
      files: files,
      platforms: isJSON(platform) ? JSON.parse(platform) : platform,
      status: status,
      socialPresets: socialPresets ? JSON.parse(socialPresets) : null,
    };

    setPostData(data);
    setCaption(title);
    setFiles((prev) => [...prev, ...files]);
    setScheduledDate(dayjs(postdate));
    handleModal();
  };

  const renderEventContent = (eventInfo) => {
    const images_arr = eventInfo.event._def.extendedProps.files;
    const status = eventInfo.event._def.extendedProps.status;
    // console.log({ status });
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
        caption={abbreviateString(eventInfo.event._def.title)}
        status={status}
        dataData={dateStr}
        eventTime={formattedPostTime}
        postDate={formattedPostDate}
        setIsEdit={setIsEdit}
        platformLogo={eventInfo.event._def.extendedProps.platform}
        eventContentType={renderContentType(
          eventInfo.event._def.extendedProps.contentType
        )}
        files={images_arr}
      />
    );
  };

  const handleModal = () => {
    setModal(!openModal);
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
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    const newStartDate = event.start;
    const { rowId } = event._def.extendedProps;
    const status = info.event._def.extendedProps.status;

    const data = {
      scheduledDate: dayjs(newStartDate).format('YYYY-MM-DDTHH:mm:ss'),
      status
    };

    try {
      const response = await axiosInstance.patch( API_URL + `/user/update/post-time/${rowId}`, data);
      if (response.status === 200) {
        getPostData();
        toastrSuccess('Post schedule has been updated');
      } else {
        toastrError('Failed to update post');
      }
    } catch (err) {
      console.log(err);
      toastrError('Error updating post');
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
 
  return (
    <>
      <div className="md:my-2 xl:mt-24 lg:mt-24">
        {/* Role Info Section */}
        {textForRoleInfo != null && textForRoleInfo.length != 0 && (
          <>
            <div
              id="alert-additional-content-1"
              className="p-4 mb-4 mt-8 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
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
                You have posted <strong> {validations?.posts_count_monthly} out of your {validations?.max_posts_monthly} </strong> available posts in your plan this month.{validations?.max_posts_monthly < 12000 && "Upgrade your plan to increase the limit."}
              </span>
                  {validations.max_posts_monthly < 12000  && <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block gradient-button-solid normal-case whitespace-nowrap text-sm md:text-sm mr-1"
                    onClick={() => navigate("/setting/price")}
                  >
                    Upgrade
                  </Button>}
            </div>

            {validations?.posts_count_monthly < validations?.max_posts_monthly && <Button
              size="sm"
              onClick={handleModal}
              className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center flex items-center"
            >
              <IoMdAdd className="w-5 h-5 mr-1" />
              Create Post
            </Button>}
          </>
        )}
        <Card className="mt-2">
          <CardBody>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
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
                updatePostData(info);
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
              />
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PostCalendar;