import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function ForgotPassword({ open, Close }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/send-email`,
        { data }
      );
      toast.success(response?.data?.message);
      reset();
      Close();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleclose = async () => {
    Close();
    reset();
  };

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   setFormData(e.target.value);
  // };

  // const handleSave = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/user/send-email`,
  //       { email: email }
  //     );
  //     if (response.status === 200) {
  //       const message = response.data.message;
  //       showSuccessMessage(message);
  //       handleClose();
  //     } else {
  //       const message = err.response.data.message;
  //       showErrorMessage(message);
  //     }
  //   } catch (err) {
  //     const message = err.response.data.message;
  //     showErrorMessage(message);
  //   }
  // };

  return (
    <Dialog open={open} onClose={handleclose}>
      <DialogHeader>Recover your account</DialogHeader>
      <DialogBody>
        <Typography
          variant="p"
          component="h2"
          sx={{ marginBottom: "16px", fontWeight: "bold" }}
        >
          Enter your email address and you will get the instructions to recover
          your account.
        </Typography>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          label={
            <div style={{ backgroundColor: "white", height: "0px" }}>Email</div>
          }
          className="focus:shadow-none"
          color="purple"
        />
        <br />

        <DialogFooter className="flex justify-center">
          <Button
            type="submit"
            color="blue"
            rounded="true"
            ripple="light"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button
            rounded="true"
            ripple="light"
            onClick={handleclose}
            variant="outlined"
            className="ml-2"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogBody>
    </Dialog>
  );
}
