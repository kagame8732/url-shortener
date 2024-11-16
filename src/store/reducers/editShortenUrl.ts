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

const editURLSlice = createSlice({
  name: "editShortened",
  initialState: {
    editing: false,
    error: false,
    success: false,
    successMessage: "",
    data: {} as payloadData,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.editShortened.pending, (state) => {
      state.editing = true;
    });
    builder.addCase(
      apis.editShortened.fulfilled,
      (state, action: PayloadAction<payloadData>) => {
        state.editing = false;
        state.success = true;
        state.successMessage = "Edited Successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.editShortened.rejected,
      (state, action: PayloadAction<any>) => {
        state.editing = false;
        state.error = true;
        state.successMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.editing = false;
      state.error = false;
      state.success = false;
      state.successMessage = "";
      state.data = {} as payloadData;
    });
  },
});

export default editURLSlice.reducer;