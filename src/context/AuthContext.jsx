import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { BroadcastChannel } from "broadcast-channel";
import { useCookies } from "react-cookie";
import useConnections from "../components/customHooks/useConnections";
import { axiosInstance } from "../utils/Interceptor";
import { getBrands } from "../redux/features/brandsSlice";
import { getRoles } from "../redux/features/roleSlice";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const connectionRef = useRef(new BroadcastChannel("connection"));
  const { getConnections } = useConnections();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [validations, setValidations] = useState({});
  const [loadingValidations, setLoadingValidations] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const getCounter = async () => {
    try {
      const res = await axiosInstance.get("/user/counter");
      setValidations(res.data);
      setLoadingValidations(true);
    } catch (err) {
      setValidations({});
      setLoadingValidations(false);
    }
  };

  const getSubscriptions = async () => {
    try {
      const res = await axiosInstance.get("/user/subscription");
      setSubscription(res.data);
      setLoadingSub(false);
    } catch (err) {
      console.log(err);
      setLoadingSub(false);
    }
  };

  useEffect(() => {
    getSubscriptions();
    getCounter();
    let user = localStorage.getItem("user");

    if (user) {
      user = JSON.parse(user);
      dispatch(getBrands()).then((item) => {
        const brand = item.payload.brands[0];
        if (!user?.brand) {
          const userBrand = {
            ...user,
            brand: brand,
          };
          dispatch(setUser(userBrand));
          getConnections(brand.id);
        } else {
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
    subscription,
    loadingSub,
    loadingValidations,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
