import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Spinner,
} from "@material-tailwind/react";
import { validateEmail } from "../../../utils";
import { axiosInstance } from "../../../utils/Interceptor";
import InfoIcon from "../../../assets/InfoIcon";
import { useSelector } from "react-redux";
import ToasterCustomConatiner from "../../../components/ToasterCustomConatiner";
import UserService from "../../../services/UserServices";
const initialUser = {
  isValid: false,
  showMessage: true,
  message: "The e-mail field must be a valid email",
};
const AddUserDialog = ({
  isOpen,
  onClose,
  collaborators,
  setSelectedUser,
  toggleUserDialog,
  clearSelectedUser,
}) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const userDetail = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);

  // const isValidEmail = useMemo(() => {
  //   let isValid = Boolean(validateEmail(email));
  //   console.log(isValid);
  //   return isValid;
  // }, [email]);

  const [user, setUser] = useState(initialUser);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    let isValidEmail = Boolean(validateEmail(email));
    setIsValidEmail(isValidEmail);

    if (isValidEmail) {
      if (email === userDetail.email) {
        setUser({
          isValid: false,
          showMessage: true,
          message: "You cannot add yourself as a collaborator.",
        });
      } else {
        checkUser(email);
      }
    } else {
      setUser({
        isValid: false,
        showMessage: true,
        message: "Please enter a valid email.",
      });
    }
  };
  const handleClose = () => {
    setEmail("");
    setUser(initialUser);
    clearSelectedUser();
    onClose();
  };

  const checkUser = async (email) => {
    setLoading(true);
    let params = "email=" + email;

    const res = await UserService.isValid(params);

    if (res.code === 200) {
      const existingCollaborator = collaborators?.some(
        (item) => item.email === email
      );
      if (existingCollaborator) {
        setUser((prev) => ({
          ...prev,
          isValid: false,
          showMessage: true,
          message:
            "This user has already been added to your collaborators list",
        }));
      } else {
        setSelectedUser((prev) => ({ ...prev, ...res.data, isActive: true }));
        setUser((prev) => ({
          ...prev,
          showMessage: false,
          isValid: true,
          message: "",
        }));
      }
      setLoading(false);
    } else if (res.code === 404) {
      setUser({
        isValid: true,
        showMessage: true,
        message:
          "This e-mail address does not match any active user. You will be able to send them a personalized email to join!",
      });
      setSelectedUser((prev) => ({ ...prev, email }));
    }
    setLoading(false);
  };

  const handleContinue = () => {
    toggleUserDialog();
    onClose();
  };

  useEffect(() => {
    if (isOpen == false) {
      setEmail("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs">
      <ToasterCustomConatiner />
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
          autoFocus={true}
          label="Email"
          placeholder="Enter email address"
          value={email}
          error={!isValidEmail}
          onChange={handleEmailChange}
        />
        {loading && (
          <div className="flex flex-row justify-center mt-2">
            <Spinner className="w-10 h-10" />
          </div>
        )}
        {!loading && isValidEmail && user?.showMessage && (
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
          type="submit"
          disabled={!user.isValid || loading}
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
