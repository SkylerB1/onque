import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Users from "./components/Users";
import RoleAndPermisson from "./components/RolesAndPermission";
import { useNavigate, useParams } from "react-router-dom";

const UserManagement = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(tab.toLowerCase());
  const data = [
    {
      label: "Users",
      value: "users",
      desc: <Users />,
    },
    {
      label: "Role and permission",
      value: "rolepermisson",
      desc: <RoleAndPermisson />,
    },
  ];

  useEffect(() => {
    navigate("/userManagement/" + activeTab);
  }, [activeTab]);

  return (
    <div className="xl:ml-64 xl:mt-20 xl:block  xl:p-4 md:block md:ml-20 md:p-2 md:mt-20 sm:ml-20  ">
      <div className=" mt-2 mb-2">
        <div className="mt-5 mb-5 text-2xl font-light">Users management</div>
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

export default UserManagement;
