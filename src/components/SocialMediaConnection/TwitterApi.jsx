import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TwitterApi = ({ icon, backgroundColor, label }) => {
  const user = useSelector((state) => state.user.value);

  const handleTwitterLogin = () => {
    try {
      const oauthUrl = `${import.meta.env.VITE_API_URL}/auth/twitter?userId=${user?.id
        }&brandId=${user?.brand?.id}`;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        oauthUrl,
        "twitter",
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

  return (
    <div
      onClick={handleTwitterLogin}
      className="flex w-full justify-between items-center rounded-md px-5"
      style={{ background: backgroundColor }}
    >
      <span className="me-8 py-3 text-sm text-white">
        <p className="font-bold">{label}</p>
      </span>
      <span className="h-12 text-xl py-3 text-stone-600">
        {icon}
      </span>
    </div>
  );
};
export default TwitterApi;
