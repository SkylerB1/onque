
import React from "react";
import GoogleBusiness from "../../../assets/google-business.svg?react";
import FacebookApi from "../../../components/SocialMediaConnection/FacebookApi";
import GoogleBusinessApi from "../../../components/SocialMediaConnection/GoogleBusinessApi";

const GoogleBusinessConnect = ({ tab }) => {
  const mediaType =
    tab === "google-business" ? "Google Business Profile" : null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            <GoogleBusiness fill="#0077B5" width={30} height={30} />
            <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">
            Conquer the map with analytics for Google Business Profile
          </h2>
          <p className="text-base text-gray-400 mt-8">
            Monitor how your customer value your local business and how photos
            or videos generate more views of your Client.
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            <GoogleBusinessApi />
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

export default GoogleBusinessConnect;
