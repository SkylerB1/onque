import React from "react";
import Pause from "../../../assets/pause-filled.svg?react";
import { getSource, isContainVideo } from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";
import AudioFilled from "../../../assets/AudioFilled";
import FacebookLikeFilled from "../../../assets/FacebookLikeFilled";
import FacebookCommentFilled from "../../../assets/FacebookCommentFilled";
import FacebookShareFilled from "../../../assets/FacebookShareFilled";

function ShortsDesktop({ files, captions, screenName }) {
  const src = getSource(files[0]);
  return (
    <>
      <div className="absolute w-full top-4 px-4 z-50 flex justify-between  ">
        <Pause width={18} height={18} fill="#ffffff" />
        <AudioFilled width={18} height={18} fill="#ffffff" />
      </div>
      <div className="bg-black  w-full h-full flex justify-center items-center">
        {files?.length == 0 || !isContainVideo(files[0]) ? (
          <>
            <h1 className="text-sm text-white text-center">
              Video not available
            </h1>
          </>
        ) : (
          <video
            className="w-full h-full object-cover brightness-[0.95] contrast-[0.95]"
            loop={true}
            autoPlay={true}
            muted
            controls={false}
            src={src}
          />
        )}
      </div>
      <div className="absolute top-80 flex flex-col justify-between right-3">
        <span className="flex flex-col items-center mb-1">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookLikeFilled width={20} height={20} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center mb-1">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookCommentFilled width={20} height={20} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center mb-1">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookShareFilled width={20} height={20} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="bg-black/10 rounded-full p-2 mb-1">
          <HorizontalDots width={20} height={20} fill="#ffffff" />
        </span>
      </div>
      {captions && (
        <div className="absolute bottom-14 px-4">
          <p className="text-sm text-white flex flex-row flex-wrap whitespace-pre-line">
            {captions}
          </p>
        </div>
      )}
      <div className=" absolute bottom-5 flex flex-row items-center px-2">
        <div className="px-2  rounded-full bg-green-900">
          <h1 className="text-white text-lg">Y</h1>
        </div>
        <div className="flex flex-row w-full ml-2 justify-between items-center ">
          <h1 className="text-sm font-bold leading-none drop-shadow-xl shadow-black text-white">
            {screenName}
          </h1>
          <div className="bg-red-700 py-1 px-2 rounded-sm ml-2 text-sm font-bold leading-none drop-shadow-xl shadow-black text-white">
            <h1 className="text-xs font-bold">SUBSCRIBE</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortsDesktop;
