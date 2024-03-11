import React from "react";

const CommentOutline = ({ width, height, fill }) => {
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
      viewBox="0 0 24 24"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M12 2a10 10 0 1 0 4.924 18.7l3.76 1.253A.987.987 0 0 0 21 22a1 1 0 0 0 .948-1.316l-1.248-3.76A9.988 9.988 0 0 0 12 2zm6.653 15.12.766 2.3-2.3-.766a.991.991 0 0 0-.851.1 8.02 8.02 0 1 1 2.488-2.488 1 1 0 0 0-.103.854z"
          fill={fill}
          class=""
        ></path>
      </g>
    </svg>
  );
};

export default CommentOutline;
