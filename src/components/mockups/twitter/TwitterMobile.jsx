import React, { useCallback, useEffect, useRef, useState } from "react";
import Comment from "../../../assets/twitter-comment.svg?react";
import Retweet from "../../../assets/retweet.svg?react";
import Like from "../../../assets/twitter-like.svg?react";
import Share from "../../../assets/twitter-share.svg?react";
import Twitter from "../../../assets/twitter.svg?react";

import {
  getFirstLetter,
  getSource,
  isContainImage,
  isContainVideo,
} from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";

function TwitterMobile({ files, captions, viewMode, screenName }) {
  const videoRef = useRef(null);
  const src = files.length > 0 ? getSource(files[0]) : "";
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(!play);
  };

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
            {isContainImage(item) && (
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
      const initialFile = files[0];
      const initialFileSrc = getSource(initialFile);
      return (
        <div className="flex flex-1 flex-row h-full flex-wrap">
          <div className="flex flex-1">
            {isContainVideo(initialFile) ? (
              <video
                className="w-full h-full object-cover"
                loop={true}
                autoPlay={true}
                muted={false}
                controls={false}
                src={initialFileSrc}
              />
            ) : (
              <img
                alt="img"
                className="w-full h-full object-cover"
                width={1}
                height={1}
                src={initialFileSrc}
              />
            )}
          </div>
          <div className={`flex flex-1 flex-col border-l-2`}>
            {files.map((item, index) => {
              const src = getSource(item);
              if (index > 0) {
                return isContainVideo(item) ? (
                  <video
                    className={`w-full h-1/2 object-cover ${
                      index == 2 && "border-t-2"
                    }`}
                    loop={true}
                    autoPlay={true}
                    muted={false}
                    controls={false}
                    src={src}
                  />
                ) : (
                  <img
                    alt="img"
                    className={`w-full h-1/2 object-cover ${
                      index == 2 && "border-t-2"
                    }`}
                    width={1}
                    height={1}
                    src={src}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    } else if (files.length === 4) {
      return (
        <div className="flex flex-1 flex-row h-full flex-wrap">
          {files.map((item, index) => {
            const src = getSource(item);
            return isContainVideo(item) ? (
              <video
                className={`w-1/2 h-1/2 object-cover border-b-2 ${
                  index % 2 == 1 && "border-l-2"
                }`}
                loop={true}
                autoPlay={true}
                muted={false}
                controls={false}
                src={src}
              />
            ) : (
              <img
                alt="img"
                className={`w-1/2 h-1/2 object-cover border-b-2 ${
                  index % 2 == 1 && "border-l-2"
                } `}
                width={1}
                height={1}
                src={src}
              />
            );
          })}
        </div>
      );
    } else {
      return "ELSE";
    }
  }, [files]);

  useEffect(() => {
    if (play) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [play]);

  return (
    <>
      <div>
        <div className="py-4 flex  flex-col items-center ">
          <span className="py-6">
            <Twitter fill="#03A9F4" width={30} height={30} />
          </span>
          <div className="w-full flex flex-row justify-evenly">
            <span className="text-md font-semibold text-[#536471]">
              For You
            </span>
            <span className="text-md font-semibold text-black border-b-4  border-[#1d9bf0]">
              Following
            </span>
          </div>
        </div>
      </div>

      <div className="flex  flex-row px-3 border-t border-b py-3">
        <div>
          <div className="px-4 py-2 rounded-full bg-green-900">
            <h1 className="text-white text-lg">{getFirstLetter(screenName)}</h1>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between ml-2  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-sm font-bold leading-none drop-shadow-xl shadow-black text-black">
                {screenName}
              </h1>
            </div>

            {viewMode ? (
              <HorizontalDots fill="#536471" width={18} height={18} />
            ) : (
              ""
            )}
          </div>

          <p className=" text-sm mt-1 whitespace-pre-line">{captions}</p>

          <div
            className={`relative w-full h-full ${
              viewMode ? "max-h-[400px]" : "max-h-[250px]"
            } border rounded-xl flex justify-center my-4 items-center overflow-hidden`}
          >
            {files.length == 0 ? (
              <p className=" text-sm">No Video/img available</p>
            ) : (
              renderMedia()
            )}
          </div>

          <div className="flex flex-row items-center justify-between">
            <Comment fill="#536471" width={18} height={18} />

            <Retweet fill="#536471" width={18} height={18} />

            <Like fill="#536471" width={18} height={18} />

            <Share fill="#536471" width={18} height={18} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TwitterMobile;
