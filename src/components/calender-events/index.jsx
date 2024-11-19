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
  LinkedIn_Error: <LinkedIn fill="#FF0000" width={12} height={12} />,
  LinkedIn_Page: <LinkedIn fill="#0077B5" width={12} height={12} />,
  LinkedIn_Page_Error: <LinkedIn fill="#FF0000" width={12} height={12} />,
  Twitter: <Twitter fill="#000000" width={12} height={12} />,
  Twitter_Error: <Twitter fill="#FF0000" width={12} height={12} />,
  Instagram: <Instagram width={12} height={12} />,
  Instagram_Error: <Instagram fill="#FF0000" width={12} height={12} />,
  Facebook_Page: <FacebookFilled fill={"#0095f6"} width={12} height={12} />,
  Facebook_Page_Error: <FacebookFilled fill={"#FF0000"} width={12} height={12} />,
  YouTube: <Youtube width={12} height={12} fill="#FF0000" />,
  YouTube_Error: <Youtube width={12} height={12} fill="#FF4500" />,
  Google_Business: <GoogleBusiness fill="#0077B5" width={12} height={12} />,
  Google_Business_Error: <GoogleBusiness fill="#FF0000" width={12} height={12} />,
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

  const iconsToShowOnPlatfroms = Array.isArray(platforms) && platforms.map((item) => {
    const platformName = item.platform;
    const errorIconName = `${platformName}_Error`;
    const platformIcon = item?.status === postStatuses.error
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

  const tooltipContent = (
    <div className="w-80 h-auto px-2  cursor-pointer border-l-slate-600 bottom-2 ">
      <div className="flex flex-wrap justify-between">
        <span className="flex font-bold text-xs"></span>
        <span className="font-bold text-xs">{postDate}</span>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <div class="flex flex-grow-1 gap-3 flex-wrap">
          {Array.isArray(platforms) && platforms?.map((item, index) => {
            const platformName = item.platform;
            const errorIconName = `${platformName}_Error`;
            const platformIcon = item?.status === postStatuses.error
              ? platformIcons[errorIconName]
              : platformIcons[platformName];

            const platformIconShow = platformIcon ? (
              <div key={platformName} className="mr-1">
                {platformIcon}
              </div>
            ) : null;
            return <span className={`mb-3 flex-shrink-0 flex-col rounded-lg ${statusClasses[status === 'Pending' ? status : status === 'Ongoing' ?  status : status === 'SaveAsDraft' ? '' : item?.status]}`}>

              {item?.status === postStatuses.published ? (
                <Badges platformIconsToShow={platformIconShow} status={item?.status} platforms={platforms} />
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
                  {index === 0 && <div class="flex items-center justify-start mt-2">
                    <div class="w-3 h-3 bg-gray-600 rounded-full"></div>{" "}
                    <div className="ml-2">Draft</div>
                  </div>}
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
                  <div className="flex">
                    <Badges
                      platformIconsToShow={platformIconShow}
                      status={item?.status}
                    />
                  </div>
                </>
              )}
            </span>
          })}
        </div>
        <hr className="flex-grow-1" />

        <div class="flex-grow-1 flex">{caption}</div>
      </div>
      <div className="flex h-12 overflow-hidden pointer-events-none mt-2">
        <span className="flex ">
          {Array.isArray(files) && files?.map((file, index) => {
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
      className="w-auto justify-between bg-white text-black border-gray-300 border-2"
      content={tooltipContent}
    >
      <div
        onClick={handleEditPost}
        className={`h-auto py-1 px-2 bg-white cursor-pointer border-l-4 rounded-md ${status === postStatuses.saveAsDraft ? statusClasses[status] : 'border-l-green-400'
          }`}
      >
        <div className="flex flex-wrap gap-1 justify-between">
          <p className="flex font-bold text-xs">{iconsToShowOnPlatfroms}</p>
          <p className="font-bold text-xs">{eventTime}</p>
        </div>
        <div className="mt-1 mb-1 overflow-hidden">
          <p className="text-xs">{caption}</p>
        </div>
        <div className="flex flex-wrap pointer-events-none">
          {Array.isArray(files) && files?.map((file, index) => {
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
