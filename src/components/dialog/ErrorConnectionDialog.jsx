import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { SocialPlatforms } from "../../utils";

const ErrorConnectionDialog = ({ handler, data }) => {
  const { coloredIcon = "" } = SocialPlatforms[data?.platform] || {};
  return (
    <Dialog
      size="sm"
      className="bg-[#efefef]"
      open={Boolean(data)}
      handler={handler}
    >
      <DialogHeader>
        <div className="flex flex-row items-center">
          {coloredIcon && coloredIcon(27,27)}
          <Typography variant="h5" className="ml-2">{data?.platform || ""}</Typography>
        </div>
      </DialogHeader>
      <DialogBody
        divider={false}
        className="bg-white mx-4 rounded-md overflow-y-auto"
      >
        <Typography>{data?.error || ""}</Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="filled" onClick={handler}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ErrorConnectionDialog;
