import React from "react";
import TwitterMobile from "./TwitterMobile";
import { TwitterPlatform } from "../../common/commonString";

function GetTwitterComponent({ viewMode, caption, files, connections }) {
  const { screenName = "" } = Array.isArray(connections) && connections.find(
    (item) => item.platform === TwitterPlatform
  );
  return (
    <TwitterMobile
      captions={caption}
      viewMode={viewMode}
      files={files}
      screenName={screenName}
    />
  );
}

export default GetTwitterComponent;
