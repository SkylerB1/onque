import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  loading: false,
};

export const smartIconsSlice = createSlice({
  name: "smartIcons",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addIcons: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
  },
});

export const {
  initialiseConnections,
  addConnection,
  addIcons,
  connectionsLoading,
} = smartIconsSlice.actions;

export default smartIconsSlice.reducer;
