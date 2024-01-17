import React from "react";
import { useState, useEffect } from "react";
import {
  Select,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { addPartListData } from "../features/part/partSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

function HandoverMaintenance() {
  const navigate = useNavigate();
  const [fetchLineData, setFetchLineData] = useState([]);
  const [fetchProcesData, setFetchProcesData] = useState([]);
  const [fetchMachineData, setFetchMachineData] = useState([]);
  const [fetchLocationData, setFetchLocationData] = useState([]);

  const [newLine, setNewLine] = useState("");
  const [newProces, setNewProces] = useState("");
  const [newMachine, setNewMachine] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPIC, setNewPIC] = useState("");
  const [newDate, setNewDate] = useState();
  const [newStartTime, setNewStartTime] = useState();
  const [newFinishTime, setNewFinishTime] = useState();
  const [newTotal, setNewTotal] = useState();
  const [newSparepart, setNewSparepart] = useState("");
  const [newQuantity, setNewQuantity] = useState();
  const [newUnit, setNewUnit] = useState("");
  const [newPMjob, setNewPMjob] = useState("");
  const [newPMactual, setNewPMactual] = useState("");
  const [newSafety, setNewSafety] = useState("");
  const [newQuality, setNewQuality] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newJobDetail, setNewJobDetail] = useState("");
  const [breakdownType, setBreakdownType] = useState("");

  const [cm1Output, setCm1Output] = useState(0);
  const [cm2Output, setCm2Output] = useState(0);
  const [cm3Output, setCm3Output] = useState(0);
  const [cm4Output, setCm4Output] = useState(0);
  const [cm5Output, setCm5Output] = useState(0);
  const [cm1Afkir, setCm1Afkir] = useState(0);
  const [cm2Afkir, setCm2Afkir] = useState(0);
  const [cm3Afkir, setCm3Afkir] = useState(0);
  const [cm4Afkir, setCm4Afkir] = useState(0);
  const [cm5Afkir, setCm5Afkir] = useState(0);
  const [cmInformation, setCmInformation] = useState("");
  const [lastPRD, setLastPRD] = useState();
  const [lastMTC, setLastMTC] = useState();

  //=================================FETCH new=================

  const fetchLastPRD = async () => {
    let response = await axios.get("http://10.126.15.124:8002/part/lastPRD");

    const tanggalObjek = new Date(response.data[0].datetime);
    const tanggalHasil = tanggalObjek
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
      .replace(",", "");
    setLastPRD(tanggalHasil);
  };

  const fetchLastMTC = async () => {
    let response = await axios.get("http://10.126.15.124:8002/part/lastMTC");

    const tanggalObjek = new Date(response.data[0].tanggal);
    const tanggalHasil = tanggalObjek
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
    setLastMTC(tanggalHasil);
  };

  const fetchLine = async () => {
    let response = await axios.get("http://10.126.15.124:8002/part/lineData");
    setFetchLineData(response.data);
  };

  const fetchProces = async (line) => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/procesData",
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
      "http://10.126.15.124:8002/part/machineData",
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
      "http://10.126.15.124:8002/part/locationData",
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
    fetchLastPRD();
    fetchLastMTC();
  }, []);

  //=====================================MTC Report Hendeler======================================

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
    //console.log(event.target.value);
  };

  const PICHendeler = (event) => {
    setNewPIC(event.target.value);
  };

  const dateHendeler = (event) => {
    setNewDate(event.target.value);
  };

  const startTimeHendeler = (even) => {
    setNewStartTime(even.target.value);
  };

  const finishTimeHendeler = (even) => {
    setNewFinishTime(even.target.value);
  };

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

  const sparepartHendeler = (even) => {
    setNewSparepart(even.target.value);
  };

  const quantityHendeler = (even) => {
    setNewQuantity(even.target.value);
  };
  const unitHendeler = (even) => {
    setNewUnit(even.target.value);
  };
  const PMjobHendeler = (even) => {
    setNewPMjob(even.target.value);
  };
  const PMactualHendeler = (even) => {
    setNewPMactual(even.target.value);
  };
  const safetyHendeler = (even) => {
    setNewSafety(even[0]);
  };
  const qualityHendeler = (even) => {
    setNewQuality(even[0]);
  };
  const statusHendeler = (even) => {
    setNewStatus(even.target.value);
  };
  const jobDetailHendeler = (event) => {
    setNewJobDetail(event.target.value);
  };
  const breakdownTypeHendeler = (even) => {
    setBreakdownType(even.target.value);
  };

  const addDataMTC = async () => {
    let tempData = {
      line: newLine,
      proces: newProces,
      machine: newMachine,
      location: newLocation,
      pic: newPIC,
      tanggal: newDate,
      start: newStartTime,
      finish: newFinishTime,
      total: totalMinuites,
      sparepart: newSparepart,
      quantity: newQuantity,
      unit: newUnit,
      PMjob: newPMjob,
      PMactual: newPMactual,
      safety: newSafety,
      quality: newQuality,
      status: newStatus,
      detail: newJobDetail,
      breakdown: breakdownType,
    };
    console.log(tempData);

    let response = await axios.post(
      "http://10.126.15.124:8002/part/reportmtc",
      tempData
    );

    alert(response.data.message);

    // navigate("/maintenance", { replace: true });
  };

  //================================PROD Report Hendeler=============================================

  const cm1OutputHendeler = (e) => {
    setCm1Output(e.target.value);
  };
  const cm2OutputHendeler = (e) => {
    setCm2Output(e.target.value);
  };
  const cm3OutputHendeler = (e) => {
    setCm3Output(e.target.value);
  };
  const cm4OutputHendeler = (e) => {
    setCm4Output(e.target.value);
  };
  const cm5OutputHendeler = (e) => {
    setCm5Output(e.target.value);
  };
  const cm1AfkirHendeler = (e) => {
    setCm1Afkir(e.target.value);
  };
  const cm2AfkirHendeler = (e) => {
    setCm2Afkir(e.target.value);
  };
  const cm3AfkirHendeler = (e) => {
    setCm3Afkir(e.target.value);
  };
  const cm4AfkirHendeler = (e) => {
    setCm4Afkir(e.target.value);
  };
  const cm5AfkirHendeler = (e) => {
    setCm5Afkir(e.target.value);
  };
  const informationHendeler = (e) => {
    setCmInformation(e.target.value);
  };

  var totalOutputCal =
    Number(cm1Output) +
    Number(cm2Output) +
    Number(cm3Output) +
    Number(cm4Output) +
    Number(cm5Output);
  var totalMasterBoxCal = (totalOutputCal / 64).toFixed(0);

  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Menambahkan 0 di depan bulan jika hanya satu digit
  var day = ("0" + currentDate.getDate()).slice(-2); // Menambahkan 0 di depan tanggal jika hanya satu digit

  var hours = ("0" + currentDate.getHours()).slice(-2); // Menambahkan 0 di depan jam jika hanya satu digit
  var minutes = ("0" + currentDate.getMinutes()).slice(-2); // Menambahkan 0 di depan menit jika hanya satu digit
  var seconds = ("0" + currentDate.getSeconds()).slice(-2); // Menambahkan 0 di depan detik jika hanya satu digit

  var mysqlDateTime =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  var cm1Percentage = ((cm1Afkir / 25 / cm1Output) * 100).toFixed(2);
  var cm2Percentage = ((cm2Afkir / 25 / cm2Output) * 100).toFixed(2);
  var cm3Percentage = ((cm3Afkir / 25 / cm3Output) * 100).toFixed(2);
  var cm4Percentage = ((cm4Afkir / 25 / cm4Output) * 100).toFixed(2);
  var cm5Percentage = ((cm5Afkir / 25 / cm5Output) * 100).toFixed(2);

  const addDataProd = async () => {
    let tempData = {
      datetime: mysqlDateTime,
      outputCM1: cm1Output,
      outputCM2: cm2Output,
      outputCM3: cm3Output,
      outputCM4: cm4Output,
      outputCM5: cm5Output,
      afkirCM1: cm1Afkir,
      afkirCM2: cm2Afkir,
      afkirCM3: cm3Afkir,
      afkirCM4: cm4Afkir,
      afkirCM5: cm5Afkir,
      percentageCm1: cm1Percentage,
      percentageCm2: cm2Percentage,
      percentageCm3: cm3Percentage,
      percentageCm4: cm4Percentage,
      percentageCm5: cm5Percentage,
      totalBox: totalOutputCal,
      totalMB: totalMasterBoxCal,
      information: cmInformation,
    };

    let response = await axios.post(
      "http://10.126.15.124:8002/part/reportprd",
      tempData
    );
    alert(response.data.message);
  };

  return (
    <div className=" px-44">
      <div className=" space-y-auto">
        <div className="flex flex-row">
          <div>
            <p>Catch Master Report</p>
            <div className="pb-12 border-solid border-4 mt-2 ">
              <div className="flex flex-auto mt-2 gap-x-6 gap-y-8 p-4  sm:grid-cols-6   ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Line Area
                  </label>
                  <div className="mt-2 ">
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
                  <div className="mt-2 ">
                    <Select
                      placeholder="Select Machine"
                      onChange={procesHendeler}
                    >
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
                  <div className="mt-2 ">
                    <Select
                      placeholder="Select Machine"
                      onChange={machineHendeler}
                    >
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
                  <div className="mt-2 ">
                    <Select
                      placeholder="Select Machine"
                      onChange={locationHendeler}
                    >
                      {renderLocation()}
                    </Select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    PIC
                  </label>
                  <div className="mt-2 ">
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
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Breakdown
                  </label>
                  <div className="mt-2 ">
                    <Select placeholder="Type" onChange={breakdownTypeHendeler}>
                      <option value="Pland">Pland</option>
                      <option value="Unplan">Unplan</option>
                      <option value="Minor">Minor</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-auto  gap-x-6 gap-y-8 sm:grid-cols-6 p-4 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tanggal
                  </label>
                  <div className="mt-2 flex items-center gap-x-3 ">
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
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    TotalTime
                  </label>
                  <div className="mt-2">
                    <input
                      value={totalMinuites}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" text-center block w-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sparepart Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={sparepartHendeler}
                      id="Pekerjaan"
                      name="Pekerjaan"
                      type="Pekerjaan"
                      autoComplete="Pekerjaan"
                      className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={quantityHendeler}
                      id="Quantity"
                      name="Quantity"
                      type="number"
                      className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Unit
                  </label>
                  <div className="mt-2 w-auto">
                    <Select onClick={unitHendeler} placeholder="Select">
                      <option value="Pcs">Pcs</option>
                      <option value="Rol">Rol</option>
                      <option value="Meter">Meter</option>
                      <option value="Cm">Cm</option>
                      <option value="Box">Box</option>
                      <option value="Lot">Lot</option>
                      <option value="Pack">Pack</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-auto mt-2 gap-x-6 gap-y-8 p-4  sm:grid-cols-6 ">
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    PM Job
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={PMjobHendeler}
                      id="Pekerjaan"
                      name="Pekerjaan"
                      type="Pekerjaan"
                      autoComplete="Pekerjaan"
                      className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    PM Actual
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={PMactualHendeler}
                      id="Pekerjaan"
                      name="Pekerjaan"
                      type="Pekerjaan"
                      autoComplete="Pekerjaan"
                      className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Safety
                  </label>
                  <div className="mt-3  flex flex-row">
                    <CheckboxGroup
                      onChange={safetyHendeler}
                      spacing={2}
                      placeholder="Select"
                    >
                      <Checkbox
                        value="OK"
                        colorScheme="green"
                        defaultChecked
                        className="mr-2"
                      >
                        OK
                      </Checkbox>
                      <Checkbox value="NOK" colorScheme="red" defaultChecked>
                        NOK
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quality
                  </label>
                  <div className="mt-3  flex flex-row">
                    <CheckboxGroup
                      onChange={qualityHendeler}
                      spacing={2}
                      placeholder="Select"
                    >
                      <Checkbox
                        value="OK"
                        colorScheme="green"
                        defaultChecked
                        className="mr-2"
                      >
                        OK
                      </Checkbox>
                      <Checkbox value="NOK" colorScheme="red" defaultChecked>
                        NOK
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Status
                  </label>
                  <div className="mt-2 ">
                    <Select onClick={statusHendeler} placeholder="Select">
                      <option value="OK">OK</option>
                      <option value="Overtime">Overtime</option>
                      <option value="Next">Next Shift</option>
                      <option value="Followup">Need to followup</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  gap-x-6 gap-y-8 sm:grid-cols-6 p-4 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Detail Pekerjaan
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={jobDetailHendeler}
                      id="about"
                      name="about"
                      rows={3}
                      className=" block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                {/* <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/Maintenance")}
              >
                Cancel
              </button> */}
                <button
                  onClick={() => addDataMTC()}
                  className="mr-5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
            <p className="ml-2">Data Last Update at ({lastMTC})</p>
          </div>
          {/* ------------------------------------------------------------------------------------------------------------------*/}
          <div className=" space-y-auto ml-10">
            <p>Catch Master Report</p>
            <div className="pb-12 border-solid border-4 mt-2  ">
              <div className="sm:col-span-4 flex flex-row px-4 mt-8 ">
                <h1 className="mt-8  text-2xl font-bold">CM1</h1>
                <div className="mx-4">
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Output
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={cm1OutputHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Afkir
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={cm1AfkirHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 flex flex-row px-4">
                <h1 className="m-auto text-2xl font-bold">CM2</h1>
                <div className="mx-4">
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Output
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm2OutputHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Afkir
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm2AfkirHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 flex flex-row px-4">
                <h1 className="m-auto text-2xl font-bold">CM3</h1>
                <div className="mx-4">
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Output
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm3OutputHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Afkir
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm3AfkirHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 flex flex-row px-4">
                <h1 className="m-auto text-2xl font-bold">CM4</h1>
                <div className="mx-4">
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Output
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm4OutputHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Afkir
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm4AfkirHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 flex flex-row px-4">
                <h1 className="m-auto text-2xl font-bold">CM5</h1>
                <div className="mx-4">
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Output
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm5OutputHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {/* <label
                    htmlFor="Pekerjaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Afkir
                  </label> */}
                  <div className="mt-2">
                    <input
                      onChange={cm5AfkirHendeler}
                      type="number"
                      autoComplete="Pekerjaan"
                      className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-4 flex flex-row mt-4 ">
                <label
                  htmlFor="Pekerjaan"
                  className="block m-auto text-sm font-medium leading-6 text-gray-900"
                >
                  Total Output
                </label>
                <div className="mt-2">
                  <input
                    value={totalOutputCal}
                    type="number"
                    autoComplete="Pekerjaan"
                    className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mx-4 flex flex-row mt-2 ">
                <label
                  htmlFor="Pekerjaan"
                  className="block m-auto text-sm font-medium leading-6 text-gray-900"
                >
                  Total MasterBOX
                </label>
                <div className="mt-2">
                  <input
                    value={totalMasterBoxCal}
                    type="number"
                    autoComplete="Pekerjaan"
                    className=" w-36 text-center block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 mx-4">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Information
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={informationHendeler}
                    id="about"
                    name="about"
                    rows={3}
                    className=" block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="mt-14 flex items-center justify-end gap-x-6">
                {/* <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/Maintenance")}
              >
                Cancel
              </button> */}
                <button
                  onClick={() => addDataProd()}
                  className="mr-5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
            <p className="ml-2">Data Last Update at ({lastPRD})</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandoverMaintenance;
