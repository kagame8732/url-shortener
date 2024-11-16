import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const editURLSlice = createSlice({
  name: "editShortened",
  initialState: {
    loading: false,
    error: false,
    success: false,
    successMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.editShortened.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      apis.editShortened.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.successMessage = "Edited Successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.editShortened.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.successMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default editURLSlice.reducer;