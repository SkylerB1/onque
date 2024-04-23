import React from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

export default function CustomModal({
  open,
  Close,
  handleDelete,
  id,
  title,
  body,
}) {
  return (
    <Dialog size="md" className="border-none" open={open} onClose={Close}>
      <DialogHeader className="flex justify-center font-medium text-xl">
        {title}
      </DialogHeader>
      <DialogBody className="text-center text-black px-6">
        <Typography className="text-base">{body}</Typography>
      </DialogBody>
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
