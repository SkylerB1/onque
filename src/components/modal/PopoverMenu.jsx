import React, { useState } from "react";
import { Popover, MenuList, MenuItem } from "@mui/material";
import DeleteIconFilled from "../../assets/DeleteIconFilled";
import { FaFileImage } from "react-icons/fa";
import { RxSlider } from "react-icons/rx";

const PopoverMenu = ({
  anchorEl,
  open,
  onClose,
  onThumbnailUpload,
  removeimg,
  index,
  onOpenVideoSlider,
  selectedPlaforms,
}) => {
  const platformCondition = selectedPlaforms.some(
    (item) =>
      (item.platform === "Instagram")
  );
  const handleClose = () => {
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList>
        <MenuItem
          className="gap-3"
          onClick={() => {
            onThumbnailUpload();
            handleClose();
          }}
        >
          <FaFileImage width={20} height={20} />
          Upload Video Thumbnail
        </MenuItem>
        {platformCondition && (
        <MenuItem
        className="gap-3"
        onClick={() => {
          onOpenVideoSlider();
          handleClose();
        }}
      >
        <RxSlider width={20} height={20} />
        Preview & Scrub
      </MenuItem>
        )}

        <MenuItem
          className="gap-3"
          onClick={() => {
           removeimg(index);
            handleClose();
          }}
        >
          <DeleteIconFilled width={20} height={20} />
          Remove
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default PopoverMenu;
