import React from 'react'

const YoutubeVideo = ({width,height,fill}) => {
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
        <g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
          <path
            d="M10.252 8.068A.5.5 0 0 0 9.5 8.5v7a.5.5 0 0 0 .752.432l6-3.5a.5.5 0 0 0 0-.864zM15.008 12 10.5 14.63V9.37z"
            fill={fill}
            data-original="#000000"
          ></path>
          <path
            d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
            fill={fill}
            data-original="#000000"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default YoutubeVideo