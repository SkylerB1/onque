import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  loading: false,
};

export const smartLinkGeneralSlice = createSlice({
  name: "smartLinkGeneral",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addGeneral: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
  },
});

export const {
  initialiseConnections,
  addGeneral,
  connectionsLoading,
} = smartLinkGeneralSlice.actions;

export default smartLinkGeneralSlice.reducer;
