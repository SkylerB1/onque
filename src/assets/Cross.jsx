import React from "react";

const Cross = ({ width, height, fill = "#000000" }) => {
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
      viewBox="0 0 512 512"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm94.273 320.105c8.34 8.344 8.34 21.825 0 30.168a21.275 21.275 0 0 1-15.086 6.25c-5.46 0-10.921-2.09-15.082-6.25L256 286.164l-64.105 64.11a21.273 21.273 0 0 1-15.083 6.25 21.275 21.275 0 0 1-15.085-6.25c-8.34-8.344-8.34-21.825 0-30.169L225.836 256l-64.11-64.105c-8.34-8.344-8.34-21.825 0-30.168 8.344-8.34 21.825-8.34 30.169 0L256 225.836l64.105-64.11c8.344-8.34 21.825-8.34 30.168 0 8.34 8.344 8.34 21.825 0 30.169L286.164 256zm0 0"
          fill={fill}
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  );
};

export default Cross;
