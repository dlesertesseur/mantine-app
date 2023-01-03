import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth";
import appReducer from "../Features/App";
import roleReducer from "../Features/Role";
import productReducer from "../Features/Product";
import brandReducer from "../Features/Brand";

export default configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    role: roleReducer,
    product: productReducer,
    brand: brandReducer
  },
});
