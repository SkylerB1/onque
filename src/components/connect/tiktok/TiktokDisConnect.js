import React from "react";
import TikTok from "../../../assets/tiktok.svg?react";
// import TiktokApi from "../../../components/SocialMediaConnection/TiktokApi";

const TiktokConnect = ({ tab }) => {
  const mediaType = tab === "tiktok" ? "TikTok" : null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            <TikTok fill="#010101" width={24} height={24} />
            <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">
            Connect your Tiktok and extract all the analytics
          </h2>
          <p className="text-base text-gray-400 mt-8">
            Extract the analytics related to your TikTok account and improve
            your strategy based on the data
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            {/* <TiktokApi /> */}
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

export default TiktokConnect;
