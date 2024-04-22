import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./features/connectionSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    connections: connectionSlice,
    user: userSlice
  },
});