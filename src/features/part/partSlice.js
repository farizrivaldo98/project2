import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { Await } from "react-router-dom";

export const partSlice = createSlice({
  name: "part",
  initialState: {
    partValue: [],
    partId: {
      Mesin: "",
      Line: "",
      Pekerjaan: "",
      Detail: "",
      Tanggal: "",
      Quantity: 0,
      Unit: "",
      Pic: "",
      Tawal: "",
      Tahir: "",
      Total: 0,
    },
  },
  reducers: {
    setPartList: (state, action) => {
      state.partValue = action.payload;
    },
    addPartList: (state, action) => {
      state.partValue.push(action.payload);
    },
    deletePartList: (state, action) => {
      state.partValue = action.payload;
    },
    editePartList: (state, action) => {
      state.partValue = action.payload;
    },
    partListId: (state, action) => {
      state.partId = action.payload;
    },
  },
});

export const {
  setPartList,
  addPartList,
  deletePartList,
  editePartList,
  partListId,
} = partSlice.actions;
export default partSlice.reducer;

export function addPartListData(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://localhost:8001/part/add", data);
    dispatch(fetchPart());
  };
}

export function fetchPart() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:8001/part/get");
    dispatch(setPartList(response.data));
  };
}

export function deletePartListData(data) {
  return async (dispatch) => {
    let response = await Axios.delete(
      `http://localhost:8001/part/delet/${data}`
    );
    dispatch(fetchPart());
  };
}

export function editePartListData(data, id) {
  return async (dispatch) => {
    let response = await Axios.patch(
      `http://localhost:8001/part/edit/${id}`,
      data
    );
    dispatch(fetchPart());
  };
}

export function getDataById(dataId) {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:8001/part/get", {
      params: {
        id: dataId,
      },
    });
    const found = response.data.find((element) => element.id == dataId);

    dispatch(partListId(found));
  };
}
