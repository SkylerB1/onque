import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/Interceptor";

const initialState = {
  value: null,
  loading: false,
  error: "",
};

export const getRoles = createAsyncThunk("roles", async () => {
  try {
    const response = await axiosInstance.get("/user/roles");
    return response.data;
  } catch (err) {
    console.log(err);
    return err?.response?.data?.message;
  }
});

export const roles = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (state, action) => {
      (state.value || []).push(action.payload);
    },
    removeRole: (state, action) => {
      state.value.filter((item) => item.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const { addRole, removeRole } = roles.actions;

export default roles.reducer;
