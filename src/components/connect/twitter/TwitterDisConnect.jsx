import React from "react";
import Twitter from "../../../assets/twitter.svg?react";
import TwitterApi from "../../SocialMediaConnection/TwitterApi";


const TwitterDisConnect = ({ tab }) => {
  const mediaType = tab === "twitter" ? "Twitter" : null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            <Twitter fill="#3D73F4" width={24} height={24} />
            <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">Don&apos;t miss any details about your community in the most real-time social network </h2>
          <p className="text-base text-gray-400 mt-8">
            Grow your presence on Twitter thanks to your data: Check the daily
            balance of your gained and lost followers; discover who is following
            you and stop following, analyze hashtags and monitor your
            competitors.
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            <TwitterApi />
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

export default TwitterDisConnect;
