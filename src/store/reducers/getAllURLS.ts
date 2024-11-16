/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

type payloadData ={
  createdDate: string;
  id: string;
  modifiedDate: string;
  ttlInSeconds: number;
  url: string
}

const getAllURLSSlice = createSlice({
  name: "getAllURLS",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
    urls: [] as payloadData[],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.getAllURLS.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      apis.getAllURLS.fulfilled,
      (state, action: PayloadAction<payloadData[]>) => {
        state.loading = false;
        state.success = true;
        state.urls = action.payload;
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