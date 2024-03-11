import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { SocialPlatforms } from "../../utils";

const SocialPlatform = ({
  tooltip,
  screenName,
  selectedPlaforms,
  setSelectedPlatforms,
  selectedPreview,
  setSelectedPreview,
  platform,
}) => {
  const selected = selectedPlaforms.find((item) => item.platform === platform);
  const {
    mediaOptions,
    mediaType,
    coloredIcon,
    nonColoredIcon,
    tooltipSuffix,
  } = SocialPlatforms[platform];
  const options = mediaOptions || [];

  const handlePlatform = () => {
    const newPlatform = {
      platform,
      screenName,
      mediaType: mediaType || "POST",
    };
    if (!selected) {
      setSelectedPlatforms((prev) => [...prev, newPlatform]);
    } else {
      const newPlatforms = selectedPlaforms.filter(
        (item) => item.platform != platform
      );
      if (newPlatforms.length > 0) {
        if (selectedPreview.platform === platform) {
          setSelectedPreview(newPlatforms[0]);
        }
        setSelectedPlatforms(newPlatforms);
      }
    }
  };

  const handleSelect = (e) => {
    let plaforms = [...selectedPlaforms];
    plaforms.forEach((element) => {
      if (element.platform == platform) {
        element.mediaType = e.target.value;
      }
    });

    setSelectedPlatforms(plaforms);
    setSelectedPreview((prev) => ({ ...prev, mediaType: e.target.value }));
  };

  return (
    <>
      <Tooltip content={tooltip + tooltipSuffix}>
        {selected ? (
          <div
            className="cursor-pointer relative ml-3"
            onClick={handlePlatform}
          >
            {coloredIcon()}
            {options.length > 0 && (
              <div className="absolute -right-1 -bottom-1 bg-white rounded-full w-4 h-4 flex justify-center items-center">
                {options.map((item, index) => {
                  if (item.label == selected.mediaType) {
                    return <span key={index}>{item.icon}</span>;
                  }
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="cursor-pointer ml-3" onClick={handlePlatform}>
            {nonColoredIcon()}
          </div>
        )}
      </Tooltip>
      {selected && options.length > 0 && (
        <select
          style={{ paddingRight: "1.5rem" }}
          onChange={handleSelect}
          className="tracking-wider bg-gray-100 hover:bg-gray-200 focus:outline-none border-none rounded-xl py-0 appearance-none cursor-pointer ml-2 text-[10px]"
        >
          {options?.map((item, id) => {
            return (
              <option className="text-sm" key={id}>
                {item.label}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default SocialPlatform;
