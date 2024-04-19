import React from "react";
import DesktopMockup from "../mockups/DesktopMockup";
import MobileMockup from "../mockups/MobileMockup";
import ButtonGroup from "../button-group";
import { SocialPlatforms } from "../../utils";
import { Button } from "@material-tailwind/react";

const PostPreview = ({
  selectedPlaforms,
  viewMode,
  selectedPreview,
  handlePostFeed,
  handlePlatformPreview,
  handlePreview,
  handleView,
  togglePreview,
}) => {
  return (
    <div className="bg-gray-100 w-[620px] h-full flex flex-col rounded-r-md items-center relative">
      <Button
        className="absolute rounded-full flex justify-center items-center h-6 top-3 right-3 2xl:hidden"
        onClick={togglePreview}
      >
        Show post
      </Button>
      <div className="flex flex-row  my-5">
        {selectedPlaforms?.map((item, index) => {
          const { platform } = item;
          const isSelected = platform === selectedPreview.platform;
          const { coloredIcon, nonColoredIcon } = SocialPlatforms[platform];
          return (
            <div
              key={index}
              onClick={() => handlePlatformPreview(item)}
              className={` rounded-xl px-3 py-1 ${index > 0 && "ml-1"} ${
                isSelected && "bg-[#D3D3D3]"
              }  rounded cursor-pointer hover:bg-gray-100`}
            >
              {isSelected ? coloredIcon(22, 22) : nonColoredIcon(22, 22)}
            </div>
          );
        })}
      </div>

      <div className="h-[620px] w-full overflow-x-hidden overflow-y-auto">
        {viewMode ? (
          <DesktopMockup>{handlePreview()}</DesktopMockup>
        ) : (
          <MobileMockup>{handlePreview()}</MobileMockup>
        )}
      </div>

      <div>
        <ButtonGroup handleClick={handleView} groups={["MOBILE", "DESKTOP"]} />
      </div>
    </div>
  );
};

export default PostPreview;
