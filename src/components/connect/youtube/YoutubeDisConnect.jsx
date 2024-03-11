import React from "react";
import YoutubeFilled from "../../../assets/youtube-filled.svg?react";
import { YouTubeApi } from "../../../components/SocialMediaConnection/YouTubeApi";

const YoutubeConnect = ({ tab }) => {
  const mediaType = tab === "youtube" ? "Youtube" : null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            <YoutubeFilled fill="#EA462F" width={24} height={24} />
            <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">
            Analyze your video content and maximize YouTube’s potential
          </h2>
          <p className="text-base text-gray-400 mt-8">
            Get to know your subscribers and follow the progress of your
            channel. Monitor the evolution of your videos, the generated revenue
            and the engagement of your audience. Create reports and observe what
            your competitors are up to.
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            <YouTubeApi />
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

export default YoutubeConnect;
