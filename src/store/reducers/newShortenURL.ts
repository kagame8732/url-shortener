import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const newShortenURLSlice = createSlice({
  name: "newShortenURL",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.newShortenURL.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      apis.newShortenURL.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log('action.payload', JSON.stringify(action.payload, null, 2))
        state.loading = false;
        state.success = true;
        state.message = action?.payload?.message;
        state.data = action?.payload;
        state.error = false;
      }
    );
    builder.addCase(
      apis.newShortenURL.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action?.payload?.error?.message;
        state.success = false;
      }
    );
  },
});

export default newShortenURLSlice.reducer;
