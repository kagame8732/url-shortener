import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {apis} from "../apis";

const switchSiidesSlice = createSlice({
  name: "switchSides",
  initialState: {
    sideBarHidden: false
  },
  reducers: {},
  // Help to access the state entire the application
  extraReducers(builder) {
    builder.addCase(
      apis.switchSides.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.sideBarHidden = action?.payload;
      }
    );
  },
});

export default switchSiidesSlice.reducer;