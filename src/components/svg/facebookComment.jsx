import React from "react";

const facebookComment = ({ width, height, fill }) => {
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
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M387.905 0H124.094C57.743 0 3.762 53.981 3.762 120.333v162.5c0 63.836 49.97 116.223 112.847 120.102V500a12.002 12.002 0 0 0 19.174 9.62L278.54 403.165h109.367c66.352 0 120.333-53.981 120.333-120.333v-162.5C508.238 53.981 454.257 0 387.905 0zm96.333 282.833c0 53.118-43.215 96.333-96.333 96.333H274.557a12 12 0 0 0-7.173 2.38l-126.775 94.537v-84.917c0-6.627-5.373-12-12-12h-4.514c-53.118 0-96.333-43.214-96.333-96.333v-162.5C27.762 67.215 70.976 24 124.094 24h263.811c53.118 0 96.333 43.215 96.333 96.333z"
          fill={fill}
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  );
};

export default facebookComment;
