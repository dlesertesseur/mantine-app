import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    bodyContainerWidth:0,
    bodyContainerHeight:0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBodyContainerSize: (state, { payload }) => {
      state.value.bodyContainerWidth = payload.width;
      state.value.bodyContainerHeight = payload.height;
    },
  },
  extraReducers: {},
});

export const { setBodyContainerSize } = appSlice.actions;

export default appSlice.reducer;
