import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const deleteShortenedSlice = createSlice({
  name: "deleteShortened",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
    data: {} as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(apis.deleteShortened.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.deleteShortened.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.message = "Deleted Successfully";
      state.error = false;
    });
    builder.addCase(
      apis.deleteShortened.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action?.payload?.error?.message;
        state.success = false;
      }
    );
    builder.addCase(apis.reset, (state) => {
      state.loading = false;
      state.error = true;
      state.message = "";
      state.success = false;
    });
  },
});

export default deleteShortenedSlice.reducer;
