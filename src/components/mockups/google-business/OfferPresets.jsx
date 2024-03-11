import React from "react";
import CustomInput from "../../Input/CustomInput";
import CustomDate from "../../Input/CustomDate";

const OfferPresets = ({ presets, handleChange, type }) => {
  return (
    <>
      <div className="flex flex-row">
        <span className="mr-2 flex flex-1">
          <CustomInput
            label={"Offer Title*"}
            value={presets?.title}
            onChange={handleChange}
            type={type}
            identifier="title"
          />
        </span>
        <span className="mr-2 flex flex-1">
          <CustomDate
            label={"Start Date*"}
            value={presets?.startDate}
            onChange={handleChange}
            type={type}
            identifier={"startDate"}
          />
        </span>
        <span className="flex flex-1">
          <CustomDate
            label={"End Date*"}
            value={presets?.endDate}
            onChange={handleChange}
            type={type}
            identifier={"endDate"}
          />
        </span>
      </div>
      <div className="flex flex-row flex-1 my-2">
        <span className="mr-2 flex flex-1">
          <CustomInput
            label={"Coupon Code"}
            value={presets?.couponCode}
            onChange={handleChange}
            type={type}
            identifier="couponCode"
          />
        </span>
        <span className="mr-2 flex flex-1">
          <CustomInput
            label={"Offer Link"}
            value={presets?.offerLink}
            onChange={handleChange}
            type={type}
            identifier="offerLink"
            placeholder={"Example: https://google.com"}
          />
        </span>
        <span className=" flex flex-1">
          <CustomInput
            label={"Terms & Conditions"}
            value={presets?.termsCondition}
            onChange={handleChange}
            type={type}
            identifier="termsCondition"
          />
        </span>
      </div>
    </>
  );
};

export default OfferPresets;
