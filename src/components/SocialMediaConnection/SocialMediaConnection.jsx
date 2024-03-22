import React, { useEffect, useState } from "react";
import SelectionModal from "../dialog/SelectDialog";
import { ConnectUrl } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import useConnections from "../customHooks/useConnections.jsx";
import { socialMediaList } from "../common/index";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import InstagramAuthDialog from "./InstagramAuthDialog.jsx";
import { useSelector } from "react-redux";
import ErrorConnectionDialog from "../dialog/ErrorConnectionDialog.jsx";
import { useAppContext } from "../../context/AuthContext.jsx";

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
  const [instagramAuth, setInstagramAuth] = useState(false);
  const [isConnectionError, setConnectionError] = useState(null);
  const { broadcastConnection } = useAppContext();

  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;

  const instagramLogin = async () => {
    try {
      const oauthUrl = `${import.meta.env.VITE_API_URL}/auth/instagram?userId=${
        user?.id
      }&brandId=${brandId}`;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        oauthUrl,
        "instagram",
        "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
          width +
          ", height=" +
          height +
          ", top=" +
          top +
          ", left=" +
          left
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleInstagramLogin = () => {
    instagramDialogHandler();
    instagramLogin();
  };

  const instagramDialogHandler = () => {
    setInstagramAuth(!instagramAuth);
  };
  const handleMenuItemClick = (item) => {
    setSelected(item);
    handler();
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
      setLoading(true);
      const URL = ConnectUrl[selected];
      const response = await axiosInstance.post(URL, data);
      if (response.status === 200) {
        getConnections();
        removeSelected();
        handleCloseModal();
        setLoading(false);
      }
    } catch (err) {}
  };

  const closeErrorDialog = () => {
    setConnectionError(null);
  };

  useEffect(() => {
    const handleConnection = ({ platform, error }) => {
      if (platform && error) {
        setConnectionError({ platform, error });
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
  }, [broadcastConnection]);

  return (
    <>
      <Menu open={open} handler={handler} placement="right-end">
        <MenuHandler>{children}</MenuHandler>
        <MenuList className="px-0">
          {socialMediaList.map((item, index) => {
            const isConnected = connections?.some(
              (conn) => conn.platform === item.platform
            );
            if (!isConnected) {
              return (
                <MenuItem
                  onClick={() => handleMenuItemClick(item.key)}
                  key={index}
                  className="rounded-none"
                >
                  {
                    <item.component
                      label={item.label}
                      icon={item.icon()}
                      backgroundColor={item.color}
                      setModalData={setModalData}
                      loading={loading}
                      setLoading={setLoading}
                      instagramDialogHandler={instagramDialogHandler}
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
      <InstagramAuthDialog
        open={instagramAuth}
        handler={instagramDialogHandler}
        onConfirm={handleInstagramLogin}
      />
      <ErrorConnectionDialog
        data={isConnectionError}
        handler={closeErrorDialog}
      />
    </>
  );
};

export default SocialMediaConnection;
