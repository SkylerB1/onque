import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],  // Initialize as an empty array, not null
  loading: false,
};

export const smartSectionSlice = createSlice({
  name: "smartSection",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addSmartSection:  (state, action) => {
      state.value = action.payload;
      state.loading = false;
    }
  },
});

export const {
  initialiseConnections,
  addSmartSection,
  connectionsLoading,
} = smartSectionSlice.actions;

export default smartSectionSlice.reducer;
