import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    initialiseConnections: (state, action) => {
      state.value = action.payload;
    },
    addConnection: (state, action) => {
      (state.value || []).push(action.payload);
    },
    setConnection: (state, action) => {
      (state.value || []).push(action.payload);
    },
    removeConnection: (state, action) => {
      state.value.filter((connection) => connection.id != action.payload);
    },
  },
});

export const { initialiseConnections, addConnection, removeConnection, setConnection } =
  connectionSlice.actions;

export default connectionSlice.reducer;
