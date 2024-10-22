import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Use an array for storing buttons
  loading: false,
};

export const smartLinkSlice = createSlice({
  name: "smartLink",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload; // Ensure payload is serializable
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload; // Ensure payload is serializable
    },
    addBtn: (state, action) => {
      state.value = action.payload; // Ensure payload is serializable
      state.loading = false;
    },
  },
});

export const {
  initialiseConnections,
  addBtn,
  connectionsLoading,
} = smartLinkSlice.actions;

export default smartLinkSlice.reducer;
