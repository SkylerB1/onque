import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const InfoModal = ({ show, closeInfoModal, infoData }) => {
  const { content = "" } = infoData;

  return (
    <Dialog size="md" open={show}>
      <ToasterCustomConatiner />
      <DialogHeader></DialogHeader>
      <DialogBody className="justifyCenter">
        <Typography color="black">{content}</Typography>
      </DialogBody>
      <DialogFooter>
        <div className="justifyCenter">
          <Button
            size="sm"
            onClick={closeInfoModal}
            variant="outlined"
            className="ml-2"
          >
            Ok
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default InfoModal;
