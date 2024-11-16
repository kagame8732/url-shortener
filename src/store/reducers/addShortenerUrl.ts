import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const addShortenerUrlSlice = createSlice({
  name: "addShortenerUrl",
  initialState: {
    loading: false,
    error: false,
    success: false,
    savedSuccefulMessage: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.addShortenerUrl.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      apis.addShortenerUrl.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.savedSuccefulMessage = "Url saved successfully";
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.addShortenerUrl.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.savedSuccefulMessage = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default addShortenerUrlSlice.reducer;