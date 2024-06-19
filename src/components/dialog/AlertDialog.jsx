import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import LoadingButton from "../button/LoadingButton";
import { DeleteModalError } from "../common/Images";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

const AlertDialog = ({
  open,
  title,
  description,
  alertImgSrc = DeleteModalError,
  loading = false,
  btnTitle = "OK",
  onSubmit,
}) => {
  return (
    <Dialog open={open}>
      <ToasterCustomConatiner />
      <DialogBody>
        <div className="text-center flex items-center flex-col">
          <div className="flex justify-center mb-6">
            <img
              src={alertImgSrc}
              alt="delete-modal-img"
              width="100%"
              height="100%"
            />
          </div>
          <p className="mb-6 text-2xl text-black">{title}</p>
          <div
            className="w-full text-center mb-6"
            style={{ maxWidth: "648px" }}
          >
            <p className="leading-8 mb-8 text-black">{description}</p>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <LoadingButton
          title={btnTitle}
          loading={loading}
          onClick={onSubmit}
          className="w-32 h-10"
          color="primary"
          variant="contained"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default AlertDialog;
