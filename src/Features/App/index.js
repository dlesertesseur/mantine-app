import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    bodyContainerWidth:0,
    bodyContainerHeight:0,
    draggingView:false
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

    setDraggingView: (state, { payload }) => {
      state.value.draggingView = payload;
    },
  },
  extraReducers: {},
});

export const { setBodyContainerSize, setDraggingView } = appSlice.actions;

export default appSlice.reducer;
