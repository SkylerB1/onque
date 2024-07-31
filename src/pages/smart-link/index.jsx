import React, { useEffect } from "react";
import SelectInput from "../../components/Input/SelectInput";
import { Button } from "@material-tailwind/react";
import AddFilled from "../../assets/AddFilled";
import { FaRegClone } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import SmartLinkAnalytics from "./SmartLinkAnalytics";
import SmartLinkSettings from "./SmartLinkSettings";
import InputColor from "react-input-color";

const Smartlink = () => {
  const [color, setColor] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("settings");
  const data = [
    {
      label: "Settings",
      value: "settings",
      desc: <SmartLinkSettings />,
    },
    {
      label: "Analytics",
      value: "analytics",
      desc: <SmartLinkAnalytics />,
    },
  ];
  const brands = [
    { label: "Brand A", value: "A" },
    { label: "Brand B", value: "A" },
    { label: "Brand C", value: "A" },
  ];
  const handleChange = () => {};
  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <div className="mt-[100px] mx-16  min-h-screen shadow-lg shadow-gray-300 rounded-lg border-2">
      <div className="w-full grid lg:grid-cols-12 gap-2">
        <div className="lg:col-span-7  border-gray-200 ">
          <div className="h-screen flex flex-col">
            <div className="flex-none p-4">
              <div className="m-10 flex flex-wrap gap-3 ">
                <div className="lg:w-[60%] w-full">
                  <SelectInput
                    label={"Brand"}
                    value={"glen"}
                    onChange={handleChange}
                    options={brands}
                    identifier={"brand"}
                    className=""
                  />
                </div>
                <div className="flex items-center gap-3 lg-w-[40%]">
                  <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-2"
                  >
                    <IoMdAdd size={16} />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-2"
                  >
                    <FaRegClone size={16} />
                    Clone
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-2"
                  >
                    <MdDelete size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
              <div className="m-10  ">
                <Tabs value={activeTab} className="">
                  <TabsHeader
                    className=" w-[20rem] rounded-none border-b border-blue-gray-50 bg-transparent p-0"
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
                  <TabsBody>
                    {data.map(({ value, desc }) => (
                      <TabPanel key={value} value={value}>
                        {desc}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5  hidden lg:block">2</div>
      </div>
    </div>
  );
};

export default Smartlink;
