import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Access = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check if both input fields are non-empty
    setIsSaveButtonEnabled(formData.email === "" && formData.password === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <p className='text-xl font-bold mb-8'>Access information</p>
      <div>
        <p>This is your access information. You'll need to introduce your password to perform any change</p>
        <div className='mt-5 w-3/4 mb-8'>
          <form className="mt-6 mb-2" onSubmit={handleSubmit}>
            <div className="flex flex-1 items-start justify-between">
              <div className="w-1/2 mr-8">
                <p className="mb-3">E-mail</p>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 mr-8 relative">
                <p className="mb-3">New password</p>
                <Input
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  placeholder="Enter new password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-14 right-4 transform -translate-y-1/2"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <div className="mt-8 w-52 flex">
              <Button
                type="submit"
                className="mt-6 px-5 py-3 bg-black text-white hover:bg-green-500"
                fullWidth
                disabled={!isSaveButtonEnabled} // Disable the button if isSaveButtonEnabled is false
              >
                SAVE
              </Button>
            </div>
          </form>
        </div>
        {/* <p className='text-xl font-bold mb-6 mt-10'>Two factor authentication</p>
        <p className='mb-10'>To increase the security of your account you can enable 2-factor authentication (2FA) with your mobile device.</p>
        <Button className=" w-52 mt-6 px-5 py-3 bg-black text-white hover:bg-orange-500">Enable</Button> */}
      </div>
    </div>
  );
}

export default Access;
