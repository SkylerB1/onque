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
import { postStatuses } from "../common/commonString";

const platformIcons = {
  LinkedIn: <LinkedIn fill="#0077B5" width={12} height={12} />,
  LinkedIn_Page: <LinkedIn fill="#0077B5" width={12} height={12} />,
  Twitter: <Twitter fill="#000000" width={12} height={12} />,
  Instagram: <Instagram width={12} height={12} />,
  Facebook_Page: <FacebookFilled fill={"#0095f6"} width={12} height={12} />,
  YouTube: <Youtube width={12} height={12} fill="#FF0000" />,
  Google_Business: <GoogleBusiness fill="#0077B5" width={12} height={12} />,
  TikTok_Personal: <Tiktok width={12} height={12} />,
  TikTok_Business: <Tiktok width={12} height={12} />,
};

const Event = ({
  setIsEdit,
  caption,
  status,
  eventContentType,
  eventTime,
  platformLogo,
  files,
  dataData,
  postDate,
}) => {
  const statusClasses = {
    [postStatuses.published]: "",
    [postStatuses.pending]: "bg-[#688FA4]",
    [postStatuses.error]: "bg-red-200",
    [postStatuses.saveAsDraft]: "bg-gray-200",
  };

  const platforms = Array.isArray(ParseData(platformLogo))
    ? ParseData(platformLogo)
    : [];

  const POST_IMG_BASE_PATH = import.meta.env.VITE_POST_IMG_BASE_PATH;

  const platformIconsToShow = platforms.map((item) => {
    const platformName = item.platform;
    const platformIcon = platformIcons[platformName];
    return platformIcon ? (
      <div key={platformName} className="mr-1">
        {platformIcon}
      </div>
    ) : null;
  });

  const handleEditPost = () => {
    setIsEdit(status);
  };

  const tooltipContent = (
    <div className="w-80 h-auto px-2  cursor-pointer border-l-slate-600 bottom-2 ">
      <div className="flex flex-wrap justify-between">
        <span className="flex font-bold text-xs"></span>
        <span className="font-bold text-xs">{postDate}</span>
      </div>
      <div className="mt-1 h-11">
        <span className={`mb-3 rounded-lg ${statusClasses[status]}`}>
          {status === postStatuses.published ? (
            <Badges platformIconsToShow={platformIconsToShow} status={status} />
          ) : status === postStatuses.pending ? (
            <span className="px-4">Pending</span>
          ) : status === postStatuses.saveAsDraft ? (
            <>
              <div>
                <Badges
                  platformIconsToShow={platformIconsToShow}
                  status={status}
                />
              </div>
              <div class="flex items-center justify-start mt-2">
                <div class="w-3 h-3 bg-gray-600 rounded-full"></div>{" "}
                <div className="ml-2">Draft</div>
              </div>
            </>
          ) : status === postStatuses.ongoing ? (
            <>
              <div class="flex items-center justify-start mt-2">
                <div class="w-3 h-3 bg-green-100 rounded-full"></div>{" "}
                <div className="ml-2">Ongoing</div>
              </div>
            </>
          ) : (
            <span className="px-4">Error</span>
          )}
        </span>
        <hr className="mt-2" />

        <div>{caption}</div>
      </div>
      <div className="flex mt-6 mb-1 h-12 overflow-hidden pointer-events-none">
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
    <Tooltip
      className="w-auto justify-between bg-white text-black border-gray-300 border-2 h-40"
      content={tooltipContent}
    >
      <div
        onClick={handleEditPost}
        className={`h-auto py-1 px-2 bg-white cursor-pointer border-l-4 rounded-md ${status === postStatuses.saveAsDraft ? statusClasses[status] : 'border-l-green-400'
          }`}
      >
        <div className="flex flex-wrap gap-1 justify-between">
          <p className="flex font-bold text-xs">{platformIconsToShow}</p>
          <p className="font-bold text-xs">{eventTime}</p>
        </div>
        <div className="mt-1 mb-1 overflow-hidden">
          <p className="text-xs">{caption}</p>
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
  );
};

export default Event;
