import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import SmartLinkButton from "../../../components/button/SmartLinkButton";
import CameraOutline from "../../../assets/camera-outline.svg?react";
import VideoCamera from "../../../assets/video-camera.svg?react";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import MediaComponent from "./MediaComponent";
import ImgUploadModal from "../../../components/upload-modal/ImageUploadModal";
import { getSource } from "../../../utils";
import VideoUploadModal from "../../../components/upload-modal/VideoUploadModal";
import { useSelector, useDispatch } from "react-redux";
import { addMedia, updateMedia, deleteMedia } from "../../../redux/features/smartLinkMediaSlice";

const MediaSettings = () => {
  const media = useSelector((state) => state.smartLinkMedia.value) || [];
  const dispatch = useDispatch();

  const [showimgUploadModal, setimgUploadModal] = useState(false);
  const [showVideoUploadModal, setVideoUploadModal] = useState(false);

  const updateMediaItem = (id, identifier, value) => {
    dispatch(updateMedia({ id, identifier, value }));
  };

  const addMediaItem = (mediaType, mediaUrl = "", file = null) => {
    dispatch(addMedia({
      id: media.length + 1,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      navigationUrl: "https://example.com",
      file: file ? { name: file.name, type: file.type } : null, // Store only serializable data
    }));
  };

  const deleteMediaItem = (id) => {
    dispatch(deleteMedia(id));
  };

  const handleFile = (files, mediaType) => {
    setimgUploadModal(false);
    setVideoUploadModal(false);
    files.forEach((item) => {
      const mediaUrl = getSource(item);
      addMediaItem(mediaType, mediaUrl, item);
      // setFiles((prevFiles) => [...prevFiles, ...files]);
    });
    Array.isArray(files) && files.map((item) => {
      let mediaUrl = getSource(item);
      addMedia(mediaType, mediaUrl, item);
    });
  };

  const toggleimgUploadModal = () => {
    setimgUploadModal(!showimgUploadModal);
  };

  const openImageModel = () => {
    setimgUploadModal(true);
  };

  const toggleVideoUploadModal = () => {
    setVideoUploadModal(!showVideoUploadModal);
  };

  const openVideoModel = () => {
    setVideoUploadModal(true);
  };

  return (
    <div>
      <div className="flex gap-2 w-full mt-10">
        <div className="w-1/2">
          <SmartLinkButton
            variant="outlined"
            fullWidth
            className="flex items-center gap-3"
            onClick={openImageModel}
          >
            <CameraOutline width={18} height={18} fill="#000000" />
            Add Image
          </SmartLinkButton>
        </div>
        <div className="w-1/2">
          <SmartLinkButton
            fullWidth
            variant="outlined"
            className="flex items-center gap-3"
            onClick={openVideoModel}
          >
            <VideoCamera width={20} height={20} fill="#000000" />
            Add Video
          </SmartLinkButton>
        </div>
      </div>
      {/* Conditional rendering of media items */}
      {media.length > 0 && media.map((mediaItem) => (
        <div key={mediaItem.id} className="border border-gray-900 rounded-lg flex xl:flex-col mt-10">
          <div className="flex items-center justify-center xl:border-b border-r border-gray-900 cursor-move">
            <BsThreeDots size={24} className="xl:block hidden" />
            <BsThreeDotsVertical size={24} className=" xl:hidden" />
          </div>
          <div className="pb-5 px-5">
            <MediaComponent
              mediaItem={mediaItem}
              updateMedia={updateMediaItem}
              deleteMedia={deleteMediaItem}
            />
          </div>
        </div>
      ))}
      <ImgUploadModal
        show={showimgUploadModal}
        onChange={handleFile}
        toggleModal={toggleimgUploadModal}
      />
      <VideoUploadModal
        show={showVideoUploadModal}
        onChange={handleFile}
        toggleModal={toggleVideoUploadModal}
      />
    </div>
  );
};

export default MediaSettings;
