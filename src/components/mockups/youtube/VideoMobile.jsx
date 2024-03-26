import React, { useEffect, useMemo, useRef, useState } from "react";
import Like from "../../../assets/youtube-like.svg?react";
import Dislike from "../../../assets/youtube-dislike.svg?react";
import Share from "../../../assets/youtube-share.svg?react";
import Save from "../../../assets/youtube-save.svg?react";
import Play from "../../../assets/play-filled.svg?react";
import Pause from "../../../assets/pause-filled.svg?react";

import { Typography } from "@material-tailwind/react";
import PlayPrevious from "../../../assets/PlayPrevious";
import PlayNext from "../../../assets/PlayNext";
import { getSource, isContainVideo } from "../../../utils";

function VideoMobile({ files, data, screenName }) {
  const { title = "" } = data;
  const [play, setPlay] = useState(false);
  const src = useMemo(() => getSource(files[0]), [files]);

  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    if (play) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [play]);
  return (
    <>
      {/* <div className="bg-black flex flex-row p-4 pt-6 items-center justify-between">
        <Youtube fill="#ffffff" />
        <div className="flex flex-row flex-1 justify-end items-center">
          <span>
            <Search width={26} height={26} fill="#ffffff" />
          </span>
          <span className="ml-4">
            <VerticalDots width={25} height={25} fill="#ffffff" />
          </span>
        </div>
      </div> */}
      <div className="relative bg-black  w-full h-60 flex justify-center items-center">
        {files?.length == 0 || !isContainVideo(files[0]) ? (
          <>
            <h1 className="text-sm text-white text-center">
              Video not available
            </h1>
          </>
        ) : (
          <>
            <video
              draggable="false"
              className="w-full h-full object-cover"
              muted
              ref={videoRef}
              onEnded={handlePlay}
              controls={true}
              src={src}
            />
            <div
              className={`absolute ${
                play ? "hidden" : ""
              } hover:inline-flex flex flex-row justify-evenly items-center w-full`}
            >
              <span>
                <PlayPrevious width={17} height={17} fill="#ffffff" />
              </span>
              <div className="cursor-pointer" onClick={handlePlay}>
                {play ? (
                  <Pause width={40} height={40} fill="#ffffff" />
                ) : (
                  <Play width={40} height={40} fill="#ffffff" />
                )}
              </div>
              <span>
                <PlayNext width={40} height={40} fill="#ffffff" />
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-row flex-wrap w-full">
          <h2 className='font-["Roboto","Arial","sans-serif"] text-lg'>
            <Typography variant="small" className="font-semibold">
              {title}
            </Typography>
          </h2>
        </div>

        <div className="flex flex-row items-center my-4">
          <div className="px-2  rounded-full bg-green-900">
            <h1 className="text-white text-lg">
              {screenName ? screenName[0] : "Y"}
            </h1>
          </div>
          <div className="flex flex-row w-full ml-2 justify-between items-center  ">
            <h1 className="text-sm font-bold leading-none drop-shadow-xl shadow-black text-black">
              {screenName}
            </h1>
            <div className="bg-black px-3 py-2 rounded-3xl ml-2 text-sm font-bold leading-none drop-shadow-xl shadow-black text-white">
              <h1 className="text-sm font-bold tracking-tighter">Subscribe</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[350px]">
          <div className="rounded-3xl flex flex-row items-center overflow-hidden">
            <div className="bg-[#0000001a] py-2 px-3 pr-4">
              <Like width={16} height={16} fill="#000000" />
            </div>
            <div className="bg-[#0000000d] py-2 px-3 pr-4">
              <Dislike width={16} height={16} fill="#000000" />
            </div>
          </div>
          <div className="bg-[#0000000d] rounded-3xl flex flex-row items-center px-2 ml-2">
            <span>
              <Share width={22} height={22} fill="#000000" />
            </span>
            <span className="font-bold text-sm ml-2">Share</span>
          </div>
          <div className="bg-[#0000000d] rounded-3xl flex flex-row items-center px-3 ml-2">
            <span>
              <Save width={22} height={22} fill="#000000" />
            </span>
            <span className="font-bold text-sm ml-2">Save</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoMobile;
