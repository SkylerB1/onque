import React from "react";

const PlayNext = ({ width, height, fill }) => {
  return (
    <svg height={height} version="1.1" viewBox="0 0 36 36" width={width}>
      <use class="ytp-svg-shadow" href="#ytp-id-13"></use>
      <path
        class="ytp-svg-fill"
        fill={fill}
        d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"
        id="ytp-id-13"
      ></path>
    </svg>
  );
};

export default PlayNext;
