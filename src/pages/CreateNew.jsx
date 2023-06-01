import React from "react";
import { useState } from "react";
import { Select, Input } from "@chakra-ui/react";
import { addPartListData } from "../features/part/partSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { event } from "jquery";

function CreateNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataList, setDataList] = useState({});
  const [newLine, setNewLine] = useState("");
  const [newProces, setNewProces] = useState("");
  const [newMachine, setNewMachine] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newJobDetail, setNewJobDetail] = useState("");
  const [newDate, setNewDate] = useState();
  const [newQuantity, setNewQuantity] = useState();
  const [newUnit, setNewUnit] = useState("");
  const [newPIC, setNewPIC] = useState("");
  const [newStartTime, setNewStartTime] = useState();
  const [newFinishTime, setNewFinishTime] = useState();

  const [fetchLineData, setFetchLineData] = useState([]);
  const [fetchProcesData, setFetchProcesData] = useState([]);
  const [fetchMachineData, setFetchMachineData] = useState([]);
  const [fetchLocationData, setFetchLocationData] = useState([]);

  //=================================FETCH new=================

  const fetchLine = async () => {
    let response = await axios.get("http://10.126.15.135:8002/part/lineData");
    setFetchLineData(response.data);
  };

  const fetchProces = async (line) => {
    let response = await axios.get(
      "http://10.126.15.135:8002/part/procesData",
      {
        params: {
          line_name: line,
        },
      }
    );

    setFetchProcesData(response.data);
  };

  const fetchMachine = async (line, proces) => {
    let response = await axios.get(
      "http://10.126.15.135:8002/part/machineData",
      {
        params: {
          line_name: line,
          proces_name: proces,
        },
      }
    );
    setFetchMachineData(response.data);
  };

  const fetchLocation = async (line, proces, machine) => {
    let response = await axios.get(
      "http://10.126.15.135:8002/part/locationData",
      {
        params: {
          line_name: line,
          proces_name: proces,
          machine_name: machine,
        },
      }
    );
    setFetchLocationData(response.data);
  };

  const renderLine = () => {
    return fetchLineData.map((lineCategory) => {
      return (
        <option value={lineCategory.line_name}>{lineCategory.line_name}</option>
      );
    });
  };

  const renderProces = () => {
    return fetchProcesData.map((procesCategory) => {
      return (
        <option value={procesCategory.proces_name}>
          {procesCategory.proces_name}
        </option>
      );
    });
  };

  const renderMachine = () => {
    return fetchMachineData.map((machineCategory) => {
      return (
        <option value={machineCategory.machine_name}>
          {machineCategory.machine_name}
        </option>
      );
    });
  };

  const renderLocation = () => {
    return fetchLocationData.map((locationCategory) => {
      return (
        <option value={locationCategory.location_name}>
          {locationCategory.location_name}
        </option>
      );
    });
  };

  useEffect(() => {
    fetchLine();
  }, []);

  if (newStartTime && newFinishTime) {
    var hm = newStartTime;
    var a = hm.split(":");
    var minutes = +a[0] * 60 + +a[1];

    var hm2 = newFinishTime;
    var a2 = hm2.split(":");
    var minutes2 = +a2[0] * 60 + +a2[1];
    var totalMinuites = minutes2 - minutes;
  } else {
    var totalMinuites = 0;
  }

  const addData = () => {
    let tempData = {
      Mesin: newProces,
      Line: newLine,
      Pekerjaan: newJob,
      Detail: newJobDetail,
      Tanggal: newDate,
      Quantity: newQuantity,
      Unit: newUnit,
      Pic: newPIC,
      Tawal: newStartTime,
      Tahir: newFinishTime,
      Total: totalMinuites,
    };
    setDataList((dataList, { ...tempData }));
    dispatch(addPartListData(tempData));
    alert("Data berhasil ditambahkan");
    navigate("/Maintenance");
  };

  const lineHendeler = (event) => {
    setNewLine(event.target.value);
    fetchProces(event.target.value);
    //console.log(event.target.value);
  };

  const procesHendeler = (event) => {
    setNewProces(event.target.value);
    fetchMachine(newLine, event.target.value);
    //console.log(event.target.value);
  };

  const machineHendeler = (event) => {
    setNewMachine(event.target.value);
    fetchLocation(newLine, newProces, event.target.value);
    //console.log(event.target.value);
  };

  const locationHendeler = (event) => {
    setNewLocation(event.target.value);
    //(event.target.value);
  };

  const jobHendeler = (event) => {
    setNewJob(event.target.value);
  };
  const jobDetailHendeler = (event) => {
    setNewJobDetail(event.target.value);
  };
  const dateHendeler = (event) => {
    setNewDate(event.target.value);
  };
  const quantityHendeler = (event) => {
    setNewQuantity(event.target.value);
  };
  const unitHendeler = (event) => {
    setNewUnit(event.target.value);
  };
  const PICHendeler = (event) => {
    setNewPIC(event.target.value);
  };
  const startTimeHendeler = (even) => {
    setNewStartTime(even.target.value);
  };
  const finishTimeHendeler = (even) => {
    setNewFinishTime(even.target.value);
  };

  return (
    <div className="px-96">
      <div className=" space-y-20 ">
        <div className=" border-gray-900/10 pb-12 border-solid border-4 mt-8 ">
          <h2 className="text-base text-center font-bold leading-7 ml-4 text-gray-900 mt-10">
            INPUT DATA MAINTENANCE
          </h2>

          <div className="flex flex-auto mt-2 gap-x-6 gap-y-8 p-4  sm:grid-cols-6   ">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Line Area
              </label>
              <div className="mt-2 w-48">
                <Select
                  placeholder="Select Line"
                  id="line"
                  onChange={lineHendeler}
                >
                  {renderLine()}
                </Select>
              </div>
            </div>
            <div className="sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Proces
              </label>
              <div className="mt-2 w-48">
                <Select placeholder="Select Machine" onChange={procesHendeler}>
                  {renderProces()}
                </Select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Machine
              </label>
              <div className="mt-2 w-48">
                <Select placeholder="Select Machine" onChange={machineHendeler}>
                  {renderMachine()}
                </Select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2 w-48">
                <Select
                  placeholder="Select Machine"
                  onChange={locationHendeler}
                >
                  {renderLocation()}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-auto  gap-x-6 gap-y-8 sm:grid-cols-6 p-4 ">
            {/* <div className="sm:col-span-4 ">
              <label
                htmlFor="Pekerjaan"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sparepart Name
              </label>
              <div className="mt-2">
                <input
                  id="Pekerjaan"
                  name="Pekerjaan"
                  type="Pekerjaan"
                  autoComplete="Pekerjaan"
                  className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="Pekerjaan"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity
              </label>
              <div className="mt-2 w-48">
                <Input onChange={quantityHendeler} size="md" type="number" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Unit
              </label>
              <div className="mt-2 w-48">
                <Select onChange={unitHendeler} placeholder="Select Unit">
                  <option value="Pcs">Pcs</option>
                  <option value="Rol">Rol</option>
                  <option value="Meter">Meter</option>
                  <option value="Cm">Cm</option>
                  <option value="Box">Box</option>
                  <option value="Lot">Lot</option>
                  <option value="Pack">Pack</option>
                </Select>
              </div>
            </div> */}

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                PIC
              </label>
              <div className="mt-2 w-48">
                <Select onChange={PICHendeler} placeholder="Select PIC">
                  <option value="SGO">Sugino</option>
                  <option value="MKF">Khaerul</option>
                  <option value="RAO">Renaldo</option>
                  <option value="CKA">Chandra</option>
                  <option value="RDP">Ricy</option>
                  <option value="ARF">Arief</option>
                </Select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tanggal
              </label>
              <div className="mt-2 flex items-center gap-x-3 w-48">
                <Input
                  onChange={dateHendeler}
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Time
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Input
                  onChange={startTimeHendeler}
                  placeholder="Select Date and Time"
                  size="md"
                  type="time"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Finish Time
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Input
                  onChange={finishTimeHendeler}
                  placeholder="Select Date and Time"
                  size="md"
                  type="time"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="Pekerjaan"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pekerjaan
              </label>
              <div className="mt-2">
                <input
                  onChange={jobHendeler}
                  id="Pekerjaan"
                  name="Pekerjaan"
                  type="Pekerjaan"
                  autoComplete="Pekerjaan"
                  className=" w-48 block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-auto  gap-x-6 gap-y-8 sm:grid-cols-6 p-4 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Detail Pekerjaan
              </label>
              <div className="mt-2 ">
                <textarea
                  onChange={jobDetailHendeler}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-96 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/Maintenance")}
        >
          Cancel
        </button>
        <button
          onClick={() => addData()}
          className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateNew;
