import { Button, Spinner } from "@material-tailwind/react";
import React from "react";

const LoadingButton = ({
  loading,
  title,
  fullWidth = true,
  onClick,
  className="",
}) => {
  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      onClick={onClick}
      className={
        `flex justify-center items-center bg-light-blue-600 hover:bg-blue-500 ` +
        className
      }
    >
      {loading ? <Spinner /> : <span>{title}</span>}
    </Button>
  );
};

export default LoadingButton;
