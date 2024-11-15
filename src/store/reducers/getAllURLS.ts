import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const getAllURLSSlice = createSlice({
  name: "getAllURLS",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
    urls: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.getAllURLS.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      apis.getAllURLS.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log('action.payload', JSON.stringify(action.payload, null, 2))
        state.loading = false;
        state.success = true;
        state.message = action?.payload?.message;
        state.urls = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.getAllURLS.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default getAllURLSSlice.reducer;
