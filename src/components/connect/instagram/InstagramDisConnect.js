import React from "react";
import Instagram from "../../../assets/instagram.svg?react";

const InstagramConnect = ({ tab }) => {
  const mediaType = tab === "instagram" ? "Instagram" : null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            <Instagram fill="#3D73F4" width={24} height={24} />
            <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">Analyze your Instagram metrics</h2>
          <p className="text-base text-gray-400 mt-8">
            Finally you can know about your Instagram community and how it
            evolves, also keep unlimited storage of all of your publications and
            related metrics.
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            {/* <Insta */}
          </div>
        </div>
      </div>
      <div className="w-3/6 mt-40 ml-10">
        <img
          src="/assets/media.svg?react" // Path relative to the "public" directory
          alt="On Que Logo"
          width={602}
          height={500}
          style={{ backgroundimg: "none" }}
        />
      </div>
    </div>
  );
};

export default InstagramConnect;
