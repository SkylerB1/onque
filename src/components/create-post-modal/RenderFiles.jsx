import React, { useState, useEffect, useMemo, useRef } from "react";
import Cross from "../svg/Cross";
import Edit from "../svg/Edit";
import PlayFilled from "../svg/PlayFilled";
import { getSource, isContainImage, isContainVideo } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from "react-loader-spinner";
import MenuItems from "../svg/menu-items";
import PopoverMenu from "../modal/PopoverMenu";
import ImgUploadModal from "../upload-modal/ImageUploadModal";

import { addMedia } from "../../redux/features/thumbnailMediaSlice";
import OnFileClickableAction from "../FileClickable/FileClickableAction";
import VideoSliderPopover from "../videoSliderPopover/videoSliderPopover";

const RenderFiles = ({
  files,
  handleimgError,
  handleVideoError,
  removeimg,
  OpenEditor,
  handleEdit,
  isDuplicating,
  setFiles,
  selectedPlaforms,
  setModelImageForThumbnail,
}) => {
  const memoizedSources = useMemo(() => {
    return Array.isArray(files) && files.map((file) => getSource(file));
  }, [files]);
  const dispatch = useDispatch();
  const videoRef = useRef();
  const [loadingStates, setLoadingStates] = useState({}); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [openPopover, setOpenPopover] = useState(false);
  const [showimgUploadModal, setimgUploadModal] = useState(false);
  const [droppableId, setDroppableId] = useState("");
  const media = useSelector((state) => state.thumbnailMedia.value) || [];
  const sliderTime = useSelector((state) => state.videoSlider);
  const [clickedFile, setClickedFile] = useState(null);
  const [showVideoSlider, setShowVideoSlider] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const onClickEdit = (index) => {
    handleEdit(index);
    OpenEditor();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);
    reorderedFiles.forEach((file, index) => {
      const mediaUrl = getSource(file);
      addMediaItem(file.type, mediaUrl, file);
    });
  };

const handleFile = (files, mediaType) => {
  setimgUploadModal(false);
  setModelImageForThumbnail(true);
  files.forEach((item) => {
    const mediaUrl = getSource(item);
    addMediaItem(mediaType, mediaUrl, item); // ✅ This is all you need
  });
};

  
    const toggleimgUploadModal = () => {
      setimgUploadModal(!showimgUploadModal);
      setModelImageForThumbnail(true);
    };
  
    const openImageModel = () => {
      setModelImageForThumbnail(true);
      setimgUploadModal(true);
    };

      const addMediaItem = (mediaType, mediaUrl = "", file = null) => {
        dispatch(addMedia({
          id: media.length + 1,
          mediaType: mediaType,
          mediaUrl: mediaUrl,
          navigationUrl: "https://example.com",
          file: file,
          clickedOnFileName: clickedFile?.name || null, // Store only serializable data
        }));
        setModelImageForThumbnail(false);
      };
  
  const openVideoSliderPopover = (file) => {
    setCurrentVideo(file);
    setShowVideoSlider(true);
  };
      


  useEffect(() => {
    if (files.length) {
      setDroppableId("files");
    }
  }, [files.length]);

  // Handle image load and video load
  const handleLoadStart = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
  };

  const handlePopoverClick = (event, file) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
    setClickedFile(file); // 👈 Save clicked file
  };
  

  const handlePopoverClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  const handleLoadEnd = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided) => (
          <div
            className="flex flex-row"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.isArray(files) &&
              files?.map((file, index) => {
                const src = memoizedSources[index];
                return (
                  <Draggable
                    key={file.id || index}
                    draggableId={String(file.id || index)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`relative border rounded-md w-20 h-20 flex items-center justify-center ${
                          index > 0 && "ml-3"
                        }`}
                      >
                        {isContainVideo(file) ? (
                          <>
                            <video
                            key={`${file.name}-${sliderTime.timeInSeconds}`}
                              ref={videoRef}
                              autoPlay={false}
                              muted={true}
                              onLoadedMetadata={() => {
                                handleVideoError(
                                  videoRef.current?.videoWidth,
                                  videoRef.current?.videoHeight,
                                  index,
                                  videoRef.current?.duration,
                                  file.size
                                );
                                if (videoRef.current && sliderTime.fileName === file.name) {
                                  videoRef.current.currentTime = sliderTime.timeInSeconds;
                                }
                              }}
                              onLoadStart={() => handleLoadStart(index)} // Start loader when video starts loading
                              onLoadedData={() => handleLoadEnd(index)} // Stop loader when video is ready
                              src={src}
                              className="w-full h-full rounded-md object-cover"
                            />
                            {loadingStates[index] && <VideoLoader />}{" "}
                            {/* Show loader */}
                            <div className="absolute right-0 left-0 flex justify-center">
                              <div className="drop-shadow-2xl">
                                <PlayFilled
                                  width={50}
                                  height={50}
                                  fill="#ffffff"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              alt=""
                              key={index}
                              className="w-full h-full object-cover rounded-md"
                              width={16}
                              height={16}
                              onLoadStart={() => handleLoadStart(index)} // Start loader when image starts loading
                              onLoad={(image) => {
                                handleimgError(image, index, file.size);
                                handleLoadEnd(index); // Stop loader when image is fully loaded
                              }}
                              loader={() => src}
                              src={src}
                            />
                          </>
                        )}
                        <OnFileClickableAction
                          file={file}
                          index={index}
                          handlePopoverClick={handlePopoverClick}
                          onClickEdit={onClickEdit}
                          removeimg={removeimg}
                          selectedPlaforms={selectedPlaforms}
                          filesCount={files.length}
                        />
                        <PopoverMenu
                          anchorEl={anchorEl}
                          open={openPopover}
                          onClose={handlePopoverClose}
                          onThumbnailUpload={openImageModel}
                          removeimg={removeimg}
                          index={index}
                          onOpenVideoSlider={() => openVideoSliderPopover(clickedFile)}
                          selectedPlaforms={selectedPlaforms}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showVideoSlider && (
        <VideoSliderPopover
          videoFile={currentVideo}
          onClose={() => setShowVideoSlider(false)}
        />
      )}

      <ImgUploadModal
        show={showimgUploadModal}
        onChange={handleFile}
        toggleModal={toggleimgUploadModal}
      />
    </DragDropContext>
  );
};

export default RenderFiles;

// Optional spinner library for better visual
export function VideoLoader({ progress }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
      <Oval
        height={50}
        width={50}
        color="white" // The loader will be white
        secondaryColor="gray"
        strokeWidth={5}
        strokeWidthSecondary={5}
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
}
