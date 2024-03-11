import { Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

const Connect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { broadcastConnection } = useAppContext();
  const platform = searchParams.get("platform");

  useEffect(() => {
    broadcastConnection.postMessage({ platform: platform });
    window.close();
  }, []);

  return (
    <div className="flex flex-1 h-screen flex-col justify-center items-center">
      <Typography variant="h5">Connection successful!</Typography>
      <Typography variant="small">Close this window to continue.</Typography>
    </div>
  );
};

export default Connect;
