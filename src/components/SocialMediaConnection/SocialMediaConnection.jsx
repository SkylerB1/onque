import React, { useState } from "react";
import TwitterApi from "./TwitterApi";
import { YouTubeApi } from "./YouTubeApi";
import GoogleBusinessApi from "./GoogleBusinessApi";
import LinkedInConnectProfile from "./LinkedinConnectProfile";
import LinkedInConnectPage from "./LinkedInConnectPage";
import SelectionModal from "../dialog/SelectDialog";
import { API_URL, ConnectUrl } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import useConnections from "../customHooks/useConnections.jsx";
import { socialMediaList } from "../common/index";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

const initialHeader = {
  title: "",
  subTitle: "",
  icon: null,
};

const SocialMediaConnection = ({ children }) => {
  const { connections, getConnections } = useConnections();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(initialHeader);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMenuItemClick = (item) => {
    setSelected(item);
    handleClose();
  };
  const handler = () => {
    setOpen(!open);
  };

  const removeSelected = () => {
    setSelected(null);
  };

  const handleShowModal = (header) => {
    setModalHeader(header);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
    setSelected(null);
  };

  const handleSelected = async (data) => {
    try {
      const URL = ConnectUrl[selected];

      const response = await axiosInstance.post(URL, data);
      if (response.status === 200) {
        getConnections();
        removeSelected();
        handleCloseModal();
      }
    } catch (err) {}
  };

  return (
    <>
      <Menu open={open} handler={handler} placement="right-end">
        <MenuHandler>{children}</MenuHandler>
        <MenuList>
          {socialMediaList.map((item, index) => {
            const isConnected = connections?.some(
              (conn) => conn.platform === item.platform
            );
            if (!isConnected) {
              return (
                <MenuItem
                  onClick={() => handleMenuItemClick(item.key)}
                  key={index}
                >
                  {
                    <item.component
                      label={item.label}
                      icon={item.icon()}
                      backgroundColor={item.color}
                      setModalData={setModalData}
                      loading={loading}
                      setLoading={setLoading}
                      handleShowModal={handleShowModal}
                    />
                  }
                </MenuItem>
              );
            }
          })}
        </MenuList>
      </Menu>

      <SelectionModal
        open={showModal}
        data={modalData}
        title={modalHeader.title}
        loading={loading}
        subTitle={modalHeader.subTitle}
        platformIcon={modalHeader.icon}
        handleClose={handleCloseModal}
        handleSelect={handleSelected}
      />
    </>
  );
};

export default SocialMediaConnection;
