import React, { useState, useEffect, useId, useRef } from "react";
import { Select, Option } from "@material-tailwind/react";
import Instagram from "../../../components/svg/Instagram";
import Twitter from "../../../components/svg/Twitter";
import FacebookFilled from "../../../components/svg/FacebookFilled";
import LinkedIn from "../../../components/svg/LinkedIn";
import { Input, IconButton } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Youtube from "../../../components/svg/Youtube";
import { MdEmail } from "react-icons/md";
import Email from "../../../components/svg/Email";

export default function IconItems({ values, deleteIcon, updateValues }) {
  const [iconValue, setIconValue] = useState(values.iconName);
  const [urlValue, setUrlValue] = useState(values.url);
  const [inputLabel, setInputLabel] = useState("URL");

  const options = [
    {
      value: "twitter",
      label: "Twitter",
      icon: <Twitter width={18} height={18} />,
      inputValueLabel: "URL",
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <FacebookFilled fill="#0095f6" width={18} height={18} />,
      inputValueLabel: "URL",
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: <Instagram width={18} height={18} />,
      inputValueLabel: "URL",
    },
    {
      value: "linkedIn",
      label: "LinkedIn",
      icon: <LinkedIn fill="#0077B5" width={18} height={18} />,
      inputValueLabel: "URL",
    },
    {
      value: "youtube",
      label: "Youtube",
      icon: <Youtube width={18} height={18} fill="#FF0000" />,
      inputValueLabel: "URL",
    },
    {
      value: "email",
      label: "Email",
      icon: <Email width={18} height={18} />,
      inputValueLabel: "E-Mail",
    },
  ];

  const handleChange = (e, identifier) => {
    let value;
    if (identifier == "url") {
      value = e.target.value;
      setUrlValue(e.target.value);
    }
    if (identifier == "iconName") {
      value = e;
      setIconValue(value);
      let selectedOption = options.filter((option) => option.value == value);
      selectedOption && setInputLabel(selectedOption[0].inputValueLabel);
    }

    updateValues(values.id, { ...values, [identifier]: value });
  };

  return (
    <>
      <div className="border border-gray-900 rounded-lg flex xl:flex-col">
        <div className="flex items-center justify-center xl:border-b   border-r  border-gray-900 cursor-move">
          <BsThreeDots size={24} className="xl:block hidden" />
          <BsThreeDotsVertical size={24} className=" xl:hidden" />
        </div>
        <div class=" pb-5 px-5">
          <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-5">
            <div class="w-full xl:w-[40%] ">
              <Select
                size="md"
                label="Select Icon"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
                value={iconValue}
                onChange={(e) => handleChange(e, "iconName")}
              >
                {options.map(({ value, label, icon }, key) => (
                  <Option
                    key={key}
                    value={value}
                    className="flex items-center gap-2"
                  >
                    {icon}
                    {label}
                  </Option>
                ))}
              </Select>
            </div>
            <div class="w-full xl:w-[60%] flex items-center gap-1 ">
              <Input
                inputType={"text"}
                label={inputLabel}
                value={urlValue}
                onChange={(e) => handleChange(e, "url")}
              />
              <IconButton
                variant="outlined"
                onClick={() => deleteIcon(values.id)}
              >
                <MdDelete size={24} className="cursor-pointer " />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
