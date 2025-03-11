import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";
import VideoThumbnail from "react-video-thumbnail";
import PlayFilled from "../svg/PlayFilled";
import LinkedIn from "../svg/LinkedIn";
import Twitter from "../svg/Twitter";
import Instagram from "../svg/Instagram";
import FacebookFilled from "../svg/FacebookFilled";
import Youtube from "../svg/Youtube";
import GoogleBusiness from "../svg/GoogleBusiness";
import { Badges } from "../common/badge";
import { ParseData } from "../../utils/ParseData";
import Tiktok from "../svg/Tiktok";
import { isContainVideo } from "../../utils";
import {
  postStatuses,
  TikTokPersonal,
  TikTokBusiness,
  GoogleBusinessPlatform,
} from "../common/commonString";
import InfoModal from "../modal/InfoModal";
import { Alert } from "@material-tailwind/react";
import { abbreviateString } from "../../utils/commonUtils";
import PostsService from "../../services/PostsService";
import { Link } from "react-router-dom";

const platformIcons = {
  LinkedIn: <LinkedIn fill="#0077B5" width={12} height={12} />,
  LinkedIn_Error: <LinkedIn fill="#FF0000" width={12} height={12} />,
  LinkedIn_Page: <LinkedIn fill="#0077B5" width={12} height={12} />,
  LinkedIn_Page_Error: <LinkedIn fill="#FF0000" width={12} height={12} />,
  Twitter: <Twitter fill="#000000" width={12} height={12} />,
  Twitter_Error: <Twitter fill="#FF0000" width={12} height={12} />,
  Instagram: <Instagram width={12} height={12} />,
  Instagram_Error: <Instagram fill="#FF0000" width={12} height={12} />,
  Facebook_Page: <FacebookFilled fill={"#0095f6"} width={12} height={12} />,
  Facebook_Page_Error: (
    <FacebookFilled fill={"#FF0000"} width={12} height={12} />
  ),
  YouTube: <Youtube width={12} height={12} fill="#FF0000" />,
  YouTube_Error: <Youtube width={12} height={12} fill="#FF4500" />,
  Google_Business: <GoogleBusiness fill="#0077B5" width={12} height={12} />,
  Google_Business_Error: (
    <GoogleBusiness fill="#FF0000" width={12} height={12} />
  ),
  TikTok_Personal: <Tiktok width={12} height={12} />,
  TikTok_Personal_Error: <Tiktok width={12} height={12} fill="#FF0000" />,
  TikTok_Business: <Tiktok width={12} height={12} />,
  TikTok_Business_Error: <Tiktok width={12} height={12} fill="#FF0000" />,
};

