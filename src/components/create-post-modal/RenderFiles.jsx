import React, { useMemo, useRef } from "react";
import Cross from "../svg/Cross";
import Edit from "../svg/Edit";
import PlayFilled from "../svg/PlayFilled";
import { getSource, isContainImage, isContainVideo } from "../../utils";

const RenderFiles = ({
  files,
  handleimgError,
  handleVideoError,
  removeimg,
  OpenEditor,
  handleEdit,
  isDuplicating,
}) => {
  const memoizedSources = useMemo(() => {
    return files.map((file) => getSource(file));
  }, [files]);
  const videoRef = useRef();

  const onClickEdit = (index) => {
    handleEdit(index);
    OpenEditor();
  };

  return (
    <div className="flex flex-row">
      {files?.map((file, index) => {
        const src = memoizedSources[index];
        return (
          <div
            key={index}
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
                  onLoadedMetadata={() =>
                    handleVideoError(
                      videoRef.current?.videoWidth,
                      videoRef.current?.videoHeight,
                      index,
                      videoRef.current?.duration,
                      file.size
                    )
                  }
                  src={src}
                  className="w-full h-full rounded-md object-cover"
                />
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
                onLoad={(image) => handleimgError(image, index, file.size)}
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
        );
      })}
    </div>
  );
};

export default RenderFiles;
