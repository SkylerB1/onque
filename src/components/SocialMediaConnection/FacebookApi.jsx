import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import FacebookFilled from "../svg/FacebookFilled";
import { useSelector } from "react-redux";
import { FacebookPagePlatform, InstagramAccount } from "../common/commonString";
import { useAppContext } from "../../context/AuthContext";

const FacebookApi = ({
  setModalData,
  setLoading,
  handleShowModal,
  label,
  backgroundColor,
  icon,
  selected,
}) => {
  const user = useSelector((state) => state.user.value);
  const { broadcastConnection } = useAppContext();
  const GET_PAGES_URL =
    API_URL + `/auth/facebook/pages?brandId=${user?.userBrandId}`;
  const header = useMemo(() => ({
    title: "Facebook Page",
    subTitle: "Select the page you want to connect with this client.",
    icon: <FacebookFilled fill={"0095f6"} width={30} height={30} />,
  }));

  const handleFacebookLogin = async () => {
    try {
      const oauthUrl = `${import.meta.env.VITE_API_URL}/auth/facebook?userId=${
        user?.id
      }&brandId=${user?.userBrandId}`;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        oauthUrl,
        "facebook",
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

  const handleAccounts = async () => {
    try {
      setLoading(true);
      handleShowModal(header);
      const response = await axiosInstance.get(GET_PAGES_URL);
      if (response.status === 200) {
        const dataWithProfile = response.data.map((item) => {
          const { id, name } = item;
          return {
            id,
            name,
            profile: `https://graph.facebook.com/${id}/picture`,
          };
        });
        setModalData(dataWithProfile);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleConnection = ({ platform }) => {
      if (platform === FacebookPagePlatform) {
        handleAccounts();
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
  }, [broadcastConnection]);

  return (
    <div
      onClick={handleFacebookLogin}
      className="flex w-full justify-between items-center rounded-md px-5"
      style={{ background: backgroundColor }}
    >
      <span className="me-8 py-3 text-base text-white">
        <p className="font-bold">{label}</p>
      </span>
      <span className="h-12 text-xl py-3 text-stone-600">{icon}</span>
    </div>
  );
};

export default FacebookApi;
