import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth";
import appReducer from "../Features/App";

export default configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});
