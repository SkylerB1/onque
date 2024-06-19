import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const InstagramAuthDialog = ({ open, handler, onConfirm }) => {
  return (
    <Dialog open={open} handler={handler}>
      <ToasterCustomConatiner />
      <DialogHeader>Authenticate with Facebook</DialogHeader>
      <DialogBody>
        <Typography variant="h6" className="my-2">
          why do I have to authenticate with Facebook?
        </Typography>
        <Typography variant="paragraph">
          Facebook requires Instagram Business or Creator accounts to be
          connected to a Facebook Page. For Onque to work as intended, we need
          to authenticate through Facebook.
        </Typography>
        <Typography variant="h6" className="my-2">
          What happens next?
        </Typography>
        <Typography variant="paragraph">
          Once we transfer you, sign in to the Facebook profile that has Admin
          permissions for the Facebook Page connected with your Instagram
          account.
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button size="sm" variant="outlined" onClick={handler}>
          Cancel
        </Button>
        <Button size="sm" variant="filled" className="ml-2" onClick={onConfirm}>
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default InstagramAuthDialog;
