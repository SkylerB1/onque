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
} from "@material-tailwind/react";

const AddUserDialog = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContinue = () => {
    // Handle continue action, e.g., submit form
    console.log("Email submitted:", email);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Add User
        </Typography>
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
        <Input
          fullWidth
          autoFocus
          label="Email"
          placeholder="Enter email address"
          value={email}
          onChange={handleEmailChange}
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleContinue} color="primary" variant="contained">
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddUserDialog;
