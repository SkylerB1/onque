import Globe from "../../../assets/facebook-globe.svg?react";
import Like from "../../../assets/facebook-like.svg?react";
import Comment from "../../../assets/facebook-comment.svg?react";
import Share from "../../../assets/facebook-share.svg?react";
import FacebookPlay from "../../../assets/facebook-play.svg?react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VideoComponent from "../../video/VideoComponent";
import ImageComponent from "../../Image/ImageComponent";
import { getSource, isContainImage } from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";

function Post({ files, captions, viewMode, screenName, date }) {
  const [play, setPlay] = useState([false, false, false, false, false]);
  const videoRef = useRef([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const memoizedSources = useMemo(() => {
    return Array.isArray(filteredFiles) && filteredFiles.map((file) => getSource(file));
  }, [filteredFiles]);

  const togglePlay = useCallback(
    (index) => {
      let newItem = [...play];
      newItem[index] = true;
      setPlay(newItem);
      videoRef.current[index]?.play();
    },
    [play]
  );

  useEffect(() => {
    if (files?.length > 0) {
      const mediaType = isContainImage(files[0]) ? "image" : "video";
      const filterFiles = files?.filter((item) => {
        const fileType = item.type || item.mimetype;
        return fileType.includes(mediaType);
      });
      if (mediaType === "video") {
        const video = filterFiles.slice(0, 1);
        setFilteredFiles(video);
      } else {
        setFilteredFiles(filterFiles);
      }
    } else {
      setFilteredFiles(files);
    }
  }, [files]);

  const renderVideoComponent = (index = 0) => {
    const src = memoizedSources[index];
    return (
      <VideoComponent
        ref={(el) => (videoRef.current[0] = el)}
        className={"w-full h-full object-cover"}
        key={index}
        index={index}
        loop={true}
        autoPlay={false}
        muted={true}
        controls={play[index]}
        src={src}
        play={!play[index]}
        onTogglePlay={togglePlay}
        icon={<FacebookPlay width={40} height={40} />}
        draggable="false"
      />
    );
  };

  const renderImageComponent = (index = 0) => {
    const src = memoizedSources[index];
    return (
      <img
        key={index}
        alt="img"
        className="w-full h-full object-cover"
        width={16}
        height={16}
        src={src}
        draggable="false"
      />
    );
  };

  const renderMedia = useCallback(() => {
    if (filteredFiles.length === 1) {
      return Array.isArray(filteredFiles) && filteredFiles.map((file, index) => {
        let mimeType = file.type || file.mimetype;
        if (mimeType.includes("video")) {
          return renderVideoComponent(index);
        } else {
          return renderImageComponent(index);
        }
      });
    } else if (filteredFiles.length === 2) {
      return Array.isArray(filteredFiles) && filteredFiles.map((file, index) => {
        let mediaType = file.type || file.mimetype;
        if (mediaType.includes("image")) {
          return (
            <div
              key={index}
              className={`${
                index > 0 && "ml-[1px]"
              } relative justify-center items-center flex flex-1 h-full`}
            >
              {renderImageComponent(index)}
            </div>
          );
        }
      });
    } else if (filteredFiles.length === 3) {
      return (
        <div className="flex flex-1 flex-row h-full">
          <div className="flex flex-1 h-full ">{renderImageComponent(0)}</div>

          <div className="flex flex-1 flex-col w-full h-full ml-[2px]">
            <div className="flex flex-1 h-1/2">{renderImageComponent(1)}</div>

            <div className="flex flex-1 h-1/2 mt-[2px]">
              {renderImageComponent(2)}
            </div>
          </div>
        </div>
      );
    } else if (filteredFiles.length === 4) {
      return Array.isArray(filteredFiles) && filteredFiles.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-1/2 h-1/2 ${
              index == 0
                ? "pb-[1px]"
                : index == 1
                ? "pl-[1px] pb-[1px]"
                : index == 3
                ? "pl-[1px]"
                : ""
            }`}
          >
            {renderImageComponent(index)}
          </div>
        );
      });
    } else if (filteredFiles.length >= 5) {
      return Array.isArray(filteredFiles) && filteredFiles.map((item, index) => {
        const src = memoizedSources[index];
        if (index < 2) {
          return (
            <div
              key={index}
              className={`w-1/2 pb-[1px] ${index == 1 ? " pl-[1px]" : ""}`}
            >
              <>
                <img
                  alt="img"
                  className="w-full h-full object-cover"
                  width={1}
                  height={1}
                  src={src}
                />
              </>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={`relative h-1/3 ${index < 5 ? "w-1/3" : ""} ${
                index < 4 ? " pr-[1px]" : ""
              } `}
            >
              <>
                {index < 5 && (
                  <img
                    alt="img"
                    className="w-full h-full object-cover"
                    width={1}
                    height={1}
                    src={src}
                  />
                )}
                {index == 4 && filteredFiles.length > 5 && (
                  <div className="absolute bg-black/30 flex justify-center items-center  w-full top-0 bottom-0">
                    <p className="text-3xl text-white font-bold">
                      +{filteredFiles.length - 5}{" "}
                    </p>
                  </div>
                )}
              </>
            </div>
          );
        }
      });
    } else {
      return;
    }
  }, [filteredFiles]);

  // return <>Testing</>;
  return (
    <>
      <div className="flex flex-row justify-between items-center px-3 mt-10 mb-2">
        <div className="flex flex-row items-center">
          <div className="px-3 py-1  rounded-full bg-green-900">
            <h1 className="text-white text-lg">{screenName.charAt(0)}</h1>
          </div>
          <div className="flex flex-col ml-2 justify-between">
            <h1 className="text-sm font-bold leading-none">{screenName}</h1>
            <div className="flex flex-row items-center">
              {date && (
                <h3 className="text-xs text-gray-400 mr-1"> {date} · </h3>
              )}
              <Globe width={12} height={12} fill="#D3D3D3" />
            </div>
          </div>
        </div>
        <HorizontalDots width={20} height={20} fill="#737373" />
      </div>

      {captions && (
        <p className="px-3 text-sm mb-2 whitespace-pre-line"> {captions} </p>
      )}

      {files?.length > 0 ? (
        <div
          className={`relative ${
            viewMode ? "h-[450px]" : "h-80"
          } w-full flex flex-1 flex-wrap justify-center bg-white`}
        >
          {renderMedia()}
        </div>
      ) : (
        <div
          className={`${
            viewMode ? "h-[450px]" : "h-96"
          } w-full flex items-center justify-center bg-black`}
        >
          <p className="font-bold text-sm text-white">
            Video/Img not available
          </p>
        </div>
      )}

      <div className="border my-2" />
      <div className="flex-row flex justify-evenly items-center">
        <div className="flex flex-row items-center">
          <Like width={20} height={20} fill="#65676B" />
          <p className="text-[#65676B] ml-2 text-sm font-bold font-['sans-serif','Arial','Helvetica']">
            Like
          </p>
        </div>
        <div className="flex flex-row items-center">
          <Comment width={16} height={15} fill="#65676B" />
          <p className="text-[#65676B] ml-2  text-sm font-bold font-['sans-serif','Arial','Helvetica']">
            Comment
          </p>
        </div>
        <div className="flex flex-row items-center">
          <Share width={18} height={18} fill="#65676B" />
          <p className="text-[#65676B] ml-2  text-sm font-bold font-['sans-serif','Arial','Helvetica']">
            Share
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
