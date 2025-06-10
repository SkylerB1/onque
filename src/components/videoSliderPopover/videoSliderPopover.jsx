import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSource } from "../../utils";
import { updateSliderTime } from "../../redux/features/videoSliderSlice";

const VideoSliderPopover = ({ videoFile, onClose }) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const sliderState = useSelector((state) => state.videoSlider);
  const [videoTime, setVideoTime] = useState(0);
  const [duration, setDuration] = useState(10); // default

  useEffect(() => {
    if (sliderState.fileName === videoFile.name) {
      setVideoTime(sliderState.timeInSeconds || 0);
    }
  }, [sliderState, videoFile]);

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setVideoTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
    dispatch(updateSliderTime({
      fileName: videoFile.name,
      timeInSeconds: value,
    }));
  };

  return (
    <div className="fixed top-[5%] left-[5%] bg-white rounded-xl shadow-xl p-4 z-50 w-[90%] h-[90%] flex flex-col items-center">
      <video
        ref={videoRef}
        src={getSource(videoFile)}
        className="w-[90%] h-[90%] rounded-md object-cover"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.currentTime = videoTime;
          }
        }}
      />
      <input
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={videoTime}
        onChange={handleSliderChange}
        className="w-full mt-4"
      />
      <p className="text-sm text-gray-600 mt-2">Time: {videoTime.toFixed(1)}s</p>
      <button
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default VideoSliderPopover;
