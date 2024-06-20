import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const AlertModal = ({ show, toggleModal, alertData }) => {
  const { header = "", onAccept = () => {} } = alertData;
  return (
    <Dialog size="sm" open={show}>
      <ToasterCustomConatiner />
      <DialogBody className="justifyCenter">
        <Typography color="black">{header}</Typography>
      </DialogBody>
      <DialogFooter>
        <div className="justifyCenter">
          <Button size="sm" onClick={onAccept}>
            Accept
          </Button>
          <Button
            size="sm"
            onClick={toggleModal}
            variant="outlined"
            className="ml-2"
          >
            Cancel
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default AlertModal;
