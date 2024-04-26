import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Input,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { validateEmail } from "../../../utils";
import { axiosInstance } from "../../../utils/Interceptor";
import InfoIcon from "../../../assets/InfoIcon";

const AddUserDialog = ({
  isOpen,
  onClose,
  collaborators,
  setSelectedUser,
  toggleUserDialog,
}) => {
  const [email, setEmail] = useState("");
  const isValidEmail = useMemo(() => Boolean(validateEmail(email)), [email]);
  const [user, setUser] = useState({ isValid: false, message: "The e-mail field must be a valid email" });

  const handleEmailChange = (event) => {
    const email = event.target.value;
    if (isValidEmail) checkUser(email);
    setEmail(email);
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  const checkUser = async (email) => {
    try {
      const res = await axiosInstance.get(`/user/isValid?email=${email}`);
      if (res.status === 200) {
        const existingCollaborator = collaborators?.some(
          (item) => item.email === email
        );
        if (existingCollaborator) {
          setUser({
            isValid: false,
            message:
              "This user has already been added to your collaborators list",
          });
        } else {
          setSelectedUser((prev) => ({ ...prev, ...res.data }));
          setUser({ isValid: true, message: "" });
        }
      }
    } catch (err) {
      setUser({
        isValid: false,
        message:
          "This e-mail address does not match any active user.",
      });
    }
  };

  const handleContinue = () => {
    toggleUserDialog();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Add User
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
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
        <Input
          fullWidth
          autoFocus
          label="Email"
          placeholder="Enter email address"
          value={email}
          error={!isValidEmail}
          onChange={handleEmailChange}
        />
        {isValidEmail && !user.isValid && (
          <Alert
            className="bg-[#3b82f61a] flex items-center mt-4"
            icon={<InfoIcon width={20} height={20} fill={"#2196f3"} />}
          >
            <span className="text-[#2196f3] text-sm">{user.message}</span>
          </Alert>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          disabled={!user.isValid}
          onClick={handleContinue}
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddUserDialog;