const Event = ({
  setIsEdit,
  caption,
  status,
  eventContentType,
  eventTime,
  platformsData,
  files,
  dataData,
  postDate,
  postId,
}) => {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id || "";

  const statusClasses = {
    [postStatuses.published]: "",
    [postStatuses.pending]: "bg-[#688FA4]",
    [postStatuses.error]: "bg-red-200",
    [postStatuses.saveAsDraft]: "bg-gray-200",
  };

  const platforms = Array.isArray(ParseData(platformsData))
    ? ParseData(platformsData)
    : [];

  const POST_IMG_BASE_PATH = import.meta.env.VITE_POST_IMG_BASE_PATH;

  // get the plateform icon to show
  const iconsToShowOnPlatfroms =
    Array.isArray(platforms) &&
    platforms.map((item) => {
      const platformName = item.platform;
      const errorIconName = `${platformName}_Error`;
      const platformIcon =
        item?.status === postStatuses.error
          ? platformIcons[errorIconName]
          : platformIcons[platformName];

      return platformIcon ? (
        <div key={platformName} className="mr-1">
          {platformIcon}
        </div>
      ) : null;
    });

  const handleEditPost = () => {
    setIsEdit(status);
  };

  const [openTooltip, setOpenTooltip] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);

  // Handles tooltip open/close based on hover
  const handleMouseEnter = () => setOpenTooltip(true);
  const handleMouseLeave = () => setOpenTooltip(false);

  const [showInfoModal, setInfoModal] = useState(false);
  const [infoData, setInfoData] = useState({
    content: "",
  });

  const openInfoModal = (platformName, errorMessage) => {
    switch (platformName) {
      case GoogleBusinessPlatform:
        if (errorMessage?.error?.status === "UNAUTHENTICATED") {
          setInfoData({
            content: (
              <Alert variant="outlined">
                You account is unauthenticated for this platform.Kindly go to
                connection page and reset the connection for this platform.
              </Alert>
            ),
          });
          setInfoModal(true);
        }

        break;
      case TikTokPersonal:
        console.log(errorMessage, TikTokPersonal);
        if (errorMessage?.error?.message || typeof errorMessage === "string") {
          setInfoData({
            content: (
              <Alert color="red" variant="outlined">
                {errorMessage?.error?.message || errorMessage}
              </Alert>
            ),
          });
          setInfoModal(true);
        }
        break;
      // ... more cases ...
      default:
        // Statements executed when none of the cases match the expression
        break; // Optional, but recommended
    }
  };

  const closeInfoModal = () => {
    setInfoModal(false);
  };

  const checkSuccessReponse = async (platformName, item) => {
    switch (platformName) {
      case TikTokPersonal:
        let { publish_id } = item.message.data;

        if (!publish_id) return;

        const result = await PostsService.getTiktokPostStatus(
          brandId,
          postId,
          platformName,
          publish_id
        );

        const status = result?.data?.status;
        const failReason = result?.data?.fail_reason;
        const errorMessage =
          result?.error?.message ||
          (status === "FAILED" && `Post failed. Reason: ${failReason}`) ||
          (status === "PROCESSING_DOWNLOAD" && "File is being uploaded.") ||
          (status &&
            status !== "PUBLISH_COMPLETE" &&
            `Post status is ${status}`);

        if (status === "PUBLISH_COMPLETE") {
          const postIds = result?.data?.publicaly_available_post_id;
          const username = result?.tiktok_username;
          if (postIds && username) {
            let contents = postIds.map((postId, index) => {
              const tiktokUrl = `https://www.tiktok.com/@${username}/video/${postId}`;
              let content = (
                <Link to={tiktokUrl} target="_blank">
                  Preview Post {postIds.length > 1 ? index : ""}
                </Link>
              );
              return content;
            });

            setInfoData({
              content: contents,
            });
            setInfoModal(true);
          }
        } else if (errorMessage) {
          setInfoData({
            content: (
              <Alert color="red" variant="outlined">
                {errorMessage}
              </Alert>
            ),
          });
          setInfoModal(true);
        }

        break;
      // ... more cases ...
      default:
        // Statements executed when none of the cases match the expression
        break; // Optional, but recommended
    }
  };
  const tooltipContent = (
    <div
      className="w-80 h-auto px-2  cursor-pointer border-l-slate-600 bottom-2 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-wrap justify-between">
        <span className="flex font-bold text-xs"></span>
        <span className="font-bold text-xs">{postDate}</span>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <div class="flex flex-grow-1 gap-3 flex-wrap">
          {Array.isArray(platforms) &&
            platforms?.map((item, index) => {
              const platformName = item.platform;
              const errorIconName = `${platformName}_Error`;
              const platformIcon =
                item?.status === postStatuses.error
                  ? platformIcons[errorIconName]
                  : platformIcons[platformName];

              const platformIconShow = platformIcon ? (
                <div key={platformName} className="mr-1">
                  {platformIcon}
                </div>
              ) : null;

              let errorMessage = {};
              if (item?.status === postStatuses.error) {
                errorMessage = item?.message;
              }

              return (
                <span
                  className={`mb-3 flex-shrink-0 flex-col rounded-lg ${
                    statusClasses[
                      status === "Pending"
                        ? status
                        : status === "Ongoing"
                        ? status
                        : status === "SaveAsDraft"
                        ? ""
                        : item?.status
                    ]
                  }`}
                >
                  {item?.status === postStatuses.published ? (
                    <>
                      {/* Success Case */}
                      <div
                        onClick={() => checkSuccessReponse(platformName, item)}
                      >
                        <Badges
                          platformIconsToShow={platformIconShow}
                          status={item?.status}
                          platforms={platforms}
                        />
                      </div>
                    </>
                  ) : status === postStatuses.pending ? (
                    index === 0 && <span className="px-4">Pending</span>
                  ) : status === postStatuses.saveAsDraft ? (
                    <>
                      <div>
                        <Badges
                          platformIconsToShow={platformIconShow}
                          status={status}
                        />
                      </div>
                      {index === 0 && (
                        <div class="flex items-center justify-start mt-2">
                          <div class="w-3 h-3 bg-gray-600 rounded-full"></div>{" "}
                          <div className="ml-2">Draft</div>
                        </div>
                      )}
                    </>
                  ) : status === postStatuses.ongoing ? (
                    <>
                      <div class="flex items-center justify-start mt-2">
                        <div class="w-3 h-3 bg-green-100 rounded-full"></div>{" "}
                        <div className="ml-2">Ongoing</div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Error case */}
                      <div
                        className="flex"
                        onClick={() =>
                          openInfoModal(platformName, errorMessage)
                        }
                      >
                        <Badges
                          platformIconsToShow={platformIconShow}
                          status={item?.status}
                        />
                      </div>
                    </>
                  )}
                </span>
              );
            })}
        </div>
        <hr className="flex-grow-1" />

        <div class="flex-grow-1 flex">{abbreviateString(caption, 100)}</div>
      </div>
      <div className="flex h-12 overflow-hidden pointer-events-none mt-2">
        <span className="flex ">
          {files?.map((file, index) => {
            return isContainVideo(file) ? (
              <div className="relative " key={index}>
                <div className="w-12 h-12 rounded-md overflow-hidden thumbnailImg">
                  <VideoThumbnail
                    videoUrl={POST_IMG_BASE_PATH + file.filename}
                  />
                </div>
                <div className="absolute left-2 top-2 flex justify-center">
                  <div className="drop-shadow-2xl">
                    <PlayFilled width={35} height={35} fill="#ffffff" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 ml-1" key={index}>
                <img
                  key={index}
                  className="rounded-md w-full h-full object-cover"
                  src={POST_IMG_BASE_PATH + file.filename}
                />
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );

  return (
    <div postId={postId}>
      <Tooltip
        className="w-auto justify-between bg-white text-black border-gray-300 border-2"
        content={tooltipContent}
        open={openTooltip}
        handler={setOpenTooltip}
      >
        <div
          onClick={handleEditPost}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`h-auto py-1 px-2 bg-white cursor-pointer border-l-4 rounded-md ${
            status === postStatuses.saveAsDraft
              ? statusClasses[status]
              : "border-l-green-400"
          }`}
        >
          <div className="flex flex-wrap gap-1 justify-between">
            <p className="flex font-bold text-xs">{iconsToShowOnPlatfroms}</p>
            <p className="font-bold text-xs">{eventTime}</p>
          </div>
          <div className="mt-1 mb-1 overflow-hidden">
            <p className="text-xs">{abbreviateString(caption, 20)}</p>
            <div postId={postId}></div>
          </div>
          <div className="flex flex-wrap pointer-events-none">
            {files?.map((file, index) => {
              return isContainVideo(file) ? (
                <div className="relative">
                  <div
                    key={index}
                    className=" w-9 h-9 m-1 rounded-md overflow-hidden thumbnailImg"
                  >
                    <VideoThumbnail
                      videoUrl={POST_IMG_BASE_PATH + file.filename}
                    />
                  </div>
                  <div className="absolute left-2 top-2 flex justify-center">
                    <div className="drop-shadow-2xl w-2 h-2">
                      <PlayFilled width={30} height={30} fill="#ffffff" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="w-9 h-9 m-1 rounded-md overflow-hidden"
                >
                  <img
                    className="rounded-md w-full h-full object-cover"
                    src={POST_IMG_BASE_PATH + file.filename}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Tooltip>
      <InfoModal
        show={showInfoModal}
        closeInfoModal={closeInfoModal}
        infoData={infoData}
      />
    </div>
  );
};

export default Event;
