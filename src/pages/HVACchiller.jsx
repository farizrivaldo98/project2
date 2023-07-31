import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
  TableContainer,
  FormLabel,
  Flex,
  Switch,
  Stack,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HVACchiller() {
  const [getTableData, setGetTableData] = useState([]);
  const [getGraphData, setGetGraphData] = useState([]);
  const [activeChiller, setActiveChiller] = useState(null);
  const [activeCompressor, setActiveCompressor] = useState(null);
  const [chiller, setChiller] = useState(null);
  const [compresor, setCompresor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [dataOnClick, setOnClick] = useState(null);
  const [clickSubmit, setClickSubmit] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [arrayParam, setArrayParam] = useState([
    "Status Chiller",
    "Alarm Chiller",
    "Active Setpoint",
    "EvapLWT",
    "EvapEWT",
    "Unit Capacity",
    "Status Kompresor",
    "Unit Capacity",
    "Evap Presure",
    "Cond Presure",
    "Evap sat Temperature",
    "Cond sat Temperature",
    "Suction Temperature",
    "Discharge Temperature",
    "Evap Approach",
    "Cond Approach",
    "Oil Presure",
    "EXV Position",
    "Run Hour Kompressor",
    "Ampere Kompressor",
    "No of Start",
  ]);
  const [dataArea1, setDataArea1] = useState(null);
  const [dataArea2, setDataArea2] = useState(null);
  const [dataArea3, setDataArea3] = useState(null);
  const [dataArea4, setDataArea4] = useState(null);
  const [graphArea1, setGraphArea1] = useState([]);
  const [graphArea2, setGraphArea2] = useState([]);
  const [graphArea3, setGraphArea3] = useState([]);
  const [graphArea4, setGraphArea4] = useState([]);

  const [arrayMultiLine, setArrayMultiLine] = useState([]);

  const handleChillerClick = (chillerId) => {
    setActiveChiller(chillerId);
    setActiveCompressor(null);
  };

  const handleCompressorClick = (compressorId) => {
    setActiveCompressor(compressorId);
  };

  const dateStart = (e) => {
    setStartDate(e.target.value);
  };

  const dateFinish = async (e) => {
    setFinishDate(e.target.value);
  };

  const selectLine = (e) => {
    if (e.target.value == "1") {
      setArrayMultiLine([1]);
    } else if (e.target.value == "2") {
      setArrayMultiLine([1, 2]);
    } else if (e.target.value == "3") {
      setArrayMultiLine([1, 2, 3]);
    } else if (e.target.value == "4") {
      setArrayMultiLine([1, 2, 3, 4]);
    }
  };

  // const selectArea1 = (e) => {
  //   setDataArea1(e.target.value);
  // };
  // const selectArea2 = (e) => {
  //   setDataArea4(e.target.value);
  // };
  // const selectArea3 = (e) => {
  //   setDataArea3(e.target.value);
  // };
  // const selectArea4 = (e) => {
  //   setDataArea4(e.target.value);
  // };

  const loopSelect = () => {
    const selectArea = {
      1: (e) => setDataArea1(e.target.value),
      2: (e) => setDataArea2(e.target.value),
      3: (e) => setDataArea3(e.target.value),
      4: (e) => setDataArea4(e.target.value),
    };

    return arrayMultiLine.map((data, index) => {
      const areaNumber = index + 1;
      return (
        <Select
          placeholder="Select Area"
          onChange={(e) => selectArea[areaNumber](e)}
        >
          {arrayParam.map((setpoint) => (
            <option value={setpoint}>{setpoint}</option>
          ))}
        </Select>
      );
    });
  };

  const submitData2 = () => {
    let graphData1 = getTableData.map((data, index) => {
      return {
        label: data.time,
        x: index + 1,
        y: Number(data[dataArea1]) / 10,
      };
    });
    setGraphArea1(graphData1);

    let graphData2 = getTableData.map((data, index) => {
      return {
        label: data.time,
        x: index + 1,
        y: Number(data[dataArea2]) / 10,
      };
    });
    setGraphArea2(graphData2);

    let graphData3 = getTableData.map((data, index) => {
      return {
        label: data.time,
        x: index + 1,
        y: Number(data[dataArea3]) / 10,
      };
    });
    setGraphArea3(graphData3);

    let graphData4 = getTableData.map((data, index) => {
      return {
        label: data.time,
        x: index + 1,
        y: Number(data[dataArea4]) / 10,
      };
    });
    setGraphArea4(graphData4);
  };

  const graphValue = () => {
    const activeSetpointNames = [
      "Alarm Chiller",
      "Active Setpoint",
      "EvapLWT",
      "EvapEWT",
      "Unit Capacity",
      "Status Kompresor",
      "Unit Capacity",
      "Evap Presure",
      "Cond Presure",
      "Evap sat Temperature",
      "Cond sat Temperature",
      "Suction Temperature",
      "Discharge Temperature",
      "Evap Approach",
      "Cond Approach",
      "Oil Presure",
      "Ampere Kompressor",
    ];

    if (activeSetpointNames.includes(dataOnClick)) {
      let statusKompresorArray = getTableData.map((data, index) => {
        return {
          label: data.time,
          x: index + 1,
          y: Number(data[dataOnClick]) / 10,
        };
      });
      setGetGraphData(statusKompresorArray);
    } else {
      let statusKompresorArray = getTableData.map((data, index) => {
        return {
          label: data.time,
          x: index + 1,
          y: data[dataOnClick],
        };
      });
      setGetGraphData(statusKompresorArray);
    }
  };

  useEffect(() => {
    // Fungsi untuk mengambil data dari server

    // Hanya eksekusi fetchData saat clickSubmit berubah (bukan saat render pertama)
    if (!isFirstRender) {
      graphValue();
    } else {
      setIsFirstRender(false);
    }
  }, [dataOnClick]);

  const submitData = async () => {
    setClickSubmit(true);
    function showContent(element) {
      const content = element.innerHTML;
      setOnClick(content);
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
    const thElements = document.getElementsByTagName("th");
    for (let i = 0; i < thElements.length; i++) {
      const th = thElements[i];
      th.style.cursor = "pointer"; // Mengubah kursor menjadi pointer
      th.addEventListener("click", function () {
        showContent(this);
      });
    }

    if (activeChiller == "chiller1") {
      var setChiller1 = "CH1";
    } else if (activeChiller == "chiller2") {
      setChiller1 = "CH2";
    } else if (activeChiller == "chiller3") {
      setChiller1 = "CH3";
    }

    if (activeCompressor == "compresor1") {
      var setCompresor1 = "K1";
    } else if (activeCompressor == "compresor2") {
      setCompresor1 = "K2";
    } else if (activeCompressor == "compresor3") {
      setCompresor1 = "K1";
    } else if (activeCompressor == "compresor4") {
      setCompresor1 = "K2";
    } else if (activeCompressor == "compresor5") {
      setCompresor1 = "K1";
    } else if (activeCompressor == "compresor6") {
      setCompresor1 = "K1";
    }

    setChiller(setChiller1);
    setCompresor(setCompresor1);

    let response = await axios.get(
      "http://10.126.15.124:8002/part/getChillerData",
      {
        params: {
          chiller: setChiller1,
          kompresor: setCompresor1,
          start: startDate,
          finish: finishDate,
        },
      }
    );
    console.log(setChiller1, setCompresor1, startDate, finishDate);
    setGetTableData(response.data);
  };

  const renderTable = () => {
    return getTableData.map((myData, index) => {
      return <Td>{myData.time}</Td>;
    });
  };

  const renderActiveSetpoint = (indexData) => {
    const activeSetpointNames = [
      "Alarm Chiller",
      "Active Setpoint",
      "EvapLWT",
      "EvapEWT",
      "Unit Capacity",
      "Status Kompresor",
      "Unit Capacity",
      "Evap Presure",
      "Cond Presure",
      "Evap sat Temperature",
      "Cond sat Temperature",
      "Suction Temperature",
      "Discharge Temperature",
      "Evap Approach",
      "Cond Approach",
      "Oil Presure",
      "Ampere Kompressor",
    ];
    if (activeSetpointNames.includes(indexData)) {
      return getTableData.map((myData) => {
        return <Td>{Number(myData[indexData]) / 10}</Td>;
      });
    } else {
      return getTableData.map((myData) => {
        return <Td>{myData[indexData]}</Td>;
      });
    }
  };

  //=======================dumy================================
  const handleSwitchChange = () => {
    setIsChecked(!isChecked); // Mengubah nilai state menjadi kebalikan dari nilai sebelumnya
    console.log(isChecked);
  };

  const options = {
    theme: "light1",

    subtitles: [
      {
        text: "Data chiller",
      },
    ],
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        name: dataOnClick,
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: getGraphData,
      },
      {
        type: "line",
        name: dataArea1,
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: graphArea1,
      },
      {
        type: "line",
        name: dataArea2,
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: graphArea2,
      },
      {
        type: "line",
        name: dataArea3,
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: graphArea3,
      },
      {
        type: "line",
        name: dataArea4,
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: graphArea4,
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-flow-col">
        <div
          className={`background-color: ${
            activeChiller === "chiller1" ? "black" : "currentColor"
          }`}
        >
          <div>
            <Button
              className={`ml-2 w-full border-2 border-2 border-gray-600 ${
                activeChiller === "chiller1" ? "bg-black" : ""
              }`}
              colorScheme={activeChiller === "chiller1" ? "blue" : "gray"}
              onClick={() => handleChillerClick("chiller1")}
            >
              Chiller 1
            </Button>
          </div>
          {activeChiller === "chiller1" && (
            <div className="grid grid-flow-col">
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor1"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor1" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor1")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor2"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor2" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor2")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`background-color: ${
            activeChiller === "chiller2" ? "black" : "currentColor"
          }`}
        >
          <div>
            <Button
              className={`ml-2 w-full border-2 border-2 border-gray-600 ${
                activeChiller === "chiller2" ? "bg-black" : ""
              }`}
              colorScheme={activeChiller === "chiller2" ? "blue" : "gray"}
              onClick={() => handleChillerClick("chiller2")}
            >
              Chiller 2
            </Button>
          </div>
          {activeChiller === "chiller2" && (
            <div className="grid grid-flow-col">
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor3"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor3" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor3")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor4"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor4" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor4")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`background-color: ${
            activeChiller === "chiller3" ? "black" : "currentColor"
          }`}
        >
          <div>
            <Button
              className={`ml-2 w-full border-2 border-2 border-gray-600 ${
                activeChiller === "chiller3" ? "bg-black" : ""
              }`}
              colorScheme={activeChiller === "chiller3" ? "blue" : "gray"}
              onClick={() => handleChillerClick("chiller3")}
            >
              Chiller 3
            </Button>
          </div>
          {activeChiller === "chiller3" && (
            <div className="grid grid-flow-col">
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor5"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor5" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor5")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor6"
                      ? "bg-blue-500 text-white"
                      : "border-gray-600"
                  }`}
                  colorScheme={
                    activeCompressor === "compresor6" ? "blue" : "gray"
                  }
                  onClick={() => handleCompressorClick("compresor6")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeCompressor !== null ? (
        <div className="flex flex-row justify-center mt-10 mb-6">
          <div className="mr-4">
            <h2>Start Time</h2>
            <Input
              onChange={dateStart}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </div>
          <div>
            <h2>Finish Time</h2>
            <Input
              onChange={dateFinish}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </div>
          <div>
            <Button
              className="ml-4 mt-3"
              colorScheme="gray"
              onClick={() => submitData()}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {clickSubmit == true ? (
        <div>
          <Box overflowX="auto">
            <Table variant="simple " minWidth="100%">
              <Tbody>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Time</Th>
                  {renderTable("time")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Status Chiller
                  </Th>
                  {renderActiveSetpoint("Status Chiller")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Alarm Chiller
                  </Th>
                  {renderActiveSetpoint("Alarm Chiller")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Body Chiller
                  </Th>
                  <Td>null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Kisi-Kisi Kondensor
                  </Th>
                  <Td>null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Fan Kondensor
                  </Th>
                  <Td>null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Active Setpoint
                  </Th>
                  {renderActiveSetpoint("Active Setpoint")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">EvapLWT</Th>
                  {renderActiveSetpoint("EvapLWT")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">EvapEWT</Th>
                  {renderActiveSetpoint("EvapEWT")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Unit Capacity
                  </Th>
                  {renderActiveSetpoint("Unit Capacity")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Status Kompresor
                  </Th>
                  {renderActiveSetpoint("Status Kompresor")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Unit Capacity
                  </Th>
                  {renderActiveSetpoint("Unit Capacity")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap Presure
                  </Th>
                  {renderActiveSetpoint("Evap Presure")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond Presure
                  </Th>
                  {renderActiveSetpoint("Cond Presure")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap sat Temperature
                  </Th>
                  {renderActiveSetpoint("Evap sat Temperature")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond sat Temperature
                  </Th>
                  {renderActiveSetpoint("Cond sat Temperature")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suction Temperature
                  </Th>
                  {renderActiveSetpoint("Suction Temperature")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Discharge Temperature
                  </Th>
                  {renderActiveSetpoint("Discharge Temperature")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap Approach
                  </Th>
                  {renderActiveSetpoint("Evap Approach")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond Approach
                  </Th>
                  {renderActiveSetpoint("Cond Approach")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Oil Presure
                  </Th>
                  {renderActiveSetpoint("Oil Presure")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    EXV position
                  </Th>
                  {renderActiveSetpoint("EXV Position")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Run Hour Kompressor
                  </Th>
                  {renderActiveSetpoint("Run Hour Kompressor")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Ampere Kompressor
                  </Th>
                  {renderActiveSetpoint("Ampere Kompressor")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    No of Start
                  </Th>
                  {renderActiveSetpoint("No of Start")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Level Oil sight glass atas
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Level Oil sight glass bawah
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Jalur Sight glass Exp valve
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Total Fan ON
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Return Chiller
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Supplay Chiller
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Inlet Soft water
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Pompa CHWS 1
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suhu sebelum pompa
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suhu sesudah pompa
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Sebelum pompa
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Sesudah pompa
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan R-S
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan S-T
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan T-R
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere R-S</Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere S-T</Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere T-R</Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Grounding Ampere
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Jam monitoring
                  </Th>
                  <Td>Null</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Operator</Th>
                  <Td>Null</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </div>
      ) : (
        <div></div>
      )}

      {dataOnClick != null ? (
        <div>
          <Stack
            className="flex flex-row justify-center  "
            direction="row"
            spacing={4}
            align="center"
          >
            <div className="flex flex-row justify-center mt-10">
              <div className="flex flex-row w-full">
                <Stack align="center" direction="row">
                  <FormLabel htmlFor="isChecked">Multi Line :</FormLabel>
                  <Switch
                    size="lg"
                    isChecked={isChecked}
                    onChange={handleSwitchChange}
                  />
                </Stack>
              </div>

              {isChecked == true ? (
                <>
                  <div className="w-96 mr-3">
                    <Select placeholder="Number" onChange={selectLine}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </Select>
                  </div>

                  {loopSelect()}

                  <div>
                    <Button
                      className="ml-4 "
                      colorScheme="gray"
                      onClick={() => {
                        submitData2();
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </Stack>
          <div className="flex justify-center mt-14 mb-4">
            <h2 className=" text-4xl font-bold">{dataOnClick}</h2>
          </div>

          <CanvasJSChart className="" options={options} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default HVACchiller;
