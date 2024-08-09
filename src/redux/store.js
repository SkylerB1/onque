import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./features/connectionSlice";
import userSlice from "./features/userSlice";
import brandsSlice from "./features/brandsSlice";
import roleSlice from "./features/roleSlice";
import smartLinkSlice from "./features/smartLinkSlice";
import smartIconsSlice from "./features/smartIcons"

export const store = configureStore({
  reducer: {
    connections: connectionSlice,
    user: userSlice,
    brands: brandsSlice,
    roles:roleSlice,
    smartLink: smartLinkSlice,
    smartIcons:smartIconsSlice
  },
});