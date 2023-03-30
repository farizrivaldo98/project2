import Axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {
      id_users: "",
      name: "",
      username: "",
      email: "",
      isAdmin: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export function registerData(data) {
  return async (dispatch) => {
    let response = await Axios.post(
      "http://localhost:8001/part/register",
      data
    );
  };
}

export function loginData(data) {
  return async (dispatch) => {
    let respons = await Axios.post("http://localhost:8001/part/login", data);
    console.log(respons);
    dispatch(setUser(respons.data.data));
    localStorage.setItem("user_token", respons.data.token);
  };
}

export function CheckLogin(data) {
  return async (dispatch) => {
    // const getDataLogin = await Axios.post(
    //   `${API_URL}/auth/`,
    //   {},
    //   {
    //     headers: {
    //       authorization: `Bearer ${data}`,
    //     },
    //   }
    // );
    // console.log(getDataLogin);
  };
}
