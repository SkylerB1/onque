import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  loading: false,
};

export const thumbnailMediaSlice = createSlice({
  name: "thumbnailMedia",
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
      // Always replace the previous media with new one
      state.value = [action.payload];
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
      if (!action.payload) {
        state.value = [];
      } else if (state.value) {
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
} = thumbnailMediaSlice.actions;

export default thumbnailMediaSlice.reducer;
