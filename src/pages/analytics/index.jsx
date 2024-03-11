;

import React from "react";
import AnalyticsNavbar from "../../../components/side-navbar/AnalyticsNavbar";
import SocialConnect from "./social-graph-data/social-connect-data";

const Analytics = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="flex mt-2 mb-2">
          <SocialConnect />
        </div>
        <AnalyticsNavbar />
      </div>
    </>
  );
};

export default Analytics;
