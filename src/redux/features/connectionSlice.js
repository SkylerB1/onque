import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  loading: false,
};

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    connectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    addConnection: (state, action) => {
      (state.value || []).push(action.payload);
      state.loading = false;
    },
    setConnection: (state, action) => {
      (state.value || []).push(action.payload);
      state.loading = false;
    },
    removeConnection: (state, action) => {
      state.value.filter((connection) => connection.id != action.payload);
      state.loading = false;
    },
  },
});

export const {
  initialiseConnections,
  addConnection,
  removeConnection,
  setConnection,
  connectionsLoading,
} = connectionSlice.actions;

export default connectionSlice.reducer;
