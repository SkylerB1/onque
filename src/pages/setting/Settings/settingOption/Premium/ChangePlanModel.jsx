import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  FaRegCreditCard,
  FaCcMastercard,
  FaCcVisa,
  FaCcAmex,
} from "react-icons/fa";
import {
  Input,
  Button,
  Typography,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import countries from "./CountryName";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "#EFEFEF",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

const ChangePlanModel = ({ open, handleClose, listData, selectedOption }) => {
  const prices =
    selectedOption === "Monthly"
      ? listData.monthly_price
      : listData.annualy_price;
  const [formData, setFormData] = useState({
    company: "",
    taxId: "",
    address: "",
    country: "",
    email: "",
    cardDitels: {
      cardNumber: "",
      exp: "",
      cvv: "",
    },
    price: prices,
  });

  const [opens, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(opens === value ? 0 : value);

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

  const formatCardNumber = (input) => {
    const cardNumber = input.replace(/\D/g, "");
    let formattedCardNumber = "";

    for (let i = 0; i < cardNumber.length; i += 4) {
      formattedCardNumber += cardNumber.slice(i, i + 4) + " ";
    }

    formattedCardNumber = formattedCardNumber.trim();

    return formattedCardNumber;
  };

  return (
    <Dialog size="xl" open={open} onClose={handleClose}>
      <DialogBody>
        <div className="social-tabme-modal">
          <div className="flex flex-1 items-center justify-between mb-5 mt-2">
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", fontWeight: "bold" }}
            >
              Change plan
            </Typography>
            <button
              className="p-2  rounded-2xl"
              onClick={() => handleClose(false)}
            >
              <GrClose className="text-xl" />
            </button>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-500"></hr>
          <div className="flex flex-1 mt-8">
            <div className="w-full">
              <h2 className="text-lg font-semibold">Billing information</h2>
              <div color="transparent" shadow={false}>
                <form className="mt-6 mb-2" onSubmit={handleSubmit}>
                  <div className="flex flex-1 items-start">
                    <div className="w-3/4 mr-5">
                      <div className="flex flex-1 items-start justify-between ">
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
                          <select
                            aria-label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-[#EFEFEF] p-2 border rounded-lg"
                          >
                            <option value="">Country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-8 mr-8">
                        <p>Payment method</p>
                        <Accordion
                          open={opens === 1}
                          className="mb-2 mt-5 rounded-lg border border-blue-gray-100 px-4"
                        >
                          <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className={`border-b-2 transition-colors ${
                              opens === 1 ? "" : ""
                            }`}
                          >
                            <div className="flex flex-1 items-center justify-between">
                              <div className="flex flex-1 items-center gap-1">
                                <FaRegCreditCard /> Credit card
                              </div>
                              <div className="flex flex-1 items-end justify-end gap-1">
                                <FaCcMastercard /> <FaCcVisa /> <FaCcAmex />
                              </div>
                            </div>
                          </AccordionHeader>
                          <AccordionBody className="pt-3 text-base font-normal">
                            <div className="flex flex-1 items-start justify-between mt-8">
                              <div className="w-1/2 mr-8">
                                <Input
                                  color="purple"
                                  type="text"
                                  size="lg"
                                  label="Card Number"
                                  name="cardNumber"
                                  value={formData.cardDitels.cardNumber}
                                  onChange={(e) => {
                                    const formattedCardNumber =
                                      formatCardNumber(e.target.value);
                                    setFormData({
                                      ...formData,
                                      cardDitels: {
                                        ...formData.cardDitels,
                                        cardNumber: formattedCardNumber,
                                      },
                                    });
                                  }}
                                />
                              </div>
                              <div className="w-1/2 mr-8">
                                <Input
                                  color="purple"
                                  type="text"
                                  size="lg"
                                  label="Expiration Date"
                                  // placeholder="12/12"
                                  name="exp"
                                  value={formData.cardDitels.exp}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="w-1/2 mr-8">
                                <Input
                                  color="purple"
                                  type="number"
                                  size="lg"
                                  label="CVV"
                                  name="cvv"
                                  value={formData.cardDitels.cvv}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </AccordionBody>
                        </Accordion>
                        <Accordion
                          open={opens === 2}
                          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                        >
                          <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className={`border-b-0 transition-colors ${
                              open === 2
                                ? "text-blue-500 hover:!text-blue-700"
                                : ""
                            }`}
                          >
                            <img
                              src="/assets/PayPal.svg?react" // Path relative to the "public" directory
                              alt="On Que Logo"
                              width={60}
                              height={5}
                            />
                          </AccordionHeader>
                          <AccordionBody className="pt-0 text-base font-normal">
                            <div className="flex flex-1 items-center justify-center mb-3">
                              <button className="bg-[#F9C338] px-14 py-2 rounded-2xl">
                                <img
                                  src="/assets/PayPal.svg?react" // Path relative to the "public" directory
                                  alt="On Que Logo"
                                  width={60}
                                  height={5}
                                />
                              </button>
                            </div>
                          </AccordionBody>
                        </Accordion>
                      </div>
                    </div>
                    <div className="w-1/4">
                      <p className="font-semibold  text-xl">{listData.title}</p>
                      <hr className="h-px my-8 bg-black border-0 dark:bg-black"></hr>
                      <div>
                        <div className="flex flex-1 items-center justify-between">
                          <div>Annual plan price</div>
                          <div className="font-semibold">
                            {selectedOption === "Monthly"
                              ? listData.monthly_price
                              : listData.annualy_price}
                            .00 GBP
                          </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <div>Taxes (21%)</div>
                          <div className="font-semibold">113.40 GBP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="h-px my-8 bg-black border-0 dark:bg-black"></hr>
                  <div className="mt-8 flex flex-1 items-center justify-between">
                    <div className="flex flex-1 items-center justify-start">
                      Final price{" "}
                      <p className="font-semibold ml-2">
                        {selectedOption === "Monthly"
                          ? listData.monthly_price
                          : listData.annualy_price}{" "}
                        GBP
                      </p>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="mt-6 bg-black text-white"
                        fullWidth
                      >
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ChangePlanModel;
