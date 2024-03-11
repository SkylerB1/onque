import InputComponent from "../../../components/Input/InputComponent";
import Accordion from "../../../components/accordion/Accordion";
import GoogleBusiness from "../../../assets/google-business.svg?react";

import React, { useMemo, useState } from "react";
import OfferPresets from "./OfferPresets";
import EventPresets from "./EventPresets";
import PostPresets from "./PostPresets";

function GbusinessPresets({
  mediaType,
  additionalPresets,
  setAdditionalPresets,
}) {
  const buttonOptions = useMemo(
    () => [
      { label: "None", value: "" },
      { label: "Book", value: "BOOK" },
      { label: "Order", value: "ORDER" },
      { label: "SHOP", value: "SHOP" },
      { label: "LEARN_MORE", value: "LEARN_MORE" },
      { label: "SIGN_UP", value: "SIGN_UP" },
      { label: "CALL", value: "CALL" },
    ],
    []
  );

  const handleChange = (identifier, value, type) => {
    setAdditionalPresets((prevState) => ({
      ...prevState,
      Google_Business: {
        ...prevState.Google_Business,
        [type]: {
          ...prevState.Google_Business[type],
          [identifier]: value,
        },
      },
    }));
  };

  const presetType = {
    OFFER: (
      <OfferPresets
        presets={additionalPresets?.OFFER}
        buttonOptions={buttonOptions}
        handleChange={handleChange}
        type={"OFFER"}
      />
    ),
    EVENT: (
      <EventPresets
        presets={additionalPresets?.EVENT}
        buttonOptions={buttonOptions}
        handleChange={handleChange}
        type={"EVENT"}
      />
    ),
    POST: (
      <PostPresets
        presets={additionalPresets?.POST}
        handleChange={handleChange}
        buttonOptions={buttonOptions}
        type={"POST"}
      />
    ),
  };
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className="my-2">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<GoogleBusiness fill="#0077B5" width={18} height={18} />}
        title={"Google Business presets"}
      >
        {presetType[mediaType]}
      </Accordion>
    </div>
  );
}

export default GbusinessPresets;
