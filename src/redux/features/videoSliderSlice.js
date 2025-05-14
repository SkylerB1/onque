import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileName: null,
  timeInSeconds: 0,
};

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
