import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileName: null,
  timeInSeconds: 0,
};

console.log(initialState, "initialState");
// This slice is used to manage the video slider state in the Redux store

const videoSliderSlice = createSlice({
  name: "videoSlider",
  initialState,
  reducers: {
    updateSliderTime: (state, action) => {
      state.fileName = action.payload.fileName;
      state.timeInSeconds = action.payload.timeInSeconds;
    },
    resetSliderTime: (state) => {
      state.fileName = null;
      state.timeInSeconds = 0;
    },
  },
});

export const { updateSliderTime, resetSliderTime } = videoSliderSlice.actions;
export default videoSliderSlice.reducer;
