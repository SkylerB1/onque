import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

const LostChangesDialog = ({ open, onClose, closeParentDialog }) => {
  return (
    <Dialog open={open} onClose={onClose} size="md">
      <DialogBody>Your changes will be lost, are you sure?</DialogBody>
      <DialogFooter className="flex justify-center gap-3">
        <Button
          onClick={() => {
            closeParentDialog();
          }}
        >
          Accept
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LostChangesDialog;
