import React, { useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

const MySetttings = ({ emails, addEmail, deleteEmail }) => {
  const [emailInput, setEmailInput] = useState("");

  const handleChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleAddEmail = () => {
    if (isValidEmail(emailInput)) {
      addEmail(emailInput);
      setEmailInput(""); // Clear input after adding email
    } else {
      // Handle invalid email
      alert("Please enter a valid email address");
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDelete = (index) => {
    deleteEmail(index);
  };

  return (
    <div>
      <div className="header">
        <Typography variant="h6" className="mb-4">
          My Settings
        </Typography>
        <Typography variant="subtitle" className="my-4">
          Select how you want to receive notifications, you will only receive
          notifications in the method in which you select
        </Typography>
        <div className="flex items-center gap-4 pt-2">
          <Select label="Select Version" value={"On my email"}>
            <Option>On my email</Option>
            <Option>On my mobile device</Option>
          </Select>
          <Input
            id="emailInput"
            type="email"
            label="Email Address"
            value={emailInput}
            onChange={handleChange}
          />
          <Button onClick={handleAddEmail}>Add</Button>
        </div>
      </div>
      <div className="body mt-8">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => {
              const isLast = index === emails.length - 1;
              const classes = isLast
                ? "p-2"
                : "p-2 border-b border-blue-gray-50";
              return (
                <tr key={index}>
                  <td className={classes}>{email}</td>
                  <td className={classes}>
                    <Tooltip content="Delete">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(index)}
                      >
                        <TrashIcon className="h-6 w-6" color="black" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySetttings;
