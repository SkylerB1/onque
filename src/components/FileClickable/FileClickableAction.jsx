import React from "react";
import Cross from "../svg/Cross";
import Edit from "../svg/Edit";
import MenuItems from "../svg/menu-items";
import { isContainImage } from "../../utils";

const OnFileClickableAction = ({
  file,
  index,
  handlePopoverClick,
  onClickEdit,
  removeimg,
  selectedPlaforms,
}) => {
  const platformCondition = selectedPlaforms.some(
    (item) =>
      (item.platform === "YouTube" && item.mediaType === "SHORTS") ||
      item.platform === "LinkedIn"
  );

  return (
    <>
      <div
        onClick={(e) => handlePopoverClick(e, file)}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 bg-black items-center flex cursor-pointer"
      >
        <MenuItems width={22} height={22} />
      </div>

      {platformCondition && (
        <div
          onClick={() => removeimg(index)}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 bg-white items-center flex cursor-pointer"
        >
          <Cross width={22} height={22} />
        </div>
      )}

      {isContainImage(file) && (
        <div
          onClick={() => onClickEdit(index)}
          className="absolute rounded-full border bg-white right-1 bottom-1 cursor-pointer"
        >
          <Edit width={22} height={22} />
        </div>
      )}
    </>
  );
};

export default OnFileClickableAction;
