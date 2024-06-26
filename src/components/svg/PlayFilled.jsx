import React from "react";

const PlayFilled = ({ width, height, fill }) => {
  return (
    <svg version="1.1" viewBox="0 0 36 36" width={width} height={height}>
      <use className="ytp-svg-shadow" href="#ytp-id-44"></use>
      <path
        className="ytp-svg-fill"
        fill={fill}
        d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
        id="ytp-id-44"
      ></path>
    </svg>
  );
};

export default PlayFilled;
