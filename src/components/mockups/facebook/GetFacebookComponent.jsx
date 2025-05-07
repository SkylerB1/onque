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
  likeCount = 0,
  commentCount = 0,
}) {
  const { screenName = "" } =
    connections.find((item) => item.platform === FacebookPagePlatform) || {};

  if (mediaType == FBPost) {
    return (
      <Post
        captions={caption}
        viewMode={viewMode}
        files={files}
        screenName={screenName}
        date={date}
        likeCount={likeCount}
        commentCount={commentCount}
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
        likeCount={likeCount}
        commentCount={commentCount}
      />
    );
  } else if (mediaType == FBReal && viewMode == 1) {
    return (
      <ReelsDesktop
        captions={caption}
        files={files}
        screenName={screenName}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    );
  } else {
    return (
      <ReelsMobile
        captions={caption}
        files={files}
        screenName={screenName}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    );
  }
}

export default GetFacebookComponent;
