import { Button, Spinner } from "@material-tailwind/react";
import React from "react";

const LoadingButton = ({
  loading,
  title,
  fullWidth = true,
  onClick,
  className = "",
  variant = "",
  ...props
}) => {
  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      onClick={onClick}
      className={`flex justify-center items-center ` + className}
      {...props}
    >
      {loading ? <Spinner /> : <span>{title}</span>}
    </Button>
  );
};

export default LoadingButton;
