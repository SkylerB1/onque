import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./features/connectionSlice";
import userSlice from "./features/userSlice";
import brandsSlice from "./features/brandsSlice";
import roleSlice from "./features/roleSlice";
import smartLinkSlice from "./features/smartLinkSlice";
import smartLinkGeneralSlice from "./features/smartLinkGeneralSlice";
import smartIconsSlice from "./features/smartIcons";
import smartLinkMediaSlice  from "./features/smartLinkMediaSlice";
import addSmartSection  from "./features/AddSectionSlice";
import smartLinkAppearance from "./features/smartLinkAppearanceSlice";

export const store = configureStore({
  reducer: {
    connections: connectionSlice,
    user: userSlice,
    brands: brandsSlice,
    roles:roleSlice,
    smartLink: smartLinkSlice,
    smartLinkGeneral: smartLinkGeneralSlice,
    smartIcons:smartIconsSlice,
    smartLinkMedia:smartLinkMediaSlice,
    smartSection:addSmartSection,
    smartAppearance:smartLinkAppearance,
  },
});