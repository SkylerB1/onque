import React from "react";

const ImageComponent = ({
  className = "w-full h-full",
  width,
  height,
  src,
}) => {
  return (
    <img
      alt="img"
      className={className}
      width={width}
      height={height}
      src={src}
    />
  );
};

export default ImageComponent;
