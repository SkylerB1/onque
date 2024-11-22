import React from "react";
import InstagramPostMobile from "./InstagramPostMobile";
import ReelsMobile from "./ReelsMobile";
import StoryMobile from "./StoryMobile";
import { InstagramPlatform } from "../../common/commonString";

function GetInstagramComponent({
  mediaType,
  viewMode,
  caption = "",
  files,
  connections,
}) {
  const { screenName = "" } = Array.isArray(connections) && connections.find(
    (item) => item.platform === InstagramPlatform
  );
  if (mediaType == "POST") {
    return (
      <InstagramPostMobile
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
      />
    );
  } else if (mediaType == "REEL") {
    return (
      <ReelsMobile
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
      />
    );
  } else {
    return (
      <StoryMobile
        viewMode={viewMode}
        captions={caption}
        files={files}
        screenName={screenName}
      />
    );
  }
}

export default GetInstagramComponent;
