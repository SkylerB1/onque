import React from "react";
import SelectInput from "../../Input/SelectInput";
import CustomInput from "../../Input/CustomInput";

const PostPresets = ({ presets, buttonOptions, handleChange, type }) => {
  return (
    <div className="flex flex-row">
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
      <span className="flex flex-1">
        <CustomInput
          label={"Button Link*"}
          placeholder={"Example: https://google.com"}
          value={presets?.buttonLink}
          onChange={handleChange}
          type={type}
          identifier={"buttonLink"}
        />
      </span>
    </div>
  );
};

export default PostPresets;
