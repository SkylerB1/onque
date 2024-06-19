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
import {
  abbreviateString,
  getTextForRoleInfo,
  isJSON,
} from "../../utils/commonUtils";

const PostCalendar = (props) => {
  const { getPostData, events, role } = props;
  const [files, setFiles] = useState([]);
  const [videoDurations, setVideoDurations] = useState([]);
  const [caption, setCaption] = useState("");
  const [postData, setPostData] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setModal] = useState(false);
  const [textForRoleInfo, setTextForRoleInfo] = useState(null);

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
    const { rowId, files, platform, postdate } = extendedProps;
    const data = {
      caption: title,
      id: rowId,
      files: files,
      platforms: isJSON(platform) ? JSON.parse(platform) : platform,
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
    const formattedPostDate = postDate.toLocaleDateString("en-US", options);

    return (
      <Event
        caption={abbreviateString(eventInfo.event._def.title)}
        status={status}
        dataData={dateStr}
        eventTime={eventInfo.timeText}
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
                        (textForRoleInfo.legth - 1 < index ? " , " : "")
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
          <Button
            size="sm"
            onClick={handleModal}
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center flex items-center"
          >
            <IoMdAdd className="w-5 h-5 mr-1" />
            Create Post
          </Button>
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
