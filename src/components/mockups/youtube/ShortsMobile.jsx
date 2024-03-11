import React from "react";
import Youtube from "../../../assets/youtube-icon.svg?react";
import { getSource } from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";

import FacebookShareFilled from "../../../assets/FacebookShareFilled";
import FacebookCommentFilled from "../../../assets/FacebookCommentFilled";
import FacebookLikeFilled from "../../../assets/FacebookLikeFilled";

function ShortsMobile({ files, captions, screenName }) {
  const src = getSource(files[0]);
  return (
    <>
      {/* <div className="absolute w-full p-4 pt-6 z-50 flex justify-start ">
        <Youtube fill="#ffffff" />
      </div> */}
      <div className="bg-black  w-full h-full flex justify-center items-center">
        {files?.length == 0 || files[0]?.type != "video/mp4" ? (
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
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookLikeFilled width={16} height={16} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookCommentFilled width={16} height={16} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <FacebookShareFilled width={16} height={16} fill="#ffffff" />
          </span>
          <p className="font-xs text-white font-bold my-1">0</p>
        </span>
        <span className="bg-black/10 rounded-full p-2">
          <HorizontalDots width={16} height={16} fill="#ffffff" />
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

export default ShortsMobile;
