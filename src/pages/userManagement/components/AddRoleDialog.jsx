import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Input,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import Accordion from "../../../components/accordion/Accordion";
import CustomSwitch from "../../../components/Input/CustomSwitch";

const AddRoleDialog = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(true);
  const [openEditPermissions, setOpenEditPermissions] = useState(true);
  const [openManagementPermissions, setOpenManagementPermissions] =
    useState(true);

  const toggleAccordion = (type) => {
    if (type === "open") {
      setOpen(!open);
    } else if (type === "editPermission") {
      setOpenEditPermissions(!openEditPermissions);
    } else {
      setOpenManagementPermissions(!openManagementPermissions);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="md">
      <DialogHeader className="justify-between my-2">
        <Typography variant="h5">Add Role</Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={onClose}
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
      <DialogBody>
        <div className="overflow-y-auto xl:max-h-[700px] sm:max-h-[500px]">
          <div className="grid sm:grid-cols-2 gap-4 gap-x-10 mb-3">
            <div className="w-100">
              <Input label="RoleName" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 gap-x-10 mb-8">
            <div className="w-100 mt-4">
              <Textarea label="Description" />
            </div>
          </div>
          <div className="textarea my-4">
            <Accordion
              open={open}
              onClick={() => toggleAccordion("open")}
              title={"View only permissions"}
            >
              <div className="grid sm:grid-cols-2 gap-4 gap-x-10">
                <div className="px-3">
                  <label
                    htmlFor="viewPlanner"
                    className="flex justify-between mb-2 cursor-pointer"
                  >
                    <label
                      htmlFor="viewPlanner"
                      className="cursor-pointer block antialiased font-sans text-base font-light leading-relaxed text-inherit "
                    >
                      View planner
                    </label>
                    <CustomSwitch id="viewPlanner" />
                  </label>
                  <Typography>
                    Allows you to view the entire publishing calendar as well as
                    planned posts information, but not to make any modifications
                    to planned posts, nor create or delete them. It does allow
                    you to create, edit and delete notes on posts.
                  </Typography>
                </div>
              </div>
            </Accordion>
            <Accordion
              open={openEditPermissions}
              onClick={() => toggleAccordion("editPermission")}
              title={"Editing permissions"}
            >
              <div className="grid sm:grid-cols-2 gap-4 gap-x-10">
                <div className="px-3">
                  <label
                    htmlFor="planner"
                    className="flex justify-between mb-2 cursor-pointer"
                  >
                    <label
                      htmlFor="planner"
                      className="cursor-pointer block antialiased font-sans text-base font-light leading-relaxed text-inherit "
                    >
                      Planner
                    </label>

                    <CustomSwitch id="planner" />
                  </label>
                  <Typography>
                    Gives full access to the planner (Calendar, history and
                    autolists), as well as creating, modifying and publishing
                    posts and all associated functionality.
                  </Typography>
                </div>
                <div className="px-3">
                  <label
                    htmlFor="Schedule"
                    className="flex justify-between mb-2 cursor-pointer"
                  >
                    <label
                      htmlFor="Schedule"
                      className="cursor-pointer block antialiased font-sans text-base font-light leading-relaxed text-inherit"
                    >
                      Schedule and publish posts
                    </label>

                    <CustomSwitch id="Schedule" />
                  </label>
                  <Typography>
                    It allows you to schedule and publish posts without
                    approval. It also allows you to create and modify autolists.
                  </Typography>
                </div>
              </div>
            </Accordion>
            <Accordion
              open={openManagementPermissions}
              onClick={() => toggleAccordion("management")}
              title={"Managment permissions"}
            >
              <div className="grid sm:grid-cols-2 gap-4 gap-x-10">
                <div className="px-3">
                  <label
                    htmlFor="Brands"
                    className="flex justify-between mb-3 cursor-pointer"
                  >
                    <label
                      htmlFor="Brands"
                      className="cursor-pointer block antialiased font-sans text-base font-light leading-relaxed text-inherit"
                    >
                      Brands
                    </label>

                    <CustomSwitch id="Brands" />
                  </label>
                  <Typography>
                    Gives full access to the brand configuration, including the
                    creation and management of connections and managing the
                    users who have access to the brand and their roles.
                  </Typography>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => alert()} color="primary" variant="contained">
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddRoleDialog;
