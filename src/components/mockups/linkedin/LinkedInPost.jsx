import React, { useCallback } from "react";
import Globe from "../../../assets/facebook-globe.svg?react";
import Dots from "../../../assets/vertical-dots.svg?react";
import Like from "../../../assets/linkedin-like.svg?react";
import Comment from "../../../assets/linkedin-comment.svg?react";
import Share from "../../../assets/linkedin-share.svg?react";
import User from "../../../assets/linkedin-person.svg?react";
import { getSource, isContainVideo } from "../../../utils";
import { LinkedInPlatform } from "../../common/commonString";

function LinkedInPost({ files, captions, viewMode, connections, date }) {
  const { screenName = "" } = connections.find((item) =>
    item.platform.includes(LinkedInPlatform)
  );
  const renderMedia = useCallback(() => {
    if (files.length === 1) {
      const src = getSource(files[0]);

      return isContainVideo(files[0]) ? (
        <video
          className="w-full h-full object-cover"
          loop={true}
          autoPlay={true}
          muted={false}
          controls={false}
          src={src}
        />
      ) : (
        <img
          alt="img"
          className="w-full h-full object-cover"
          width={16}
          height={16}
          src={src}
        />
      );
    } else if (files.length === 2) {
      return files.map((item, index) => {
        const src = getSource(item);
        return (
          <div
            key={index}
            className={`${index > 0 && "ml-[3px]"} flex flex-1 h-full`}
          >
            {isContainVideo(item) ? (
              <video
                className="w-full h-full object-cover"
                loop={true}
                autoPlay={true}
                muted={false}
                controls={false}
                src={src}
              />
            ) : (
              <img
                alt="img"
                className="w-full h-full object-cover"
                width={16}
                height={16}
                src={src}
              />
            )}
          </div>
        );
      });
    } else if (files.length === 3) {
      return (
        <div className="flex flex-1 flex-row h-full flex-wrap">
          {files.map((item, index) => {
            const src = getSource(item);
            if (index == 0) {
              return (
                <div key={index} className="w-full border-b-2">
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full object-cover"
                      width={1}
                      height={1}
                      src={src}
                    />
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`w-1/2 ${index == 2 && "border-l-2"}`}
                >
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full object-cover"
                      width={1}
                      height={1}
                      src={src}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    } else if (files.length === 4) {
      return (
        <div className="flex flex-1 flex-row h-full flex-wrap">
          {files.map((item, index) => {
            const src = getSource(item);
            if (index == 0) {
              return (
                <div key={index} className="w-full border-b-2">
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full object-cover"
                      width={1}
                      height={1}
                      src={src}
                    />
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`w-1/3 ${index > 1 && "border-l-2"}`}
                >
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full object-cover"
                      width={1}
                      height={1}
                      src={src}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    } else if (files.length >= 5) {
      return (
        <div className="flex flex-1 flex-row h-full flex-wrap">
          {files.map((item, index) => {
            const src = getSource(item);
            if (index <= 1) {
              return (
                <div
                  key={index}
                  className={`w-1/2 border-b-2 ${index == 1 && "border-l-2"}`}
                >
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full object-cover"
                      width={1}
                      height={1}
                      src={src}
                    />
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`relative w-1/3 ${index > 4 && "hidden"} ${
                    index > 2 && "border-l-2"
                  }`}
                >
                  {isContainVideo(item) ? (
                    <video
                      className="w-full h-full object-cover"
                      loop={true}
                      autoPlay={true}
                      muted={false}
                      controls={false}
                      src={src}
                    />
                  ) : (
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
                      {index == 4 && files.length > 5 && (
                        <div className="absolute bg-black/30 flex justify-center items-center  w-full top-0 bottom-0">
                          <p className="text-lg text-white">
                            +{files.length - 5}{" "}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return;
    }
  }, [files]);
  return (
    <>
      <div className="flex flex-row justify-between items-center px-3 mt-10 mb-2">
        <div className="flex flex-row items-center">
          <span className="rounded-full overflow-hidden">
            <User width={40} height={40} />
          </span>
          <div className="flex flex-col ml-2 justify-between">
            <h1 className="text-sm font-bold leading-none">{screenName}</h1>
            <div className="flex flex-row items-center">
              <h3 className="text-xs text-gray-400 mr-1"> {date} · </h3>
              <Globe width={12} height={12} fill="#D3D3D3" />
            </div>
          </div>
        </div>
        <span>
          <Dots width={20} height={20} fill="#737373" />
        </span>
      </div>
      {captions && (
        <p className="px-3 text-sm mb-2 whitespace-pre-line"> {captions} </p>
      )}
      {files?.length > 0 ? (
        <div
          className={`${
            viewMode ? "h-[450px]" : "h-80"
          } w-full flex flex-1 flex-wrap justify-center bg-white`}
        >
          {renderMedia()}
        </div>
      ) : (
        <div
          className={`${
            viewMode ? "h-[450px]" : "h-60"
          } w-full flex items-center justify-center bg-black`}
        >
          <p className="font-bold text-sm text-white">
            Video/img not available
          </p>
        </div>
      )}
      <div className="border my-2 mx-2" />
      <div className="flex-row flex justify-evenly items-center">
        <div className="flex flex-row items-center">
          <Like width={20} height={20} fill="#65676B" />
          <p className="text-[#65676B] ml-2 text-sm font-bold font-['sans-serif','Arial','Helvetica']">
            Like
          </p>
        </div>
        <div className="flex flex-row items-center">
          <Comment width={18} height={18} fill="#65676B" />

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

export default LinkedInPost;
