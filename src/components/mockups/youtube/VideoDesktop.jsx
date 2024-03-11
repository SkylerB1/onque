import React, { useEffect, useRef, useState } from "react";
import Like from "../../../assets/youtube-like.svg?react";
import Dislike from "../../../assets/youtube-dislike.svg?react";
import Share from "../../../assets/youtube-share.svg?react";
import Play from "../../../assets/play-filled.svg?react";
import Pause from "../../../assets/pause-filled.svg?react";
import PlayNext from "../../../assets/play-next-filled.svg?react";
import Autoplay from "../../../assets/autoplay-off.svg?react";
import Captions from "../../../assets/captions.svg?react";
import Setting from "../../../assets/setting.svg?react";
import Miniplayer from "../../../assets/miniplayer.svg?react";
import Fullscreen from "../../../assets/fullscreen.svg?react";
import { getSource, isContainVideo } from "../../../utils";
import HorizontalDots from "../../../assets/HorizontalDots";
import AudioFilled from "../../../assets/AudioFilled";

function VideoDesktop({ data, files, screenName }) {
  const { title } = data;
  const [play, setPlay] = useState(false);
  const src = getSource(files[0]);

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
      <div className="relative bg-black  w-full h-96 flex justify-center items-center">
        {files?.length == 0 || !isContainVideo(files[0]) ? (
          <>
            <h1 className="text-sm text-white text-center">
              Video not available
            </h1>
          </>
        ) : (
          <>
            <video
              className="w-full h-full object-cover"
              muted
              ref={videoRef}
              onEnded={handlePlay}
              controls={false}
              src={src}
            />
            <div
              className={`absolute bottom-0 flex flex-row w-full p-4 justify-between`}
            >
              <div className="flex flex-row items-center">
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
                <span>
                  <AudioFilled width={20} height={20} fill="#ffffff" />
                </span>
                <div className="text-white ml-2">
                  <span className="text-sm">0:00 / </span>
                  <span className="text-sm">0:00</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span>
                  <Autoplay
                    fill-opacity="0.3"
                    width={40}
                    height={40}
                    fill="#ffffff"
                  />
                </span>
                <span>
                  <Captions
                    fill-opacity="0.3"
                    width={40}
                    height={40}
                    fill="#ffffff"
                  />
                </span>
                <span>
                  <Setting width={40} height={40} fill="#ffffff" />
                </span>
                <span>
                  <Miniplayer width={40} height={40} fill="#ffffff" />
                </span>
                <span>
                  <Fullscreen width={40} height={40} fill="#ffffff" />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center my-4">
            <div className="px-2  rounded-full bg-green-900">
              <h1 className="text-white text-lg">S</h1>
            </div>
            <div className="flex flex-row w-full ml-2 items-center  ">
              <h1 className="text-sm font-bold leading-none drop-shadow-xl shadow-black text-black">
                {screenName}
              </h1>
              <div className="bg-black px-3 py-2 rounded-3xl ml-4 text-sm font-bold leading-none drop-shadow-xl shadow-black text-white">
                <h1 className="text-sm font-bold tracking-tighter">
                  Subscribe
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
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
                <HorizontalDots width={20} height={20} fill="#000000" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDesktop;
