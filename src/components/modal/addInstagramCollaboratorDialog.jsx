import React, { useState, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { axiosInstance } from "../../utils/Interceptor";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../utils/LocalStorage";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import UpgradeSubscription from "./UpgradeSubscription";
import LoadingButton from "../button/LoadingButton";
import { addBrand } from "../../redux/features/brandsSlice";
import { initialiseConnections } from "../../redux/features/connectionSlice";
import { toastrError } from "../../utils";
import ToasterCustomConatiner from "../ToasterCustomConatiner";
import Instagram from "../svg/Instagram";

const initial = {
  collaborator_name: "",
};

export default function AddInstagramCollaboratorDialog({
  open,
  Close,
  platform,
  collaborators,
  setCollabortors,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initial);
  const isDisabled = useMemo(() => {
    return formData.collaborator_name.trim() === "" ? true : false;
  }, [formData.collaborator_name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check name is already exist or not
    let collaborator_name = formData.collaborator_name;
    if (collaborators.length > 0) {
      let isExist = collaborators.find(
        (item) => item.toLowerCase() === collaborator_name.toLowerCase()
      );
      if (isExist) {
        toastrError("This collaborator already exist");
        return false;
      }
    }
    setCollabortors((prev) => {
      return [...prev, collaborator_name];
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData(initial);
    Close();
  };

  return (
    <>
      <Dialog size="sm" open={open} onClose={Close} className="bg-gray-100">
        <ToasterCustomConatiner />
        <DialogHeader className="justify-between my-2">
          <div className="flex items-center gap-3">
            {
              <>
                <Instagram width={18} height={18} />
                <Typography variant="h5">Add Collaborator</Typography>
              </>
            }
          </div>

          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => {
              // handleClick("autoPublish", true);
              handleClose();
            }}
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
          <div className="mt-2 mb-6 px-5">
            <Typography variant="paragraph" className="">
              Note that non existent users or users that do not allow being
              tagged will be ignored when publishing this post.
            </Typography>

            <div className="mt-4 flex gap-4 justify-center items-center">
              <div className="w-10/12 ">
                <Input
                  color="purple"
                  label="User name"
                  type="text"
                  size="lg"
                  name="collaborator_name"
                  value={formData.collaborator_name}
                  onChange={handleInputChange}
                  autoFocus
                  className="focus:shadow-none"
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <hr />
        <DialogFooter className="flex flex-row justify-center">
          <LoadingButton
            loading={loading}
            title={"Add"}
            className="w-24 h-9"
            size="sm"
            onClick={handleSubmit}
            disabled={loading || isDisabled}
          />
          <Button
            size="sm"
            variant="outlined"
            onClick={handleClose}
            className="ml-2"
          >
            CANCEL
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
