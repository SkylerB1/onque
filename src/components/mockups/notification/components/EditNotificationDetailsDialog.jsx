import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import MySetttings from "./MySetttings";
import MyTeam from "./MyTeam";
import LostChangesDialog from "./LostChangesDialog";

const EditNotificationDetailsDialog = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("settings");
  const [openLostChangesDialog, setOpenLostChangesDialog] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [emails, setEmails] = useState([
    "arison.s@appwrk.com",
    "skylar.d@appwrk.com",
  ]);

  const handleSave = () => {
    // Perform save action or call API with updated data
    alert(JSON.stringify(emails));
    console.log("Saving changes...", emails);
    onClose();
  };

  const addEmail = (email) => {
    setEmails((prevEmails) => [...prevEmails, email]);
    setChangesMade(true);
  };

  const deleteEmail = (index) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
    setChangesMade(true);
  };

  const closeDialog = () => {
    // debugger;
    if (changesMade) {
      setOpenLostChangesDialog(true);
    } else {
      onClose();
    }
  };

  const data = [
    {
      label: "My Settings",
      value: "settings",
      desc: (
        <MySetttings
          emails={emails}
          addEmail={addEmail}
          deleteEmail={deleteEmail}
        />
      ),
    },
    {
      label: "My Team",
      value: "team",
      desc: <MyTeam />,
    },
  ];
  return (
    <>
      <Dialog open={isOpen} onClose={closeDialog} size="lg">
        <DialogHeader className="justify-between my-2">
          <Typography variant="h5">Planner notifications</Typography>
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
            <Tabs value={activeTab}>
              <TabsHeader
                className="w-[30rem] rounded-none border-b border-blue-gray-10 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900" : ""}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </DialogBody>
        <hr />
        <DialogFooter className="justify-between">
          <Button variant="outlined">Save and test</Button>

          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </Dialog>
      <LostChangesDialog
        open={openLostChangesDialog}
        onClose={() => setOpenLostChangesDialog(false)}
        closeParentDialog={() => {
          onClose();
          setOpenLostChangesDialog(false);
        }}
      />
    </>
  );
};

export default EditNotificationDetailsDialog;
