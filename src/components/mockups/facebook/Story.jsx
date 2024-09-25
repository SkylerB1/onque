import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import Globe from "../../../components/svg/Globe";
import FacebookLikeFilled from "../../../assets/FacebookLikeFilled";
import FacebookSendComment from "../../../assets/FacebookSendComment";
import VideoComponent from "../../video/VideoComponent";
import ImageComponent from "../../Image/ImageComponent";
import { getSource, isContainImage } from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";
import FacebookPlay from "../../../assets/facebook-play.svg?react";

export default function Story({ files, captions, viewMode, screenName, date }) {
  const [play, setPlay] = useState([false, false, false, false, false]);
  const [carouselkey, setCarouselKey] = useState(1);
  const videoRef = useRef([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const memoizedSources = useMemo(() => {
    return filteredFiles.map((file) => getSource(file));
  }, [filteredFiles]);

  useEffect(() => {
    if (files?.length > 0) {
      const filterFiles = files?.filter((item) => {
        const fileType = item.type || item.mimetype;
        return fileType.includes("image") || fileType.includes("video");
      });
      setFilteredFiles(filterFiles);
    } else {
      setFilteredFiles([]);
    }
    setCarouselKey((prev) => {
      return prev + 1;
    });
  }, [files]);

  const renderVideoComponent = (index = 0) => {
    const src = memoizedSources[index];
    return (
      <video
        ref={(el) => (videoRef.current[0] = el)}
        className="h-full w-full  object-cover "
        key={index}
        index={index}
        loop={true}
        autoPlay={false}
        muted={true}
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };
  const renderImageComponent = (index = 0) => {
    const src = memoizedSources[index];

    return (
      <img
        key={index}
        alt="img"
        className="h-full w-full object-cover"
        src={src}
        draggable="false"
      />
    );
  };
  const renderMedia = useCallback(() => {
    if (filteredFiles.length > 0) {
      return filteredFiles.map((file, index) => {
        let mimeType = file.type || file.mimetype;

        return (
          <div
            className={`relative ${
              viewMode == false ? "h-[400px]" : "h-full"
            } w-full`}
            key={index}
          >
            {mimeType.includes("video") == true
              ? renderVideoComponent(index)
              : renderImageComponent(index)}
          </div>
        );
      });
    } else {
      return (
        <div className="relative h-full w-full bg-black">
          <div
            className={`${
              viewMode == false ? "h-[50%]" : "h-[50%]"
            } w-full flex place-items-center justify-center bg-black `}
          >
            <p className="font-bold text-sm text-white">
              Video / Img not available
            </p>
          </div>
        </div>
      );
    }
  }, [filteredFiles]);
  return (
    <>
      {/* Header part */}
      <div className=" h-1/6 w-full bg-black/50">
        <div className=" text-left">
          <div className="pl-3 pt-8 text-white flex items-center justify-start gap-2">
            <div className="px-3 py-1  rounded-full bg-green-900">
              <h1 className="text-white text-sm">{screenName.charAt(0)}</h1>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="font-bold text-sm leading-none">
                {screenName}{" "}
              </span>
              <span className="text-white/80 text-sm">2 h</span>
              <Globe width={12} height={12} fill="#D3D3D3" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`max-w-lg ${
          viewMode == false ? "h-[75%]" : "h-[71.15%]"
        }   flex items-center justify-center mx-auto my-auto place-content-center h-screen relative`}
      >
        <Carousel
          key={carouselkey}
          className=""
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className=" ddumy absolute top-2 left-2/4 z-50 flex -translate-x-2/4 gap-2 w-full px-2 ">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`w-1/${length} block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? " bg-white" : " bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={filteredFiles.length == 0 ? false : undefined}
          nextArrow={filteredFiles.length == 0 ? false : undefined}
        >
          {renderMedia()}
        </Carousel>
      </div>
      <div className={`${viewMode == false ? " " : ""}   inset-x-0  w-full `}>
        <div
          className={`${
            viewMode == false ? " relative bottom-8" : "absolute bottom-0"
          } inset-x-0  grid p-5 w-full place-items-start bg-black/75 `}
        >
          <div className="flex justify-center items-center gap-4">
            <input
              type="text"
              className={`bg-transparent rounded-xl ${
                viewMode == false ? "w-40" : "w-80"
              } `}
              disabled={true}
            />
            <FacebookLikeFilled width={20} height={20} fill="#ffffff" />

            <FacebookSendComment width={25} height={25} fill="#ffffff" />
          </div>
        </div>
      </div>
    </>
  );
}
