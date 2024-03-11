import React from 'react'
import LinkedIn from "../../../assets/linkedin.svg?react";

const LinkedinConnect = ({ tab }) => {
    const mediaType = tab === "linkedin"? "Linkedin": null;
  return (
    <div className="flex flex-row">
      <div className="w-3/6">
        <div className="flex mt-10 ml-10">
        <div className="flex items-center justify-center text-2xl font-semibold">
          <LinkedIn fill="#3D73F4" width={24} height={24} />
          <p className="ml-4 text-black">{mediaType}</p>
          </div>
        </div>
        <div className="ml-20 mt-16 items-center justify-center text-black">
          <h2 className="text-2xl">
            All your Facebook page or group analytics
          </h2>
          <p className="text-base text-gray-400 mt-8">
            Track the daily evolution of your Facebook page or group and the
            effect of your posts on its growth. Get your audience’s demographic
            data and review the stats related to the impact of each post.
          </p>
        </div>
        <div className="flex ml-20 mt-40">
          <div>
            {/* <Instagram /> */}
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
  )
}

export default LinkedinConnect