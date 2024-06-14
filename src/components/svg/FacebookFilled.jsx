import React from "react";

const FacebookFilled = ({ width = 25, height = 25, fill }) => {
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
      viewBox="0 0 512 512"
      // style="enable-background:new 0 0 512 512"
      xml:space="preserve"
      className=""
    >
      <g>
        <path
          d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256s114.6 256 256 256c1.5 0 3 0 4.5-.1V312.7h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5C433.7 471.4 512 372.9 512 256z"
          fill={fill}
          data-original="#000000"
          className=""
        ></path>
      </g>
    </svg>
  );
};

export default FacebookFilled;
