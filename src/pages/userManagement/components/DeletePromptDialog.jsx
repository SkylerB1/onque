import React from "react";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogFooter,
  Button,
  CardBody,
} from "@material-tailwind/react";
import logo from "../../../assets/delete-account-modal.svg";
import { getCommaSeparatedNames } from "../../../utils";
import LoadingButton from "../../../components/button/LoadingButton";
import ToasterCustomConatiner from "../../../components/ToasterCustomConatiner";

const DeletePromptDialog = ({
  isOpen,
  onClose,
  loading,
  email,
  brands,
  handleSubmit,
}) => {
  return (
    <Dialog size="lg" open={isOpen} onClose={onClose}>
      <ToasterCustomConatiner />
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
          <p className="mb-6 text-2xl">
            Are you sure you want to delete {email}?
          </p>
          <div className="w-full text-center">
            <p className="leading-8 mb-3">
              The {email} roles associated with the following brands will be
              removed:
            </p>
            <p className="font-bold items-center mb-4">
              {getCommaSeparatedNames(brands, "brand_name")}
            </p>
          </div>
        </div>
      </CardBody>
      <DialogFooter>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          title="Delete"
          className="w-36 h-12"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default DeletePromptDialog;
