import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  loading: false,
};

export const smartLinkMediaSlice = createSlice({
  name: "smartLinkMedia",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addMedia: (state, action) => {
      if (state.value) {
        state.value = [...state.value, action.payload];
      } else {
        state.value = [action.payload];
      }
      state.loading = false;
    },
    updateMedia: (state, action) => {
      const { id, identifier, value } = action.payload;
      if (state.value) {
        const index = state.value.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.value[index][identifier] = value;
        }
      }
    },
    deleteMedia: (state, action) => {
      if (state.value) {
        state.value = state.value.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const {
  initialiseConnections,
  addMedia,
  updateMedia,
  deleteMedia,
  connectionsLoading,
} = smartLinkMediaSlice.actions;

export default smartLinkMediaSlice.reducer;
