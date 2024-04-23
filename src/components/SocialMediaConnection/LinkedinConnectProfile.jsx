import React, { useMemo } from "react";
import { API_URL } from "../../utils";
import LinkedIn from "../svg/LinkedIn";
import { LinkedInProfile, SelectBrandProfile } from "../common/commonString";
import { useSelector } from "react-redux";

var popup;

const LinkedInConnectProfile = ({
  selected,
  icon,
  label,
  backgroundColor,
  setModalData,
  setLoading,
  handleShowModal,
}) => {
  const header = useMemo(() => ({
    title: LinkedInProfile,
    subTitle: SelectBrandProfile,
    icon: <LinkedIn width={30} height={30} />,
  }));
  const user = useSelector((state) => state.user.value);
  const URL = API_URL + `/auth/linkedin/profile?brandId=${user?.userBrandId}`;

  const handleLinkedInLogin = async () => {
    try {
      const oauthUrl = `${
        import.meta.env.VITE_API_URL
      }/auth/linkedin/profile?userId=${user?.id}&brandId=${user?.userBrandId}`;
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default LinkedInConnectProfile;
