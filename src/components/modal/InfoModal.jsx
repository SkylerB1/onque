import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const InfoModal = ({ show, toggleModal, infoData }) => {
  const { content = "" } = infoData;

  return (
    <Dialog size="sm" open={show}>
      <ToasterCustomConatiner />
      <DialogBody className="justifyCenter">
        <Typography color="black">{content}</Typography>
      </DialogBody>
      <DialogFooter>
        <div className="justifyCenter">
          <Button
            size="sm"
            onClick={toggleModal}
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
