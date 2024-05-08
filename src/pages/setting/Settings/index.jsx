import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Account from "./settingOption/Account";
import Access from "./settingOption/Access";
import Price from "./settingOption/Price";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Setting = () => {
  const { tab } = useParams();
  // Use useLocation hook to access the current URL location
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(tab.toLowerCase());
  const data = [
    {
      label: "Account",
      value: "account",
      desc: <Account />,
    },
    {
      label: "Access",
      value: "access",
      desc: <Access />,
    },
    {
      label: "Plans and billing",
      value: "price",
      desc: <Price />,
    },
  ];

  useEffect(() => {
    // navigate("/setting/" + activeTab);
    console.log(activeTab);
  }, [activeTab]);

  useEffect(() => {
    // Extract the slug from the pathname of the location object
    const slug = location.pathname.split("/").pop();

    // Do something with the slug (e.g., log it)
    console.log("Slug changed:", slug, activeTab);
    setActiveTab(slug);
  }, [location]); // Trigger effect when location changes

  const handleTabChanged = (value) => {
    setActiveTab(value);
    navigate("/setting/" + value);
  };
  return (
    <div className="p-4 xl:mx-72 mt-20 md:mx-32">
      <div className=" mt-2 mb-2">
        <div className="mt-5 mb-5 text-2xl font-light">Setting</div>
        <Tabs value={activeTab}>
          <TabsHeader
            className="w-[30rem] rounded-none border-b border-blue-gray-10 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabChanged(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <hr className="w-[90rem]" />
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
  );
};

export default Setting;
