import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  loading: false,
};

export const smartLinkAppearanceSlice = createSlice({
  name: "smartLinkAppearance",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addAppearance: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
  },
});

export const {
  initialiseConnections,
  addAppearance,
  connectionsLoading,
} = smartLinkAppearanceSlice.actions;

export default smartLinkAppearanceSlice.reducer;
