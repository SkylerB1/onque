import React from "react";

const PlayPrevious = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 32 32"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M30.026 4.996v22.001a1 1 0 0 1-1.5.868L9.474 16.864a1 1 0 0 1 0-1.733l19.052-11c.622-.36 1.5.053 1.5.865zM4.974 4h-2c-.554 0-1 .446-1 1v22c0 .554.446 1 1 1h2c.554 0 1-.446 1-1V5c0-.554-.446-1-1-1z"
          fill={fill}
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  );
};

export default PlayPrevious;
