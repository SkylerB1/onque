import React from "react";
import TiktokMobile from "./TiktokMobile";
import { TikTokPlatform } from "../../common/commonString";

function GetTikTokComponent({mediaType, viewMode, caption, files, connections}) {
  const { screenName = "" } = Array.isArray(connections) && connections.find((item) =>
    item.platform.includes(TikTokPlatform)
  );
  return (
    <TiktokMobile
      captions={caption}
      viewMode={viewMode}
      files={files}
      screenName={screenName}
    />
  );
}

export default GetTikTokComponent;
