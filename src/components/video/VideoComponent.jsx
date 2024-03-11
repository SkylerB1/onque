import React from "react";

const VideoComponent = ({
  index,
  className,
  src,
  play,
  onTogglePlay,
  ref,
  loop = true,
  autoPlay = false,
  controls,
  muted = true,
  icon,
  type = "video/mp4",
}) => {
  return (
    <>
      <video
        className={className}
        loop={loop}
        autoPlay={autoPlay}
        ref={ref}
        muted={muted}
        controls={controls}
      >
        <source src={src} type={type} />
      </video>
      {play && (
        <div
          onClick={() => onTogglePlay(index)}
          className=" absolute rounded-full top-1/2 cursor-pointer"
        >
          {icon}
        </div>
      )}
    </>
  );
};

export default VideoComponent;
