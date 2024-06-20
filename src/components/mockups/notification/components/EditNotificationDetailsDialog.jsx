import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Typography,
} from "@material-tailwind/react";
import MySetttings from "./MySetttings";
import LostChangesDialog from "./LostChangesDialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosInstance } from "../../../../utils/Interceptor";
import { toast } from "react-hot-toast";
import ToasterCustomConatiner from "../../../ToasterCustomConatiner";

const EditNotificationDetailsDialog = ({ isOpen, onClose }) => {
  const [openLostChangesDialog, setOpenLostChangesDialog] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [emails, setEmails] = useState([]);
  const user = useSelector((state) => state.user.value);

  const handleSaveTest = async () => {
    const brandId = user?.brand?.id;
    try {
      const response = await axiosInstance.post(
        `${
          import.meta.env.VITE_API_URL
        }/notification/send-test-email?brandId=${brandId}`,
        { recipient: emails }
      );
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
        handleSave();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const brandId = user?.brand?.id;
    try {
      const response = await axiosInstance.put(
        `${
          import.meta.env.VITE_API_URL
        }/notification/notification-config?brandId=${brandId}`,
        emails
      );
      if (response.status === 201) {
        toast.success(`${response.data.data}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const addEmail = async (email) => {
    setEmails((prevEmails) => [...prevEmails, email]);
    setChangesMade(true);
  };

  const deleteEmail = (index) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
    setChangesMade(true);
  };

  const closeDialog = () => {
    if (changesMade) {
      setOpenLostChangesDialog(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmails([]);
    }
  }, [isOpen]);

  async function getNotificationDetailsData() {
    const brandId = user?.brand?.id;
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/notification?brandId=${brandId}`
    );

    if (res && res.data && res.data.data) {
      const newEmails = res.data.data.map((item) => item.email);
      setEmails((prevEmails) => [...prevEmails, ...newEmails]);
    }
  }

  useEffect(() => {
    if (isOpen) {
      getNotificationDetailsData();
    } else {
      setEmails([]);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={closeDialog} size="lg">
        <ToasterCustomConatiner />
        <DialogHeader className="justify-between my-2">
          <Typography variant="h5">Settings</Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={closeDialog}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              color="black"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <hr />
        <DialogBody>
          <div className=" mt-2 mb-2 px-2">
            <MySetttings
              emails={emails}
              addEmail={addEmail}
              deleteEmail={deleteEmail}
            />
          </div>
        </DialogBody>
        <hr />
        <DialogFooter className="justify-between">
          <Button variant="outlined" onClick={handleSaveTest}>
            Save and test
          </Button>

          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </Dialog>
      <LostChangesDialog
        open={openLostChangesDialog}
        onClose={() => {
          setOpenLostChangesDialog(false);
          setChangesMade(false);
        }}
        closeParentDialog={() => {
          onClose();
          setOpenLostChangesDialog(false);
          setChangesMade(false);
        }}
      />
    </>
  );
};

export default EditNotificationDetailsDialog;
