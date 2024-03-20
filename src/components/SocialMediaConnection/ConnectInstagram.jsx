import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import FacebookFilled from "../svg/FacebookFilled";
import { useSelector } from "react-redux";
import { InstagramPlatform } from "../common/commonString";
import { useAppContext } from "../../context/AuthContext";

const ConnectInstagram = ({
  setModalData,
  setLoading,
  handleShowModal,
  label,
  backgroundColor,
  instagramDialogHandler,
  icon,
}) => {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const { broadcastConnection } = useAppContext();
  const GET_ACCOUNTS_URL =
    API_URL + `/auth/instagram-business-accounts?brandId=${brandId}`;
  const header = useMemo(() => ({
    title: "Instagram Accounts",
    subTitle: "Select the account you want to connect with this client.",
    icon: <FacebookFilled fill={"0095f6"} width={30} height={30} />,
  }));

  const handleAccounts = async () => {
    try {
      setLoading(true);
      handleShowModal(header);
      const response = await axiosInstance.get(GET_ACCOUNTS_URL);
      if (response.status === 200) {
        const instaAccounts = response.data.map((item) => {
          const { connected_instagram_account } = item;
          const { id, username, profile_picture_url } =
            connected_instagram_account;
          return {
            id,
            name: username,
            profile: profile_picture_url,
            pageId: item.id,
          };
        });
        setModalData(instaAccounts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleConnection = ({ platform }) => {
      if (platform === InstagramPlatform) {
        handleAccounts();
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
  }, [broadcastConnection]);

  return (
    <>
      <div
        onClick={instagramDialogHandler}
        className="flex w-full justify-between items-center rounded-md px-5"
        style={{ background: backgroundColor }}
      >
        <span className="me-8 h-12 py-3 text-base text-white">
          <p className="font-bold whitespace-nowrap">{label}</p>
        </span>
        <span className="h-12 text-xl py-3 text-stone-600">{icon}</span>
      </div>
    </>
  );
};

export default ConnectInstagram;
