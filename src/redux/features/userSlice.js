import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const data = action.payload;
      state.value = data;
      localStorage.setItem("user", JSON.stringify(data));
    },
    getUserFromLocalStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.value = JSON.parse(user);
      }
    },
    getUser: (state) => {
      return state.value;
    },
  },
});

export const { setUser, getUser, getUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
