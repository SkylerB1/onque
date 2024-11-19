import React, { useEffect, useState } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import SmartLinkButton from "../../../components/button/SmartLinkButton";
import CameraOutline from "../../../assets/camera-outline.svg?react";
import VideoCamera from "../../../assets/video-camera.svg?react";
import advanture from "../../../assets/advanture.jpg";
import advantureRiver from "../../../assets/advantureRiver.jpg";
import natureStatusVideo from "../../../assets/natureStatusVideo.mp4";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import MediaComponent from "./MediaComponent";
import ImgUploadModal from "../../../components/upload-modal/ImageUploadModal";
import { getSource } from "../../../utils";
import VideoUploadModal from "../../../components/upload-modal/VideoUploadModal";
const MediaSettings = () => {
  const defaultMedia = [
    {
      id: 1,
      mediaType: "image",
      mediaUrl: advanture,
      navigationUrl: "https://example.com",
      file: null,
    },
    {
      id: 2,
      mediaType: "video",
      mediaUrl: natureStatusVideo,
      navigationUrl: "https://example.com",
      file: null,
    },
  ];
  const [media, setMedia] = React.useState(defaultMedia);
  const [showimgUploadModal, setimgUploadModal] = useState(false);
  const [showVideoUploadModal, setVideoUploadModal] = useState(false);

  const [files, setFiles] = useState([]);

  const updateMedia = (id, identifier, value) => {
    setMedia((prev) =>
      prev.map((item) =>
        item.id != id ? item : { ...item, [identifier]: value }
      )
    );
  };

  const addMedia = (mediaType, mediaUrl = "", file = null) => {
    // toggleimgUploadModal();
    setMedia((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        navigationUrl: "https://example.com",
        file: file,
      },
    ]);
  };
  const deleteMedia = (id) => {
    setMedia((prev) => prev.filter((item) => item.id != id));
  };

  const handleFile = (files, mediaType) => {
    setimgUploadModal(false);
    setVideoUploadModal(false);
    setFiles((prevFiles) => [...prevFiles, ...files]);
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
  const openViddeoModel = () => {
    setVideoUploadModal(true);
  };
  return (
    <div>
      <div className="flex gap-2 w-full mt-10">
        <div class="w-1/2">
          <SmartLinkButton
            variant="outlined"
            fullWidth
            className="flex items-center gap-3 "
            onClick={openImageModel}
          >
            <CameraOutline width={18} height={18} fill="#000000" />
            Add Image
          </SmartLinkButton>
        </div>
        <div class="w-1/2">
          <SmartLinkButton
            fullWidth
            variant="outlined"
            className="flex items-center gap-3"
            onClick={openViddeoModel}
          >
            <VideoCamera width={20} height={20} fill="#000000" />
            Add Video
          </SmartLinkButton>
        </div>
      </div>
      {Array.isArray(media) && 
        media.map((mediaItem) => (
          <div className="border border-gray-900 rounded-lg flex xl:flex-col mt-10">
            <div className="flex items-center justify-center xl:border-b   border-r  border-gray-900 cursor-move">
              <BsThreeDots size={24} className="xl:block hidden" />
              <BsThreeDotsVertical size={24} className=" xl:hidden" />
            </div>
            <div className=" pb-5 px-5">
              <div className="" key={mediaItem.id}>
                <MediaComponent
                  mediaItem={mediaItem}
                  updateMedia={updateMedia}
                  deleteMedia={deleteMedia}
                />
              </div>
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
