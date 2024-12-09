import React, { useState, useEffect, useMemo, useRef } from "react";
import Cross from "../svg/Cross";
import Edit from "../svg/Edit";
import PlayFilled from "../svg/PlayFilled";
import { getSource, isContainImage, isContainVideo } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Oval } from "react-loader-spinner";

const RenderFiles = ({
  files,
  handleimgError,
  handleVideoError,
  removeimg,
  OpenEditor,
  handleEdit,
  isDuplicating,
  setFiles,
}) => {
  const memoizedSources = useMemo(() => {
    return Array.isArray(files) && files.map((file) => getSource(file));
  }, [files]);

  const videoRef = useRef();
  const [loadingStates, setLoadingStates] = useState({}); // State to track loading state of each file

  const onClickEdit = (index) => {
    handleEdit(index);
    OpenEditor();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);
    setFiles(reorderedFiles);
  };

  const [droppableId, setDroppableId] = useState("");

  useEffect(() => {
    if (files.length) {
      setDroppableId("files");
    }
  }, [files.length]);

  // Handle image load and video load
  const handleLoadStart = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
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
                              }}
                              onLoadStart={() => handleLoadStart(index)} // Start loader when video starts loading
                              onLoadedData={() => handleLoadEnd(index)} // Stop loader when video is ready
                              src={src}
                              className="w-full h-full rounded-md object-cover"
                            />
                            {loadingStates[index] && <VideoLoader />} {/* Show loader */}
                            <div className="absolute right-0 left-0 flex justify-center">
                              <div className="drop-shadow-2xl">
                                <PlayFilled width={50} height={50} fill="#ffffff" />
                              </div>
                            </div>
                          </>
                        ) : (
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
                        )}
                        {!isDuplicating && (
                          <>
                            <div
                              onClick={() => {
                                removeimg(index);
                              }}
                              className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 bg-white items-center flex cursor-pointer"
                            >
                              <Cross width={22} height={22} />
                            </div>
                            {isContainImage(file) && (
                              <div
                                onClick={() => onClickEdit(index)}
                                className="absolute rounded-full border bg-white right-1 bottom-1 cursor-pointer"
                              >
                                <Edit width={22} height={22} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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