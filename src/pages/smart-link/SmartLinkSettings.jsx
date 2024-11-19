import React, { useState, useRef } from "react";
import { Input, Button } from "@material-tailwind/react";
import { FaRegCopy } from "react-icons/fa6";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ButtonSettings from "./settings/ButtonSettings";
import MediaSettings from "./settings/MediaSettings";
import AppearanceSettings from "./settings/AppearanceSettings";
import TestSortable from "./settings/TestSortable";
import InputComponent from "../../components/Input/InputComponent";
import SmartLinkInput from "../../components/button/SmartLinkInput";

const SmartLinkSettings = ({
  bioName,
  bioSlug,
  handleBioNameChange,
  handleBioSlugChange,
}) => {
  const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;
  const [activeTab, setActiveTab] = React.useState("buttons");

  const bioSlugRef = useRef(null);
  const [lastCopied, setLastCopied] = useState(null);

  const copyToClipboard = (ref, identifier) => {
    const inputValue = ref.current.value;

    let key = identifier + "-" + 1;
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setLastCopied(key);
        setTimeout(() => setLastCopied(false), 2000); // Reset the copied status after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const data = [
    {
      label: "Buttons",
      value: "buttons",
      desc: <ButtonSettings />,
      disabled: false,
    },
    {
      label: "Media",
      value: "media",
      desc: <MediaSettings />,
      disabled: false,
    },
    {
      label: "Appearance",
      value: "appearance",
      desc: <AppearanceSettings />,
      disabled: true,
    },
  ];

  return (
    <div className="">
      <div className="font-bold ">General</div>

      <div className="flex flex-wrap mt-5">
        <div class="w-full xl:w-1/2 p-1">
          <SmartLinkInput
            label={"Name"}
            error={true}
            value={bioName}
            onChange={handleBioNameChange}
          />
        </div>
        <div class="w-full xl:w-1/2 p-1  rounded-lg">
          <SmartLinkInput
            label={"URL Slug"}
            error={true}
            value={bioSlug}
            onChange={handleBioSlugChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-5">
        <div class="w-full p-1  rounded-lg">
          <SmartLinkInput
            label={"Bio Link"}
            value={ORIGIN_URL + "/public/smartlink/" + bioSlug}
            icon={
              <FaRegCopy
                size={16}
                className={`cursor-pointer ${
                  lastCopied === `bio-link-1` ? "text-green-500 border-2" : ""
                }`}
                onClick={() => copyToClipboard(bioSlugRef, "bio-link")}
              />
            }
            readOnly
            className={""}
            inputRef={bioSlugRef}
          />
        </div>
      </div>
      <div class="mt-10">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {Array.isArray(data) && data.map(({ label, value, disabled }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
                disabled={disabled}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="">
            {Array.isArray(data) && data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default SmartLinkSettings;
