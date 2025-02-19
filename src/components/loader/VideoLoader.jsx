import React from "react";
import { Oval } from "react-loader-spinner"; // Optional spinner library for better visual

function VideoLoader({ progress }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="white"
        secondaryColor="gray"
        strokeWidth={5}
        strokeWidthSecondary={5}
        ariaLabel="loading"
        visible={true}
      />
      <p className="mt-4 text-white text-lg font-semibold">{progress}%</p>
    </div>
  );
}

export default VideoLoader;
