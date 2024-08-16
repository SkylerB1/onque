import React from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import advanture from "../../../assets/advanture.jpg";
import advantureRiver from "../../../assets/advantureRiver.jpg";

const MediaComponent = ({ mediaItem, updateMedia, deleteMedia }) => {
  const handleInputChange = (e) => {
    let navigationUrlValue = e.target.value;
    updateMedia(mediaItem.id, "navigationUrl", navigationUrlValue);
  };
  const handleDelete = () => {
    deleteMedia(mediaItem.id);
  };

  return (
    <div>
      <div className="media-section flex flex-wrap xl:flex-nowrap items-center gap-4 mt-4">
        <div className="xl:w-[15%] w-full">
          {mediaItem.mediaType == "image" && (
            <>
              <img
                className="w-full xl:h-24 h-48 rounded-lg"
                src={mediaItem.mediaUrl}
              />
            </>
          )}
          {mediaItem.mediaType == "video" && (
            <>
              <video
                width="600"
                height="400"
                className="w-full xl:h-24 h-48 rounded-lg"
              >
                <source src={mediaItem.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </div>
        <div className="w-[80%]">
          <Input
            label="URL"
            value={mediaItem.navigationUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[5%] flex ">
          <IconButton variant="outlined">
            <MdDelete
              size={24}
              className="cursor-pointer "
              onClick={handleDelete}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MediaComponent;
