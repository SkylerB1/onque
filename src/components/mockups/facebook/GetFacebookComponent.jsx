import React from "react";
import Post from "./Post";
import ReelsMobile from "./ReelsMobile";
import ReelsDesktop from "./ReelsDesktop";
import {
  FBPost,
  FBReal,
  FBStory,
  FacebookPagePlatform,
} from "../../common/commonString";
import Story from "./Story";

function GetFacebookComponent({
  mediaType,
  viewMode,
  caption,
  files,
  connections,
  date,
}) {
  const { screenName = "" } = Array.isArray(connections) && connections.find(
    (item) => item.platform === FacebookPagePlatform
  );

  if (mediaType == FBPost) {
    return (
      <Post
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
        date={date}
      />
    );
  } else if (mediaType == FBStory) {
    return (
      <Story
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
        date={date}
      />
    );
  } else if (mediaType == FBReal && viewMode == 1) {
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
