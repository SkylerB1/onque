import React from "react";
import ShortsDesktop from "./ShortsDesktop";
import ShortsMobile from "./ShortsMobile";
import VideoDesktop from "./VideoDesktop";
import VideoMobile from "./VideoMobile";
import { YoutubePlatform } from "../../common/commonString";

function GetYoutubeComponent({
  mediaType,
  viewMode,
  caption,
  files,
  data,
  connections,
}) {
  const { screenName = "" } = Array.isArray(connections) && connections.find(
    (item) => item.platform === YoutubePlatform
  );
  if (mediaType == "VIDEO" && viewMode) {
    return (
      <VideoDesktop
        captions={caption}
        viewMode={viewMode}
        files={files}
        data={data}
        screenName={screenName}
      />
    );
  } else if (mediaType == "VIDEO" && !viewMode) {
    return (
      <VideoMobile
        captions={caption}
        viewMode={viewMode}
        files={files}
        data={data}
        screenName={screenName}
      />
    );
  } else if (mediaType == "SHORTS" && viewMode) {
    return (
      <ShortsDesktop
        captions={caption}
        files={files}
        data={data}
        screenName={screenName}
      />
    );
  } else {
    return (
      <ShortsMobile
        captions={caption}
        files={files}
        data={data}
        screenName={screenName}
      />
    );
  }
}

export default GetYoutubeComponent;
