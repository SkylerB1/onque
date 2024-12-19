import React, { useEffect, useState, useCallback } from "react";
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
import SmartView from "./SmartView";
import { useSelector } from "react-redux";
import { addGeneral } from "../../redux/features/smartLinkGeneralSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../utils/Interceptor";
import { addBtn } from "../../redux/features/smartLinkSlice";
import { addIcons } from "../../redux/features/smartIcons";

function isValidUrlPath(url) {
  const regex = /^[a-zA-Z0-9-_]+$/;
  return regex.test(url);
}

const Smartlink = () => {
  const [color, setColor] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("settings");
  const user = useSelector((state) => state.user.value);
  const brandName = user?.brand?.brand_name || "";
  const [bioName, setBioName] = useState("");
  const [bioSlug, setBioSlug] = useState("");
  const [bioUrl, setBioUrl] = useState("");
  const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;
  const dispatch = useDispatch();
  const [allSmartLink, setAllSmartLink] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (allSmartLink.length > 0) {
      const mappedBrands = allSmartLink.map((link) => ({
        label: link.smart_link_name,
        value: String(link.id),
      }));
      setBrands(mappedBrands);
    }
  }, [allSmartLink]);

  const handleChange = (identifier, value, type) => {
    const selectedSmartLink = allSmartLink.find((link) => link.id === Number(value));
    if (selectedSmartLink) {
      setBioName(
        selectedSmartLink.smart_link_name.replace(/\([^)]*\)/, "").trim()
      );
      setBioUrl(selectedSmartLink.smart_link_url);
      setBioSlug(
        selectedSmartLink.smart_link_url.replace(
          /http:\/\/localhost:5173\/public\/smartlink\//,
          ""
        )
      );

      const generalData =[
        {
          smartLinkName: selectedSmartLink.smart_link_name,
          smartLinkUrl: selectedSmartLink.smart_link_url,
          createdBy: selectedSmartLink?.id,
        }
      ];
      dispatch(addGeneral(generalData));

      const mappedButtons = selectedSmartLink.SmartLinkButtonSections.map(button => ({
        id: button.button_id,
        values: {
          text: button.button_text,
          url: button.button_link,
          textColor: { hex: button.button_text_color },
          bgColor: { hex: button.button_bg_color },
          borderColor: { hex: button.button_border_color },
          isDisabled: button.is_disabled
        }
      }));

      dispatch(addBtn(mappedButtons));

      const mappedIcons = selectedSmartLink.SmartLinkIconSections.map(icon => ({
        id: icon.icon_id,                // Map icon_id to id
        iconName: icon.icon_name,         // Map icon_name to iconName
        url: icon.icon_link               // Map icon_link to url
      }));
      dispatch(addIcons(mappedIcons));
    }
  };

  const handleBioNameChange = (e) => {
    setBioName(e.target.value);
  };

  const handleBioSlugChange = useCallback((e) => {
    const value = e.target.value;

    if (value === "") {
      setBioSlug("");
    } else if (isValidUrlPath(value)) {
      setBioSlug(value);
    };

    const newBioUrl = ORIGIN_URL + "/public/smartlink/" + value; // Form bioUrl
    setBioUrl(newBioUrl);
  }, []);

  const handleGetAllSmartLinks = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/smartLink/get-smart-links`
      );
      if (response && response.status === 200 && response.data) {
        setAllSmartLink(response.data || []);
      } else {
        console.warn("Unexpected response structure:", response);
        setAllSmartLink([]);
      }
    } catch (error) {
      console.error("Error fetching smart links:", error);
      setAllSmartLink([]); // Optionally reset state on error
    }
  };

  useEffect(() => {
    handleGetAllSmartLinks();
  }, []);

  useEffect(() => {
    if (bioName && bioSlug && bioUrl) {
      handleGeneralData();
    }
  }, [bioName, bioSlug, bioUrl]);

  const handleGeneralData = () => {
    const generalData = [
      {
        smartLinkName: `${bioName}(${brandName})`,
        smartLinkUrl: bioUrl,
        createdBy: user?.id,
      }
    ];
    dispatch(addGeneral(generalData));
  };

  useEffect(() => {
    if (brands.length > 0) {
      // handleChange("smartLinkId", brands[0].value, "select");
      const selectedSmartLink = allSmartLink[0];
      if (selectedSmartLink) {
        setBioName(
          selectedSmartLink.smart_link_name.replace(/\([^)]*\)/, "").trim()
        );
        setBioUrl(selectedSmartLink.smart_link_url);
        setBioSlug(
          selectedSmartLink.smart_link_url.replace(
            /http:\/\/localhost:5173\/public\/smartlink\//,
            ""
          )
        );
        const generalData =[
          {
            smartLinkName: selectedSmartLink.smart_link_name,
            smartLinkUrl: selectedSmartLink.smart_link_url,
            createdBy: selectedSmartLink?.id,
          }
        ];
        dispatch(addGeneral(generalData));
  
        const mappedButtons = selectedSmartLink.SmartLinkButtonSections.map(button => ({
          id: button.button_id,
          values: {
            text: button.button_text,
            url: button.button_link,
            textColor: { hex: button.button_text_color },
            bgColor: { hex: button.button_bg_color },
            borderColor: { hex: button.button_border_color },
            isDisabled: button.is_disabled
          }
        }));  
        // Dispatch the action with the mapped buttons
        dispatch(addBtn(mappedButtons));
  
        const mappedIcons = selectedSmartLink.SmartLinkIconSections.map(icon => ({
          id: icon.icon_id,
          iconName: icon.icon_name,
          url: icon.icon_link
        }));      
        // Dispatch the action with the mapped icons
        dispatch(addIcons(mappedIcons));
      }
    }
  }, [brands]);


  const data = [
    {
      label: "Settings",
      value: "settings",
      desc: (
        <SmartLinkSettings
          bioName={bioName}
          bioSlug={bioSlug}
          handleBioNameChange={handleBioNameChange}
          handleBioSlugChange={handleBioSlugChange}
        />
      ),
      disabled: false,
    },
    // {
    //   label: "Analytics",
    //   value: "analytics",
    //   desc: <SmartLinkAnalytics />,
    //   disabled: true,
    // },
  ];
  useEffect(() => { }, [activeTab]);

  return (
    <div className="mt-[100px] mx-16  h-[calc(100vh-100px)] shadow-lg shadow-gray-300 rounded-lg border-2">
      <div className="w-full grid lg:grid-cols-12 gap-2">
        <div className="lg:col-span-7  border-gray-200">
          <div className="h-[50rem] flex flex-col min-h-[32rem]">
            <div className="flex-none pt-4 px-10">
              <div className="mt-10 mb-2 flex flex-wrap gap-3 ">
                <div className="lg:w-[60%] w-full">
                  <SelectInput
                    label={"Brand"}
                    value={brands.length > 0 ? brands[0].value : ""}  // Select the first option by default
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
                    disabled
                  >
                    <IoMdAdd size={16} />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-2"
                    disabled
                  >
                    <FaRegClone size={16} />
                    Clone
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-2"
                    disabled  
                  >
                    <MdDelete size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto px-4 bg-gray-100 border-b-2 border-black-200 ">
              <div className="m-5">
                <Tabs value={activeTab} className="">
                  <TabsHeader
                    className=" w-[20rem] rounded-none border-b border-blue-gray-50 bg-transparent p-0"
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
                  <TabsBody>
                    {Array.isArray(data) && data.map(({ value, desc }) => (
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
        <div className="lg:col-span-5  h-96 hidden lg:block">
          <SmartView />
        </div>
      </div>
    </div>
  );
};

export default Smartlink;
