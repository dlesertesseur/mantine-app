import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth";
import appReducer from "../Features/App";
import roleReducer from "../Features/Role";

export default configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    role: roleReducer,
  },
});
