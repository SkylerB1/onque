import React from "react";
import { Input } from "@material-tailwind/react";
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

const SmartLinkSettings = () => {
  const [activeTab, setActiveTab] = React.useState("buttons");
  const data = [
    {
      label: "Buttons",
      value: "buttons",
      desc: <ButtonSettings />,
    },
    {
      label: "Media",
      value: "media",
      desc: <MediaSettings />,
    },
    {
      label: "Appearance",
      value: "appearance",
      desc: <AppearanceSettings />,
    },
  ];
  return (
    <div>
      <div className="font-bold ">General</div>

      <div className="flex flex-wrap mt-5">
        <div class="w-full xl:w-1/2 p-1">
          <Input label="Name" />
        </div>
        <div class="w-full xl:w-1/2 p-1">
          <Input label="URL" icon={<FaRegCopy size={16} />} />
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
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="pb-[300px] pt-[30px]">
            {data.map(({ value, desc }) => (
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
