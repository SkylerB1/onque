import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { EnterpisePlanPng } from "../common/Images";
import { useNavigate } from "react-router-dom";

const GoPremiumDialog = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      handler={handleClose}
      maxWidth="xs"
    >
      <DialogBody>
        <div className="text-center">
          <img src={EnterpisePlanPng} className="w-auto h-auto mx-auto" />
          <h3 className="mb-5">Get ADVANCED</h3>
          <p className="mb-5">
            Managing user roles requires an Advanced or Superior plan. Upgrade
            your subscription to be able to use this functionality.
          </p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block gradient-button-solid normal-case whitespace-nowrap text-sm md:text-base mx-auto"
          onClick={() => navigate("/setting/price")}
        >
          Upgrade to Premium
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default GoPremiumDialog;
