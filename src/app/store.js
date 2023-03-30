import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from "../features/part/partSlice";
import userSlice from "../features/part/userSlice";

export default configureStore({
  reducer: {
    part: databaseReducer,
    user: userSlice,
  },
});
