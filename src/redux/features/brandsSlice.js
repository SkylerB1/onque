import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/Interceptor";

const initialState = {
  value: null,
  loading: false,
  error: "",
};

export const getBrands = createAsyncThunk("brands", async () => {
  try {
    const response = await axiosInstance.get("/brands");
    return response.data;
  } catch (err) {
    console.log(err);
    return err?.response?.data?.message;
  }
});

export const brands = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, action) => {
      (state.value || []).push(action.payload);
      state.loading = false;
    },
    removeBrand: (state, action) => {
      state.value.filter((brand) => brand.id != action.payload);
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.value = action.payload.brands;
        state.loading = false;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const { initialiseBrands, brandsLoading, addBrand, removeBrand } =
  brands.actions;

export default brands.reducer;
