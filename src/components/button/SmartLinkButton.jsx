import React from "react";
import { Button } from "@material-tailwind/react";

const SmartLinkButton = ({
  variant,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <div>
      <Button
        variant={variant}
        fullWidth
        className={`${className} border-gray-300 hover:border-gray-900 hover:border-2`}
        {...props}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default SmartLinkButton;
