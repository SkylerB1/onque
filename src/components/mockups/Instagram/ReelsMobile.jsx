import React, { useCallback, useMemo, useState, useEffect } from "react";
import { getSource, isContainVideo } from "../../../utils";
import AudioMuted from "../../svg/AudioMuted";
import UserIcon from "../../../assets/userIcon";
import HeartOutline from "../../../assets/HeartOutline";
import InstaShareOutline from "../../../assets/InstaShareOutline";
import CommentOutline from "../../../assets/CommentOutline";
import SaveOutline from "../../../assets/SaveOutline";
import HorizontalDots from "../../../assets/HorizontalDots";
import AudioFilled from "../../../assets/AudioFilled";
import VideoLoader from "../../loader/VideoLoader";

function ReelsMobile({ files, viewMode, captions, screenName }) {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // State to track if video is loaded

  const src = useMemo(() => getSource(files[0]), [files]);
  const toggleAudio = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  const downloadVideo = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const videoBlob = xhr.response;
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(videoUrl); // Set video URL once the download is complete
        setIsVideoLoaded(true); // Mark video as loaded
      }
    };

    xhr.onerror = () => {
      console.error("Video download failed");
    };

    xhr.send();
  };

  useEffect(() => {
    if (files?.length > 0 && isContainVideo(files[0]) && !isVideoLoaded) {
      downloadVideo(src); // Start downloading the video only if it's not already loaded
    }
  }, [files, src, isVideoLoaded]);

  return (
    <>
      <div className="flex flex-row justify-between items-center absolute top-10 left-3 right-3">
        <div className="text-white text-md font-bold drop-shadow-lg shadow-black">
          Reels
        </div>
        <button
          onClick={toggleAudio}
          className="rounded-full bg-[#DBDBDB33] p-2 cursor-pointer z-50"
        >
          {muted ? (
            <AudioMuted width={14} height={14} fill="#ffffff" />
          ) : (
            <AudioFilled width={14} height={14} fill="#ffffff" />
          )}
        </button>
      </div>
      <div className="bg-black w-full h-full flex justify-center items-center">
        {files?.length === 0 || !isContainVideo(files[0]) ? (
          <>
            <h1 className="text-sm text-white text-center">
              Video not available
            </h1>
          </>
        ) : (
          <>
            {progress < 100 && !isVideoLoaded ? (
              <VideoLoader progress={Math.round(progress)} />  // Show the loader until 100% progress
            ) : (
              <video
                className={`w-full h-full ${viewMode ? "object-contain" : "object-cover"}`}
                loop={true}
                autoPlay={true}
                muted={muted}
                controls={false}
                src={videoSrc}
                draggable="false"
              />
            )}
          </>
        )}
      </div>
      <div className="absolute top-80 h-52 flex flex-col justify-between right-3">
        <HeartOutline width={25} height={25} fill="#ffffff" />
        <CommentOutline width={25} height={25} fill="#ffffff" />
        <InstaShareOutline width={25} height={25} fill="#ffffff" />
        <SaveOutline width={25} height={25} fill="#ffffff" />
        <HorizontalDots width={23} height={23} fill="#ffffff" />
      </div>
      <div className="absolute bottom-10 text-white text-sm font-semibold flex flex-row left-5 items-center">
        <UserIcon width={28} height={28} fill="#ffffff" />
        <p className="ml-2">{screenName}</p>
        <div className="border rounded-lg ml-2 py-1 px-1">
          <p className="text-xs">Follow</p>
        </div>
      </div>
    </>
  );
}

export default ReelsMobile;