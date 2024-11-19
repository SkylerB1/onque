import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { getRoles } from "../../redux/features/roleSlice";
import { axiosInstance } from "../../utils/Interceptor";

const data = [
  {
    label: "Users",
    value: "users",
    component: Users,
  },
  {
    label: "Roles and permissions",
    value: "rolepermisson",
    component: RoleAndPermisson,
  },
];
const UserManagement = () => {
  const { tab } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState();
  const [loadingCollaborator, setLoadingCollaborator] = useState(false);
  const [activeTab, setActiveTab] = React.useState(tab.toLowerCase());

  useEffect(() => {
    navigate("/userManagement/" + activeTab);
    if (activeTab == "users") {
      getCollaborators();
    }
  }, [activeTab]);

  const getCollaborators = async (searchQuery = "") => {
    try {
      setLoadingCollaborator(true);
      const res = await axiosInstance.get(
        `/user/collaborators?searchQuery=${searchQuery}`
      );

      setCollaborators(res.data);
      setLoadingCollaborator(false);
    } catch (err) {
      setLoadingCollaborator(false);
    }
  };

  useEffect(() => {
    getCollaborators();
    dispatch(getRoles());
  }, []);

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
            {Array.isArray(data) && data.map(({ label, value }) => (
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
            {Array.isArray(data) && data.map((item, index) => (
              <TabPanel key={index} value={item.value}>
                <item.component
                  collaborators={collaborators}
                  setCollaborators={setCollaborators}
                  loadingCollaborator={loadingCollaborator}
                  getCollaborators={getCollaborators}
                  setLoadingCollaborator={setLoadingCollaborator}
                />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagement;
