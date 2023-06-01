import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "prod",
  initialState: {
    date: "1",
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = userSlice.actions;
export default userSlice.reducer;

export function getDateProd(date) {
  return async (dispatch) => {
    await dispatch(setDate(date));
  };
}
