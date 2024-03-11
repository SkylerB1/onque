import React from "react";

const AudioFilled = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      x="0"
      y="0"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M2.88 23.5h4.87l7.85 7.02c.35.32.8.48 1.25.48.26 0 .52-.05.76-.16.68-.31 1.11-.98 1.11-1.72V2.88c0-.74-.43-1.41-1.11-1.72-.67-.3-1.46-.18-2.01.32L7.75 8.5H2.88C1.84 8.5 1 9.34 1 10.38v11.24c0 1.04.84 1.88 1.88 1.88zM22.388 10.586a1.875 1.875 0 0 0-1.921 3.221 2.584 2.584 0 0 1 1.274 2.237c0 .915-.466 1.748-1.245 2.229a1.875 1.875 0 0 0 1.967 3.192 6.327 6.327 0 0 0 3.028-5.421 6.303 6.303 0 0 0-3.103-5.458z"
          fill={fill}
        ></path>
        <path
          d="M26.822 7.479a1.874 1.874 0 1 0-2.313 2.952 7.094 7.094 0 0 1 2.741 5.613 7.11 7.11 0 0 1-2.706 5.592 1.875 1.875 0 0 0 2.334 2.935A10.843 10.843 0 0 0 31 16.044a10.82 10.82 0 0 0-4.178-8.565z"
          fill={fill}
        ></path>
      </g>
    </svg>
  );
};

export default AudioFilled;
