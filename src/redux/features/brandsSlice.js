import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/Interceptor";
import BrandService from "../../services/BrandServices";

const initialState = {
  value: [],
  loading: false,
  error: "",
};

export const getBrands = createAsyncThunk("brands", async () => {
  try {
    const response = await BrandService.getUserBrandsList();
    return response.data;
  } catch (err) {
    return err?.response?.data?.message;
  }
});

export const brands = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, action) => {
      (state.value || []).push(action.payload);
    },
    removeBrand: (state, action) => {
      state.value = state.value.filter((brand) => brand.id != action.payload);
    },
    addPlatformsByBrandId: (state, action) => {
      const { id: brandId, data } = action.payload;
      const brands = state.value;
      const updatedBrands = brands.map((brand) => {
        if (brand.id === brandId) {
          return { ...brand, platforms: data };
        }
        return brand;
      });
      state.value = updatedBrands;
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

export const {
  initialiseBrands,
  brandsLoading,
  addBrand,
  removeBrand,
  addPlatformsByBrandId,
} = brands.actions;

export default brands.reducer;
