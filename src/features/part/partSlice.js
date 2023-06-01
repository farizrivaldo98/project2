import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { Await } from "react-router-dom";

export const partSlice = createSlice({
  name: "part",

  initialState: {
    partValue: [],
    date: "",
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
    dateData: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {
  setPartList,
  addPartList,
  deletePartList,
  editePartList,
  partListId,
  dateData,
} = partSlice.actions;
export default partSlice.reducer;

export function getDateMaintenance(data) {
  return async (dispatch) => {
    dispatch(dateData(data));
  };
}

export function addPartListData(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://10.126.15.135:8002/part/add", data);
    dispatch(fetchPart());
  };
}

export function fetchPart(data) {
  return async (dispatch) => {
    let response = await Axios.get("http://10.126.15.135:8002/part/get", {
      params: {
        date: data,
        id: "",
      },
    });
    dispatch(setPartList(response.data));
  };
}

export function deletePartListData(data) {
  return async (dispatch) => {
    let response = await Axios.delete(
      `http://10.126.15.135:8002/part/delet/${data}`
    );
    dispatch(fetchPart());
  };
}

export function editePartListData(data, id) {
  return async (dispatch) => {
    let response = await Axios.patch(
      `http://10.126.15.135:8002/part/edit/${id}`,
      data
    );
    dispatch(fetchPart());
  };
}

export function getDataById(dataId, data) {
  return async (dispatch) => {
    let response = await Axios.get("http://10.126.15.135:8002/part/get", {
      params: {
        id: dataId,
        date: data,
      },
    });

    let response1 = await Axios.get("http://10.126.15.135:8002/part/fetch");

    const found = response1.data.find((element) => element.id == dataId);

    dispatch(partListId(found));
  };
}
