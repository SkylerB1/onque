import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogFooter,
  Button,
  CardBody,
} from "@material-tailwind/react";
import logo from "../../../assets/delete-account-modal.svg";

const DeletePromptDialog = ({ isOpen, onClose, email, brands, onDelete }) => {
  return (
    <Dialog size="md" open={isOpen} onClose={onClose}>
      <DialogHeader className="flex justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={onClose}
          ripple="light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="black"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <CardBody>
        <div className="flex justify-center mb-6">
          <img src={logo} max-width="100%" alt />
        </div>
        <div className="text-center flex items-center flex-col">
          <p class="mb-6 text-2xl">
            Are you sure you want to delete joe@lamiservices.com?
          </p>
          <div class="w-full text-center">
            <p class="leading-8 mb-3">
              The joe@lamiservices.com roles associated with the following
              brands will be removed:
            </p>
            <p class="font-bold items-center mb-4">
              jjd.socialmedia, Salvo 1968 LTD
            </p>
          </div>
        </div>
      </CardBody>
      <DialogFooter>
        <Button onClick={onDelete}>Delete</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeletePromptDialog;