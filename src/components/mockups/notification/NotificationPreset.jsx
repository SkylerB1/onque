import React, { useEffect, useState } from "react";
import NotificationBell from "../../../assets/NotificationBell";
import Accordion from "../../accordion/Accordion";
import { Button, Chip } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import EditNotificationDetailsDialog from "./components/EditNotificationDetailsDialog";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/Interceptor";

const NotificationPreset = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const user = useSelector((state) => state.user.value);

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

  const toggleAccordion = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      getNotificationDetailsData();
    } else {
      setEmails([]);
    }
  }, [open]);

  return (
    <div className="my-2">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<NotificationBell width={18} height={18} />}
        title={"Notification presets"}
        headerItems={
          <div className="absolute right-20 bottom-5 flex gap-2  items-center">
            <Button
              className="rounded-full flex items-center py-0 px-1"
              variant="outlined"
              onClick={(e) => handleModalOpen(e)}
            >
              <PencilSquareIcon width={18} height={18} />
              <span className="text-xs">edit</span>
            </Button>
          </div>
        }
      >
        <div className="flex flex-row gap-5">
          {emails.map((email, index) => (
            <Chip key={index} value={email} className="rounded-full" />
          ))}
        </div>
      </Accordion>
      <EditNotificationDetailsDialog
        isOpen={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NotificationPreset;
