import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { BroadcastChannel } from "broadcast-channel";
import { useCookies } from "react-cookie";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const connectionRef = useRef(new BroadcastChannel("connection"));
  const [cookies, setCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setCookie("access_token", user.access_token);
      dispatch(setUser(user));
    }
  }, []);
  const value = { broadcastConnection: connectionRef.current };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
