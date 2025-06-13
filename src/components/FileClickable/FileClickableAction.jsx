import React, { useMemo } from "react";
import Cross from "../svg/Cross";
import Edit from "../svg/Edit";
import MenuItems from "../svg/menu-items";
import { API_URL, getSource, isContainImage } from "../../utils";
import { useSelector } from "react-redux";
import { deleteMedia } from "../../redux/features/thumbnailMediaSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../utils/Interceptor";

const OnFileClickableAction = ({
  file,
  index,
  handlePopoverClick,
  onClickEdit,
  removeimg,
  selectedPlaforms,
  filesCount,
  activeId,
  isEdit
}) => {
  const dispatch = useDispatch();
  const platformCondition = selectedPlaforms.some(
    (item) =>
      (item.platform === "YouTube" && item.mediaType === "SHORTS") ||
      item.platform === "LinkedIn" || filesCount > 1 || 
      item.platform === "Google_Business" || item.platform === "LinkedIn_Page"
      // || (item.platform === "Instagram" && item.mediaType === "STORY") || (item.platform === "Facebook_Page" && item.mediaType === "STORY")
  );
  const thumbnailMedia = useSelector((state) => state.thumbnailMedia.value) || [];
  const thumbnailSrc = useMemo(() => {
    const mediaType = isContainImage(file) ? "image" : "video";
    if (file && file?.name === thumbnailMedia[0]?.clickedOnFileName && mediaType === "video") {
      return thumbnailMedia[0]?.mediaUrl;
    } else if(thumbnailMedia?.length > 0 && thumbnailMedia[0]?.via === "editPost"){
      const mediaUrl = getSource(thumbnailMedia[0]?.file);
      return mediaUrl;
    }
  }, [thumbnailMedia, file]);

    const user = useSelector((state) => state.user.value);
    const brandId = user?.brand?.id;
    const UPDATE_POST_URL =
      API_URL + `/user/update/thumbnail/post/${activeId}?brandId=${brandId}`;

  const removethumbnailImage = async () => { 
      let data = {
        thumbnailPresets: null,
        thumbnailFiles: null,
      }
      if(isEdit) {
        dispatch(deleteMedia())
        const response = await axiosInstance.put(UPDATE_POST_URL, data);
      } else {
        dispatch(deleteMedia())
      }
  }


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
      {thumbnailSrc && (
        <div className="absolute bottom-[52px] -left-2 w-10 h-10 group">
          <img
            src={thumbnailSrc}
            className="rounded-full border-2 bg-white w-10 h-[44px] cursor-pointer"
            alt="Thumbnail"
          />
          <div
            onClick={() => removethumbnailImage()}
            className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:flex items-center justify-center cursor-pointer transition"
          >
            <Cross width={12} height={12} />
          </div>
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
