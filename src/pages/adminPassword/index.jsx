import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../utils/Interceptor";
import { useSelector } from "react-redux";
import { API_URL, toastrSuccess } from "../../utils";

const AdminPasswordModal = ({ open, onClose }) => {
  const user = useSelector((state) => state.user.value);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Old password is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
    if (newPassword !== confirmPassword) newErrors.confirmPassword = "New password and Confirm password does not match.";

    return newErrors;
  };

  const handleUpdatePassword = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(`${API_URL}/user/change-master-password`, {
        oldPassword,
        newPassword,
        email: user.email,
      });
      if (response.data.success) {
        toastrSuccess("Password updated successfully.");
        resetFields();
        onClose();
      } else {
        setErrors({ server: response.data.msg || "Failed to update password." });
      }
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to update password.";
      setErrors({ server: message });
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
    >
      <Card className="p-2">
        <CardBody className="flex flex-col gap-4">
          <Typography className="mb-2" variant="h4" color="blue-gray">Update Admin Password</Typography>
          <Input
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setErrors((prev) => ({ ...prev, oldPassword: "" })); // Clear error
            }}
            required
            icon={
              <span onClick={() => setShowOldPassword(!showOldPassword)}>
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            }
          />
          {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}

          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev) => ({ ...prev, newPassword: "" })); // Clear error
            }}
            required
            icon={
              <span onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            }
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: "" })); // Clear error
            }}
            required
            icon={
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            }
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button onClick={handleClose} color="gray" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePassword}
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default AdminPasswordModal;
