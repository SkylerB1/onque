import React, { useEffect, useMemo } from "react";
import { axiosInstance, getToken } from "../../utils/Interceptor";
import { API_URL, toastrError } from "../../utils";
import { LinkedInPages, SelectBrandPage } from "../common/commonString";
import LinkedIn from "../svg/LinkedIn";
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/AuthContext";

let popup;

const LinkedInConnectPage = ({
  selected,
  icon,
  label,
  backgroundColor,
  setModalData,
  setLoading,
  handleShowModal,
  loading,
}) => {
  const header = useMemo(() => ({
    title: LinkedInPages,
    subTitle: SelectBrandPage,
    icon: <LinkedIn width={30} height={30} />,
  }));
  const { broadcastConnection } = useAppContext();
  const user = useSelector((state) => state.user.value);
  const URL = API_URL + `/auth/linkedin/pages?brandId=${user?.brand?.id}`;

  const handleLinkedInLogin = async () => {
    try {
      const oauthUrl = `${
        import.meta.env.VITE_API_URL
      }/auth/linkedin/page?userId=${user?.id}&brandId=${user?.brand?.id}`;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      popup = window.open(
        oauthUrl,
        "linkedin",
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

  const getLinkedInPages = async () => {
    try {
      setLoading(true);
      handleShowModal(header);
      const response = await axiosInstance.get(URL);
      if (response.status === 200) {
        if (response.data.length > 0) {
          const pages = response.data.map((item) => {
            return {
              id: item.id,
              name: item.localizedName,
              vanityName: item.vanityName,
            };
          });
          setModalData(pages);
        } else {
          setModalData(response.data);
        }
        setLoading(false);
      }
    } catch (err) {
      let message = err?.message || "Something went wrong!";
      toastrError(message);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const handleConnection = ({ platform }) => {
      if (platform === LinkedInPages) {
        getLinkedInPages();
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
  }, [broadcastConnection]);

  return (
    <div
      onClick={handleLinkedInLogin}
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

export default LinkedInConnectPage;
