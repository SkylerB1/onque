import React from "react";

const Pause = ({ width, height, fill }) => {
  return (
    <svg height={height} version="1.1" viewBox="0 0 36 36" width={width}>
      <use className="ytp-svg-shadow" href="#ytp-id-48"></use>
      <path
        className="ytp-svg-fill"
        fill={fill}
        d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
        id="ytp-id-48"
      ></path>
    </svg>
  );
};

export default Pause;
