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
    addSmartSection: (state, action) => {
      state.value.push(action.payload);  // Add section directly
      state.loading = false;
    },
    updateSmartSection: (state, action) => {
      const { id, values } = action.payload;  // Assuming values is the updated section data
      const index = state.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...values };  // Merge the updated values
      }
    },
    deleteSmartSection: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  initialiseConnections,
  addSmartSection,
  updateSmartSection,
  deleteSmartSection,
  connectionsLoading,
} = smartSectionSlice.actions;

export default smartSectionSlice.reducer;
