import React, { useEffect, useMemo, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../utils/Interceptor";
import BrandNavber from "../../../components/side-navbar/BrandNavber";
import { socialMediaList } from "../../../components/common/index";
import SelectionModal from "../../../components/dialog/SelectDialog";
import { ConnectUrl, ConnectUrlFn } from "../../../utils";
import useConnections from "../../../components/customHooks/useConnections";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { useAppContext } from "../../../context/AuthContext";
import { useSelector } from "react-redux";
import CustomModal from "../../../components/modal/customModal";
import InstagramAuthDialog from "../../../components/SocialMediaConnection/InstagramAuthDialog";
import ErrorConnectionDialog from "../../../components/dialog/ErrorConnectionDialog";
import { getTextForRoleInfo } from "../../../utils/commonUtils";

const initialHeader = {
  title: "",
  subTitle: "",
  icon: null,
};

const Connection = () => {
  const { broadcastConnection, subscription, validations } = useAppContext();
  const role = useMemo(() => validations?.brandRole?.role, [validations]);

  const brandAccess = useMemo(
    () => validations && (!role || role?.editBrand),
    [role]
  );

  const { connections, getConnections } = useConnections();
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id || "";
  const [premium, setPremium] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDeleteConnection, setLoadingDeleteConnection] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(initialHeader);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opens, setOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [platformName, setPlatformName] = useState();
  const [instagramAuth, setInstagramAuth] = useState(false);
  const [isConnectionError, setConnectionError] = useState(null);
  const [textForRoleInfo, setTextForRoleInfo] = useState(null);

  const isSubscribed = Boolean(subscription) || false;

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

  const handleShowModal = (header, toggle = true) => {
    setModalHeader(header);
    setShowModal(toggle);
  };
  // This function is called when clicked on on social media when wants to connect
  const handleMenuItemClick = (item) => {
    setSelected(item);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeSelected = () => {
    setSelected(null);
  };

  const closeErrorDialog = () => {
    setConnectionError(null);
  };

  const handleDelete = async (data) => {
    try {
      setLoadingDeleteConnection(true);
      const { id, platform } = data;
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/user/logout/socialMedia/${id}`
      );
      if (response.status === 200) {
        const savedPlatforms = useLocalStorage(
          `brand.${brandId}.planner.networks`,
          "get"
        );
        const newSavedPlatforms = savedPlatforms?.filter(
          (item) => item.platform !== platform
        );

        useLocalStorage(
          `brand.${brandId}.planner.networks`,
          "add",
          JSON.stringify(newSavedPlatforms)
        );
        getConnections(brandId);
        setSelectedConnection(null);
        setOpen(false);
        setShowModal(false);
        setLoadingDeleteConnection(false);

        toast.success(response?.data?.message);
      }
    } catch (error) {
      setLoadingDeleteConnection(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
    setSelected(null);
  };

  const handleSelected = async (data) => {
    try {
      setLoading(true);
      // const URL = ConnectUrl[selected];
      const URL = ConnectUrlFn(selected, brandId);
      // console.log(selected, URL, data);
      const response = await axiosInstance.post(URL, data);
      if (response.status === 200) {
        getConnections(brandId);
        removeSelected();
        handleCloseModal();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleConnection = ({ platform, error }) => {
      if (platform && error) {
        setConnectionError({ platform, error });
      } else {
        const brandId = user?.brand?.id;

        getConnections(brandId);
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
    return () => {
      broadcastConnection.removeEventListener("message", handleConnection);
    };
  }, [broadcastConnection, brandId]);

  useEffect(() => {
    let textForRoleInfo = getTextForRoleInfo(role);
    setTextForRoleInfo(textForRoleInfo);
  }, [role]);

  return (
    <div className="p-2 sm:ml-10 ">
      <div className="">
        <div className="min-h-[50rem] mt-24 flex mb-2 bg-white rounded-lg shadow-2xl">
          <div className="xl:w-1/6 xl:border-r-2 xl:ml-8 md:w-2/6 md:ml-2 ">
            <BrandNavber />
          </div>
          <div className="xl:w-5/6 pb-40 md:w-4/6">
            {/* Role Info Section */}
            {textForRoleInfo != null && (
              <>
                <div
                  id="alert-additional-content-1"
                  className="p-4 mb-4 mr-8 ml-8 mt-8 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">
                      {Array.isArray(textForRoleInfo) && textForRoleInfo.map(
                        (value, index) =>
                          value.title +
                          (textForRoleInfo.legth - 1 < index ? " , " : "")
                      )}
                    </h3>
                  </div>
                  <div className="mt-2 mb-4 text-sm">
                    {Array.isArray(textForRoleInfo) && textForRoleInfo.map((value, index) => (
                      <React.Fragment key={index}>
                        {value.description}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* Role Info Section End Here */}
            <div className="bg-[#EBEBEB] mr-8 ml-8 mt-8 rounded-lg ">
              {premium === true ? (
                <div className="p-4 min-w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-[#5E5E5E]">
                      Onboarding a client to OnQue.
                    </p>
                    <AiFillCloseCircle onClick={() => setPremium(false)} />
                  </div>
                  <p className="text-base text-[#5E5E5E]">
                    In this area you can quickly connect each of your clients
                    social media accounts to OnQue. Each client area allows you
                    to manage one X account, a Facebook page, Instagram account,
                    Youtube channel, TikTok profile, LinkedIn page and Google my
                    business profile.
                  </p>
                  <p className="text-base text-[#5E5E5E] mt-2 mb-2">
                    If you manage multiple clients within your business please
                    be mindful to not cross connect accounts. Check that, at the
                    time of onboarding to OnQue, you are logged in to the
                    TikTok, X, Youtube and LinkedIn account that matches the
                    Facebook & Instagram account you connect.
                  </p>
                  <p className="text-base text-[#5E5E5E] mt-2 mb-2">
                    Struggling to connect? Get in touch with the Helpdesk.
                  </p>
                  {!isSubscribed && (
                    <button className="bg-[#d7dfeb] hover:bg-[#d7dfeb] text-white font-semibold text-sm py-2 px-4 rounded">
                      <Link to="/setting/price">GET PREMIUM</Link>
                    </button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-1 flex-wrap p-6">
              {Array.isArray(socialMediaList) && socialMediaList.map((item, index) => {
                const conn = Array.isArray(connections) && connections?.find(
                  (conn) =>
                    conn.platform.toLowerCase() === item.platform.toLowerCase()
                );
                return (
                  <div
                    className="mt-3 cursor-pointer flex flex-1 p-2"
                    onClick={() => handleMenuItemClick(item.key)}
                    key={index}
                  >
                    <div className="flex flex-1 flex-col min-w-[25rem]">
                      <div className="flex flex-1 items-center justify-start cursor-default">
                        {item.icon(item.color)}
                        <p className="ml-2 text-xl">{item.title}</p>
                      </div>
                      <div
                        className={`mt-3 ${
                          !brandAccess ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {!conn ? (
                          <span
                            className={`${
                              !brandAccess
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                          >
                            <item.component
                              label={item.label}
                              icon={item.icon()}
                              backgroundColor={item.color}
                              setModalData={setModalData}
                              setLoading={setLoading}
                              instagramDialogHandler={instagramDialogHandler}
                              handleShowModal={handleShowModal}
                              selected={selected}
                            />
                          </span>
                        ) : (
                          <div className="flex flex-1 items-center justify-start border p-2 rounded-md border-blue-gray-400">
                            <div className="flex flex-1 items-center justify-start">
                              {conn.screenName ? (
                                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                  <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {conn.screenName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              ) : (
                                <div className="w-8 h-8 flex items-center justify-center">
                                  {item.icon(15, 15)}
                                </div>
                              )}
                              <p className="ml-2 text-xl">
                                {conn.screenName ? conn.screenName : ""}
                              </p>
                            </div>
                            <div className="mr-2 p-1 hover:bg-[#e9edf5] rounded-2xl">
                              {brandAccess && (
                                <IoMdClose
                                  onClick={() => {
                                    setOpen(true);
                                    setSelectedConnection(conn);
                                    setPlatformName(conn.platform);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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

      <CustomModal
        open={opens}
        Close={() => setOpen(false)}
        loading={loadingDeleteConnection}
        title={`Are you sure that you want to disconnect ${platformName}?`}
        handleDelete={handleDelete}
        data={selectedConnection}
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
    </div>
  );
};

export default Connection;
