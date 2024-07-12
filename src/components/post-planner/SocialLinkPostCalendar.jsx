import React, { useEffect, useMemo, useState } from "react";
import SelectionModal from "../dialog/SelectDialog";
import useConnections from "../customHooks/useConnections";
import { API_URL, ConnectUrl, ConnectUrlFn } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import { socialMediaList } from "../common/index.jsx";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../../utils/LocalStorage";
import InstagramAuthDialog from "../SocialMediaConnection/InstagramAuthDialog.jsx";
import ErrorConnectionDialog from "../dialog/ErrorConnectionDialog.jsx";
import { useAppContext } from "../../context/AuthContext.jsx";
import { Alert, Typography } from "@material-tailwind/react";
import InfoIcon from "../../assets/InfoIcon.jsx";
import { Planner } from "../common/Images.js";

const initialHeader = {
  title: "",
  subTitle: "",
  icon: null,
};

const SocialLinkPostCalendar = ({ validations, role }) => {
  const { getConnections } = useConnections();
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(initialHeader);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [instagramAuth, setInstagramAuth] = useState(false);
  const [isConnectionError, setConnectionError] = useState(null);
  const { broadcastConnection } = useAppContext();
  const fullAccess = useMemo(
    () => validations && (!role || role?.fullAccessPlanner),
    [role, validations]
  );

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
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      // const URL = ConnectUrl[selected];
      const URL = ConnectUrlFn(selected, brandId);

      const response = await axiosInstance.post(URL, data);

      if (response.status === 200) {
        getConnections(brandId);
        removeSelected();
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
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
    return () => {
      broadcastConnection.removeEventListener("message", handleConnection);
    };
  }, [broadcastConnection, brandId]);

  return (
    <>
      <div className="flex mt-24">
        <div className="flex flex-1 items-start justify-between bg-white rounded-lg">
          <div>
            <div className="mt-10 ml-8 w-full text-[#4A5568]">
              <div className="text-3xl w-full">Calendar</div>
              <div className=" mt-8 text-lg w-full pr-10">
                Start today to visually plan and automate your social media
                content and save time to focus on other tasks: upload your posts
                in bulk, share content on several social networks
                simultaneously, discover your best hours to publish. Now connect
                the social networks you want to plan with a simple click.
              </div>
            </div>
            <div className="flex flex-1 ml-8">
              <div className=" xl:w-2/6 md:w-full mb-8">
                <div className="mt-10">
                  {!fullAccess && (
                    <Alert
                      className="bg-[#3b82f61a] flex items-center"
                      icon={
                        <InfoIcon width={30} height={30} fill={"#2196f3"} />
                      }
                    >
                      <Typography className="text-lg text-[#3b82f6cc]">
                        You do not have permissions to add connections to this
                        brand. Please contact the brand manager to connect a
                        network.
                      </Typography>
                    </Alert>
                  )}
                </div>
                {fullAccess &&
                  socialMediaList.map((item, index) => {
                    return (
                      <div
                        className="mt-5 cursor-pointer"
                        onClick={() => handleMenuItemClick(item.key)}
                        key={index}
                      >
                        <item.component
                          label={item.label}
                          icon={item.icon()}
                          backgroundColor={item.color}
                          modalData={modalData}
                          setModalData={setModalData}
                          setLoading={setLoading}
                          instagramDialogHandler={instagramDialogHandler}
                          handleShowModal={handleShowModal}
                          selected={selected}
                        />
                      </div>
                    );
                  })}
              </div>

              <div className="xl:w-4/6 lg:block md:hidden flex justify-center">
                <img src={Planner} height="auto" />
              </div>
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

export default SocialLinkPostCalendar;
