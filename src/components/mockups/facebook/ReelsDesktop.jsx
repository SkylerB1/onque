import React, { useCallback, useState } from "react";
import Pause from "../../svg/Pause";
import Globe from "../../svg/Globe";
import Dots from "../../svg/horizontalDots";
import Like from "../../svg/facebookLike";
import Comment from "../../svg/facebookComment";
import Share from "../../svg/facebookShareFilled";
import Sound from "../../svg/soundFilled";
import SoundMuted from "../../svg/soundMuted";
import { getSource } from "../../../utils";

function Reels({ files, captions, screenName }) {
  const [muted, setMuted] = useState(true);
  const src = getSource(files[0]);
  const toggleAudio = useCallback(() => {
    setMuted(!muted);
  }, [muted]);
  return (
    <>
      <div className="absolute top-8 w-full px-2 z-50 ">
        <div className="flex flex-row items-center">
          <div className="px-3 py-1  rounded-full bg-green-900">
            <h1 className="text-white text-lg">Y</h1>
          </div>
          <div className="flex flex-row w-full ml-2 justify-between ">
            <div>
              <h1 className="text-sm font-bold leading-none drop-shadow-xl shadow-black text-white">
                {screenName}
              </h1>
              <div className="flex flex-row items-center">
                <Globe width={12} height={12} fill="#D3D3D3" />
                <h3 className="text-xs text-white/80 ml-1 drop-shadow-xl shadow-black">
                  Public
                </h3>
              </div>
            </div>
            <div className="flex w-24 justify-evenly items-center flex-row">
              <Pause width={30} height={30} fill="#ffffff" />
              <div
                onClick={toggleAudio}
                className="rounded-full cursor-pointer z-50"
              >
                {muted ? (
                  <SoundMuted width={18} height={18} fill="#ffffff" />
                ) : (
                  <Sound width={20} height={20} fill="#ffffff" />
                )}
              </div>

              <Dots width={25} height={25} fill="#ffffff" />
            </div>
          </div>
        </div>
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
            className="w-full h-full object-contain brightness-[0.95] contrast-[0.95]"
            loop={true}
            autoPlay={true}
            muted={muted}
            controls={false}
            src={src}
          />
        )}
      </div>
      <div className="absolute top-96 flex flex-col justify-between right-3">
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <Like width={20} height={20} fill="#ffffff" />
          </span>
          <p className="text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <Comment width={20} height={20} fill="#ffffff" />
          </span>
          <p className="text-white font-bold my-1">0</p>
        </span>
        <span className="flex flex-col items-center">
          <span className="bg-black/10 rounded-full p-2">
            <Share width={20} height={20} fill="#ffffff" />
          </span>
          <p className="text-white font-bold my-1">0</p>
        </span>
      </div>
      {captions && (
        <div className="absolute bottom-3 px-4">
          <p className="text-sm text-white flex flex-row flex-wrap whitespace-pre-line">
            {captions}
          </p>
        </div>
      )}
    </>
  );
}

export default Reels;
