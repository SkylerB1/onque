import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { MdLink } from "react-icons/md";
import defaultPrrofile from "../../assets/defaultProfile.jpg";
import advanture from "../../assets/advanture.jpg";
import advantureRiver from "../../assets/advantureRiver.jpg";
import Instagram from "../../components/svg/Instagram";
import Twitter from "../../components/svg/Twitter";
import FacebookFilled from "../../components/svg/FacebookFilled";
import LinkedIn from "../../components/svg/LinkedIn";
import Youtube from "../../components/svg/Youtube";
import Email from "../../components/svg/Email";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const SmartView = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.smartLink.value);
  const iconsData = useSelector((state) => state.smartIcons.value) || [];
  const media = useSelector((state) => state.smartLinkMedia.value) || [];


  // Local icon mapping
  const iconMapping = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: FacebookFilled,
    linkedIn: LinkedIn,
    youtube: Youtube,
    email: Email,
  };

  return (
    <div>
      <div className="flex-none p-4">
        <div className="m-10 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center w-full justify-center">
            <Button
              size="sm"
              variant="outlined"
              className="flex items-center gap-2"
              // onClick={() => navigate("/smartlink/view")}
            >
              <MdLink size={16} />
              View Live
            </Button>
          </div>
          <div className="min-w-[80%] min-h-screen border-gray-900 border-8 border-y-[36px] rounded-2xl overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <div className="p-5 flex justify-center flex-col items-center">
              <div>
                <img
                  className="w-36 h-36 mt-5 rounded-lg"
                  src={defaultPrrofile}
                  alt="Profile"
                />
              </div>
              <div className="mt-5 font-semibold text-2xl">Aston+k</div>
              <div className="mt-10 w-[80%] space-y-5">
                {data?.map((item, index) => {
                  const { bgColor, borderColor, isDisabled, text, textColor, url } = item.values;
                  return (
                    <div key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        style={{
                          backgroundColor: bgColor.hex,
                          borderColor: borderColor.hex,
                          color: textColor.hex,
                        }}
                        disabled={isDisabled}
                        onClick={() => window.open(url, "_blank")}
                      >
                        {text}
                      </Button>
                    </div>
                  );
                })}

                <div className="w-96 pl-4">
                  <div className="w-80 px-4 flex flex-wrap gap-4 justify-center">
                    {Array.isArray(iconsData) && iconsData.map((icon, index) => {
                      const IconComponent = iconMapping[icon.iconName];
                      if (!IconComponent) return null; // Skip if icon component is not found
                      return (
                        <IconButton
                          key={index}
                          variant="outlined"
                          className="rounded-full"
                          onClick={() => window.open(icon?.url, "_blank")}
                        >
                          <IconComponent width={18} height={18} fill={icon.fill} />
                        </IconButton>
                      );
                    })}
                  </div>
                </div>
                <div className="mediaBlock flex flex-row flex-wrap gap-4 justify-center cursor-pointer">
                  {media.map((mediaItem, index) => (
                    <div key={index} className="mt-5">
                      {mediaItem.mediaType === "image" && (
                        <img
                          className="w-24 h-24 rounded-lg"
                          src={mediaItem.mediaUrl}
                          alt={`Media ${index + 1}`}
                          onClick={() => window.open(mediaItem?.navigationUrl, "_blank")}
                        />
                      )}
                      {mediaItem.mediaType === "video" && (
                        <video
                          className="w-24 h-24 rounded-lg"
                          controls
                          onClick={() => window.open(mediaItem?.navigationUrl, "_blank")}
                        >
                          <source src={mediaItem.mediaUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartView;
