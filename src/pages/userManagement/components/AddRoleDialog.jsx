import React, { useEffect, useMemo, useState } from "react";
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
import { axiosInstance } from "../../../utils/Interceptor";
import LoadingButton from "../../../components/button/LoadingButton";
import { useDispatch } from "react-redux";
import { addRole } from "../../../redux/features/roleSlice";
import toast from "react-hot-toast";
const initial = {
  name: "",
  description: "",
  viewPlanner: false,
  fullAccessPlanner: false,
  editBrand: false,
  schedulePosts: false,
  publishPosts: false,
};
const AddRoleDialog = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(true);
  const [openEditPermissions, setOpenEditPermissions] = useState(true);
  const [openManagementPermissions, setOpenManagementPermissions] =
    useState(true);
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isSubmitDisabled = useMemo(() => {
    const {
      name,
      description,
      viewPlanner,
      fullAccessPlanner,
      schedulePosts,
      editBrand,
    } = data;

    return (
      name === "" ||
      description === "" ||
      (!viewPlanner && !fullAccessPlanner && !schedulePosts && !editBrand)
    );
  }, [data]);

  const toggleAccordion = (type) => {
    if (type === "open") {
      setOpen(!open);
    } else if (type === "editPermission") {
      setOpenEditPermissions(!openEditPermissions);
    } else {
      setOpenManagementPermissions(!openManagementPermissions);
    }
  };

  const handleAddRole = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/roles", data);

      if (res.status === 200) {
        dispatch(addRole(res.data));
        setLoading(false);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong")
    }
  };

  const handleChange = (indentifier, value) => {
    setData((prev) => ({ ...prev, [indentifier]: value }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="lg" className="max-h-">
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
        <div className="overflow-y-auto max-h-[700px]">
          <div className="grid sm:grid-cols-2 gap-4 gap-x-10 mb-3">
            <div className="w-100">
              <Input
                label="RoleName"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 gap-x-10 mb-8">
            <div className="w-100 mt-4">
              <Textarea
                label="Description"
                value={data.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
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
                    <CustomSwitch
                      identifier="viewPlanner"
                      checked={data.viewPlanner}
                      onChange={handleChange}
                    />
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

                    <CustomSwitch
                      identifier="fullAccessPlanner"
                      onChange={handleChange}
                    />
                  </label>
                  <Typography>
                    Gives full access to the planner (Calendar, history and
                    autolists), as well as creating, modifying and publishing
                    posts and all associated functionality.
                  </Typography>
                </div>
                {/* <div className="px-3">
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

                    <CustomSwitch
                      identifier="schedulePosts"
                      onChange={handleChange}
                    />
                  </label>
                  <Typography>
                    It allows you to schedule and publish posts without
                    approval. It also allows you to create and modify autolists.
                  </Typography>
                </div> */}
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

                    <CustomSwitch
                      identifier="editBrand"
                      onChange={handleChange}
                    />
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
        <LoadingButton
          title="Save"
          loading={loading}
          className="w-32 h-10"
          disabled={isSubmitDisabled}
          onClick={handleAddRole}
          color="primary"
          variant="contained"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default AddRoleDialog;
