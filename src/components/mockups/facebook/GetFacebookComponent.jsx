import React from "react";
import Post from "./Post";
import ReelsMobile from "./ReelsMobile";
import ReelsDesktop from "./ReelsDesktop";
import { FacebookPagePlatform } from "../../common/commonString";

function GetFacebookComponent({
  mediaType,
  viewMode,
  caption,
  files,
  connections,
  date,
}) {
  const { screenName = "" } = connections.find(
    (item) => item.platform === FacebookPagePlatform
  );

  if (mediaType == "POST") {
    return (
      <Post
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
        date={date}
      />
    );
  } else if (mediaType == "REEL" && viewMode == 1) {
    return (
      <ReelsDesktop captions={caption} files={files} screenName={screenName} />
    );
  } else {
    return (
      <ReelsMobile captions={caption} files={files} screenName={screenName} />
    );
  }
}

export default GetFacebookComponent;
