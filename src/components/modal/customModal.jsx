import React from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

export default function CustomModal({
  open,
  Close,
  handleDelete,
  id,
  title,
  children,
}) {
  return (
    <Dialog className="border-none" open={open} onClose={Close}>
      <DialogBody className="text-center text-black">{title}</DialogBody>
      <DialogFooter className="flex flex-row justify-center">
        <Button size="sm" onClick={() => handleDelete(id)}>
          ACCEPT
        </Button>
        <Button size="sm" variant="outlined" className="ml-2" onClick={Close}>
          CANCEL
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
