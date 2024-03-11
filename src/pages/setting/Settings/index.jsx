;

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
import { useNavigate, useParams } from "react-router-dom";

const Setting = () => {
  const {tab} = useParams();
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
    navigate('/setting/Settings/'+activeTab);
  },[activeTab]);


  return (
    <div className="p-4 sm:ml-64 mt-20">
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
                onClick={() => setActiveTab(value)}
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
