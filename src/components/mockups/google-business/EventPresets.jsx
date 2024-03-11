import React from "react";
import CustomDate from "../../Input/CustomDate";
import SelectInput from "../../Input/SelectInput";
import CustomTime from "../../Input/CustomTime";
import CustomInput from "../../Input/CustomInput";

const EventPresets = ({ presets, buttonOptions, handleChange, type }) => {
  return (
    <>
      <div className="flex flex-1 flex-row">
        <span className="mr-2 flex flex-1">
          <CustomInput
            label={"Event Title*"}
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
      <div className="flex flex-row my-3">
        <span className="mr-2 flex flex-1">
          <SelectInput
            label={"Button(optional)"}
            value={presets?.button}
            onChange={handleChange}
            options={buttonOptions}
            type={type}
            identifier={"button"}
          />
        </span>
        <span className="mr-2 flex flex-1">
          <CustomTime
            label={"Start Time"}
            value={presets?.startTime}
            onChange={handleChange}
            type={type}
            identifier={"startTime"}
          />
        </span>
        <span className="flex flex-1">
          <CustomTime
            label={"End Time"}
            value={presets?.endTime}
            onChange={handleChange}
            type={type}
            identifier={"endTime"}
          />
        </span>
      </div>
      <div>
        <span className="flex flex-1">
          <CustomInput
            label={"Button Link"}
            value={presets?.buttonLink}
            onChange={handleChange}
            placeholder={"Eg: https://google.com"}
            type={type}
            identifier={"buttonLink"}
          />
        </span>
      </div>
    </>
  );
};

export default EventPresets;
