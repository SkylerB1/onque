;

import React from "react";
import AnalyticsNavbar from "../../../components/side-navbar/AnalyticsNavbar";

const Summary = () => {
  return (
    <>
      <div className="p-4 sm:ml-80">
        <div className="grid bg-white flex-1 h-screen flex-row rounded-lg mt-20 justify-center content-center">
          <div className="flex flex-row justify-center content-center place-self-center">
            <h1>No Summary Data is Available !!</h1>
          </div>
        </div>
        <AnalyticsNavbar />
      </div>
    </>
  );
};

export default Summary;
