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

const addShortenerUrlSlice = createSlice({
  name: "addShortenerUrl",
  initialState: {
    saving: false,
    error: false,
    success: false,
    savedSuccefulMessage: "",
    data: {} as payloadData,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.addShortenerUrl.pending, (state) => {
      state.saving = true;
    });
    builder.addCase(
      apis.addShortenerUrl.fulfilled,
      (state, action: PayloadAction<payloadData>) => {
        state.saving = false;
        state.success = true;
        state.savedSuccefulMessage = "Url saved successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.addShortenerUrl.rejected,
      (state, action: PayloadAction<any>) => {
        state.saving = false;
        state.error = true;
        state.savedSuccefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.saving = false;
      state.error = false;
      state.success = false;
      state.savedSuccefulMessage = "";
      state.data = {} as payloadData;
    });
  },
});

export default addShortenerUrlSlice.reducer;