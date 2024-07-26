import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BroadcastChannel } from "broadcast-channel";
import { axiosInstance, logout } from "../utils/Interceptor";
import { getBrands } from "../redux/features/brandsSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import useConnections from "../components/customHooks/useConnections";

import SubscriptionServices from "../services/SubscriptionServices";
import UserService from "../services/UserServices";
import toast, { Toaster } from "react-hot-toast";
import { toastrError } from "../utils";

const AppContext = createContext({
  subscription: null,
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const connectionRef = useRef(new BroadcastChannel("connection"));
  const { getConnections } = useConnections();
  const [validations, setValidations] = useState({});
  const [loadingValidations, setLoadingValidations] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  const [cookies, setCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();

  const [dropdownClientListKey, setDropdownClientListKey] = React.useState(0);
  const [blockUI, setblockUI] = useState(false);

  const getCounter = async (brandId) => {
    try {
      const res = await axiosInstance.get(`/user/counter?brandId=${brandId}`);
      setValidations(res.data);
      setLoadingValidations(false);
    } catch (err) {
      setValidations({});
      setLoadingValidations(false);
    }
  };

  const getSubscriptions = async () => {
    try {
      const res = await SubscriptionServices.getSubscriptionsDetails();
      setSubscription(res.data);
      setLoadingSub(false);
    } catch (err) {
      console.log(err);
      setLoadingSub(false);
    }
  };
  const getUserInfo = async () => {
    try {
      const res = await UserService.getUserInfo();
      setUserInfo(res);
    } catch (err) {
      if (err?.response?.status == 400) {
        let message = err?.response?.data?.message || "No user data found !";
        toastrError(message);
      }
      logout();
      console.log(err);
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      getSubscriptions();
      getUserInfo();
      dispatch(getBrands()).then((item) => {
        const brand = item.payload.brands[0];
        if (!user?.brand) {
          const userBrand = {
            ...user,
            brand: brand,
          };
          getCounter(brand.id);
          dispatch(setUser(userBrand));
          getConnections(brand.id);
        } else {
          getCounter(user.brand.id);
          dispatch(setUser(user));
          getConnections(user.brand.id);
        }
      });
      setCookie("access_token", user.access_token);
    }
  }, []);

  const value = {
    broadcastConnection: connectionRef.current,
    validations,
    getSubscriptions,
    getCounter,
    subscription,
    loadingSub,
    loadingValidations,
    userInfo,
    getUserInfo,
    dropdownClientListKey,
    setDropdownClientListKey,
    blockUI,
    setblockUI,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
