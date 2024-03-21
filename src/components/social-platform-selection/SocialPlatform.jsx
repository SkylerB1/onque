import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { SocialPlatforms } from "../../utils";
import { useLocalStorage } from "../../utils/LocalStorage";
import DownArrow from "../svg/DownArrow";

const SocialPlatform = ({
  brandId,
  screenName,
  selectedPlaforms,
  setSelectedPlatforms,
  selectedPreview,
  setSelectedPreview,
  platform,
}) => {
  const [open, setOpen] = useState(false);
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
      const newPlatforms = [...selectedPlaforms, newPlatform];
      setSelectedPlatforms(newPlatforms);
      const platformNames = JSON.stringify(newPlatforms);
      useLocalStorage(
        `brand.${brandId}.planner.networks`,
        "add",
        platformNames
      );
    } else {
      const newPlatforms = selectedPlaforms.filter(
        (item) => item.platform != platform
      );
      
      if (newPlatforms.length > 0) {
        if (selectedPreview.platform === platform) {
          setSelectedPreview(newPlatforms[0]);
        }
        setSelectedPlatforms(newPlatforms);
        const platformNames = JSON.stringify(newPlatforms);
        useLocalStorage(
          `brand.${brandId}.planner.networks`,
          "add",
          platformNames
        );
      }
    }
  };

  const handleSelect = (type) => {
    let plaforms = [...selectedPlaforms];
    plaforms.forEach((element) => {
      if (element.platform == platform) {
        element.mediaType = type;
      }
    });

    setSelectedPlatforms(plaforms);
    setSelectedPreview((prev) => ({ ...prev, mediaType: type }));
  };

  const handler = () => {
    setOpen(!open);
  };

  const isSelectedMediaType = (type) => {
    return type === selected?.mediaType;
  };

  return (
    <>
      <Tooltip content={screenName + tooltipSuffix}>
        {selected ? (
          <div
            className="cursor-pointer relative ml-3"
            onClick={handlePlatform}
          >
            {coloredIcon(22, 22)}
            {options.length > 0 && (
              <div className="absolute -right-1 -bottom-1 bg-white rounded-full w-4 h-4 flex justify-center items-center">
                {options.map((item, index) => {
                  if (item.label == selected.mediaType) {
                    return <span key={index}>{item.icon()}</span>;
                  }
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="cursor-pointer ml-3" onClick={handlePlatform}>
            {nonColoredIcon(22, 22)}
          </div>
        )}
      </Tooltip>
      {selected && options.length > 0 && (
        <Menu open={open} handler={handler} placement="bottom-start">
          <MenuHandler>
            <Button
              variant="text"
              size="sm"
              className="flex items-center uppercase h-5 min-w-max px-2 bg-[#f5f5f5] ml-2"
            >
              <Typography className="text-[0.62rem]">
                {selected?.mediaType}
              </Typography>
              <span className="ml-1">
                <DownArrow width={12} height={12} fill={"#000000"} />
              </span>
            </Button>
          </MenuHandler>
          <MenuList className="px-0">
            {options?.map((item, index) => {
              const { icon, label, description } = item;
              const selectedMediaType = isSelectedMediaType(label);
              return (
                <MenuItem
                  key={index}
                  onClick={() => handleSelect(label)}
                  className={`flex items-center gap-4 py-2 pl-2 pr-8 rounded-none ${
                    selectedMediaType ? "bg-[#eee]" : "bg-white"
                  }`}
                >
                  {icon(15, 15)}
                  <div>
                    <Typography
                      className={`text-xs ${
                        selectedMediaType ? "font-bold" : "font-normal"
                      }`}
                    >
                      {label}
                    </Typography>
                    <Typography
                      className={`text-[0.72rem] ${
                        selectedMediaType ? "font-bold" : "font-normal"
                      }`}
                    >
                      {description}
                    </Typography>
                  </div>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default SocialPlatform;
