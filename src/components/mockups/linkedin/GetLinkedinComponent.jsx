import React from "react";
import LinkedInPost from "./LinkedInPost";

function GetLinkedinComponent({
  viewMode,
  connections,
  caption,
  files,
  scheduledDate,
}) {
  return (
    <LinkedInPost
      files={files}
      viewMode={viewMode}
      captions={caption}
      connections={connections}
      scheduledDate={scheduledDate}
    />
  );
}

export default GetLinkedinComponent;
