import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import GoogleBusiness from "../../assets/GoogleBusiness";
import { axiosInstance } from "../../utils/Interceptor";
import { API_URL, toastrError } from "../../utils";
import { GoogleBusinessPlatform } from "../common/commonString";
import { Typography } from "@material-tailwind/react";
import { useAppContext } from "../../context/AuthContext";

function GoogleBusinessApi({
  setModalData,
  loading,
  setLoading,
  handleShowModal,
  icon,
  label,
  backgroundColor,
}) {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const { broadcastConnection } = useAppContext();
  const GET_LOCATIONS_URL =
    API_URL + `/auth/google_business/locations?brandId=${brandId}`;
  const header = useMemo(() => ({
    title: "Google Business Locations",
    subTitle: "Select the location you would like to connect to this client.",
    icon: <GoogleBusiness fill={"0077B5"} width={30} height={30} />,
  }));

  const handleGoogleLogin = () => {
    try {
      const oauthUrl = `${
        import.meta.env.VITE_API_URL
      }/auth/google_business?userId=${user?.id}&brandId=${brandId}`;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        oauthUrl,
        "google_business",
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

  const getLocations = useCallback(async () => {
    try {
      setLoading(true);
      handleShowModal(header);
      const res = await axiosInstance.get(GET_LOCATIONS_URL);

      if (res.status === 200) {
        const { locations, account } = res.data;
        let data = [];
        if (locations && locations.length > 0) {
          data = locations.map((item) => {
            const { name, title, storefrontAddress = {} } = item;
            const addressLines = storefrontAddress?.addressLines || [];
            const postalCode = storefrontAddress?.postalCode || "";
            const locality = storefrontAddress?.locality || "";
            const administrativeArea =
              storefrontAddress?.administrativeArea || "";
            const address =
              storefrontAddress && addressLines.length > 0
                ? `${addressLines[0]} ${postalCode} ${locality} ${administrativeArea}`
                : null;
            return {
              id: name,
              name: title,
              body: address,
              account: account,
            };
          });
          setModalData(data);
        } else {
          toastrError("No google bussiness profile found.");
          handleShowModal(header, false);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [header]);

  useEffect(() => {
    const handleConnection = ({ platform }) => {
      if (platform === GoogleBusinessPlatform) {
        if (brandId) {
          getLocations();
        }
      }
    };
    broadcastConnection.addEventListener("message", handleConnection);
    // Clean up the event listener when the component unmounts or when broadcastConnection changes
    return () => {
      broadcastConnection.removeEventListener("message", handleConnection);
    };
  }, [broadcastConnection, getLocations, brandId, GoogleBusinessPlatform]);

  return (
    <div
      onClick={handleGoogleLogin}
      className="flex w-full justify-between items-center rounded-md px-5"
      style={{ background: backgroundColor }}
    >
      <span className="me-8 py-3 text-sm text-white">
        <Typography className="font-bold">{label}</Typography>
      </span>
      <span className="h-12 text-xl py-3 text-stone-600">{icon}</span>
    </div>
  );
}

export default GoogleBusinessApi;
