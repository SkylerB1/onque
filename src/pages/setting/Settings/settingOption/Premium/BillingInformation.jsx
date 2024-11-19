import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import countries from "./CountryName";

const BillingInformation = () => {
  const [formData, setFormData] = useState({
    company: "",
    taxId: "",
    address: "",
    country: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to the backend using an API call.
    // You can use libraries like Axios to make the request.
    console.log(formData);
    // Reset the form or perform any necessary actions after submitting.
  };

  return (
    <div color="transparent" shadow={false}>
      <form className="mt-6 mb-2" onSubmit={handleSubmit}>
        <div className="">
          <div className="flex flex-1 items-start justify-between">
            <div className="w-1/2 mr-8">
              <Input
                color="purple"
                type="text"
                size="lg"
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2 mr-8">
              <Input
                color="purple"
                type="text"
                size="lg"
                label="VAT/Tax Id Number"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-1 items-start justify-between mt-8">
            <div className="w-1/2 mr-8">
              <Input
                color="purple"
                type="text"
                size="lg"
                label="Full address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2 mr-8">
              {/* <label>Country</label> */}
              <select
                aria-label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full bg-[#EFEFEF] p-2 border rounded-lg"
              >
                <option value="">Country</option>
                {Array.isArray(countries) && countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 mr-8">
            <Input
              color="purple"
              type="text"
              size="lg"
              label="E-mails to receive invoices"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-8 w-52">
          <Button
            type="submit"
            className="mt-6 bg-[#E4EDF4] text-[#84919B]"
            fullWidth
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BillingInformation;
