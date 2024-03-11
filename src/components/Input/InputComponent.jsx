import React from "react";
import dayjs from "dayjs";

import {
  Input,
  Option,
  Select,
  Switch,
} from "../../components/imports/imports";

function InputComponent({
  inputType,
  placeholder,
  label,
  selectOptions,
  value,
  onChange,
  identifier,
  className,
  platform,
  handleInput

}) {
  const handleChange = (value) => {
    onChange((prev) => {
      const updatedState = { ...prev };
      if (updatedState[platform]) {
        updatedState[platform] = {
          ...updatedState[platform],
          [identifier]: value,
        };
      }

      return updatedState;
    });
  };

  const handleDate = (date) => {
    const days = date.target.value;
    onChange((prev) => ({
      ...prev,
      GoogleBusiness: {
        ...prev.GoogleBusiness,
        [identifier]: dayjs(days).format("MM/DD/YYYY"),
      },
    }));
  };

  const handleTime = (time) => {
    onChange((prev) => ({
      ...prev,
      GoogleBusiness: {
        ...prev.GoogleBusiness,
        [identifier]: dayjs(time).format(),
      },
    }));
  };

  if (inputType == "date") {
    return (
      <span className="flex flex-1">
        <Input
          type="date"
          label={label}
          onChange={(value) => handleDate(value)}
          variant="outlined"
          value={value}
        />
      </span>
    );
  } else if (inputType == "select") {
    return (
      <Select
        className={className}
        label={label}
        onChange={(value) => handleChange(value)}
      >
        {selectOptions.map((item, index) => {
          return (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          );
        })}
      </Select>
    );
  } else if (inputType == "time") {
    return (
      <Input
        type="time"
        label={label}
        onChange={handleTime}
        variant="outlined"
      />
    );
  } else if (inputType == "switch") {
    return <Switch id={label} label={label} />;
  } else {
    return (
      <Input
        label={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        variant="outlined"
      />
    );
  }
}

export default InputComponent;
