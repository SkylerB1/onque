;

import React, { useEffect } from "react";
import AnalyticsNavbar from "../../../components/side-navbar/AnalyticsNavbar";
import { usePathname, useSearchParams } from "next/navigation";
import FacebookDisConnect from "../../../components/connect/facebook/FacebookDisConnect";
import InstagramDisConnect from "../../../components/connect/instagram/InstagramDisConnect";
import TwitterDisConnect from "../../../components/connect/twitter/TwitterDisConnect";
import LinkedinDisConnect from "../../../components/connect/linkedin/LinkedinDisConnect";
import GoogleBusinessDisConnect from "../../../components/connect/google-business/GoogleBusinessDisConnect";
import TiktokDisConnect from "../../../components/connect/tiktok/TiktokDisConnect";
import YoutubeDisConnect from "../../../components/connect/youtube/YoutubeDisConnect";
// import TwitterConnect from "../../../components/connect/twitter/TwitterConnect";
import TwitterConnect from "../../../../components/connect/twitter/TwitterConnect";

const SocialConnectData = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const url = pathname + "?" + "tab" + "=" + tab;
  const  twitterToken  = null

  return (
    <>
      <div className="p-4 sm:ml-80">
        <div className="gridflex-1 flex-row rounded-lg mt-20">
          {tab === "facebook" ? (
            <FacebookDisConnect tab={tab} />
          ) : tab === "instagram" ? (
            <InstagramDisConnect tab={tab} />
          ) : tab === "twitter" ? (
            twitterToken !== null ? 
              <TwitterConnect tab={tab} />
             : 
              <TwitterDisConnect tab={tab} />            
          ) 
          : tab === "tiktok" ? (
            <TiktokDisConnect tab={tab} />
          ) : tab === "linkedin" ? (
            <LinkedinDisConnect tab={tab} />
          ) : tab === "google-business" ? (
            <GoogleBusinessDisConnect tab={tab} />
          ) : tab === "youtube" ? (
            <YoutubeDisConnect tab={tab} />
          ) : (
            <div>No data found</div>
          )}
        </div>
        <AnalyticsNavbar />
      </div>
    </>
  );
};

export default SocialConnectData;
