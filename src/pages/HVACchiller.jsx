import React, { useState } from "react";
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
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HVACchiller() {
  const [getTableData, setGetTableData] = useState([]);
  const [activeChiller, setActiveChiller] = useState(null);
  const [activeCompressor, setActiveCompressor] = useState(null);
  //const [chiller, setChiller] = useState(null);
  //const [compresor, setCompresor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [dataOnClick, setOnClick] = useState(null);
  const [clickSubmit, setClickSubmit] = useState(false)

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

  const submitData = async () => {
    setClickSubmit(true)
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
  th.addEventListener("click", function() {
    showContent(this);
  });
}

    var setChiller = "";
    var setCompresor = "";
    if (activeChiller == "chiller1") {
      setChiller = "CH1";
    } else if (activeChiller == "chiller2") {
      setChiller = "CH2";
    } else if (activeChiller == "chiller3") {
      setChiller = "CH3";
    }

    if (activeCompressor == "compresor1") {
      setCompresor = "K1";
    } else if (activeCompressor == "compresor2") {
      setCompresor = "K2";
    } else if (activeCompressor == "compresor3") {
      setCompresor = "K1";
    } else if (activeCompressor == "compresor4") {
      setCompresor = "K2";
    } else if (activeCompressor == "compresor5") {
      setCompresor = "K1";
    } else if (activeCompressor == "compresor6") {
      setCompresor = "K1";
    }

    let response = await axios.get(
      "http://10.126.15.124:8002/part/getChillerData",
      {
        params: {
          chiller: setChiller,
          kompresor: setCompresor,
          start: startDate,
          finish: finishDate,
        },
      }
    );
    setGetTableData(response.data);

  };

  const renderTable = () => {
    return getTableData.map((myData, index) => {
      return <Td>{myData.time}</Td>;
    });
  };

  const renderActiveSetpoint = (indexData) => {
    return getTableData.map((myData) => {
      return <Td>{myData[indexData]}</Td>;
    });
  };

  //=======================dumy================================

  const data_array = [];

  for (let i = 0; i < 30; i++) {
    const label = new Date().toISOString();
    const y = Math.floor(Math.random() * 1001);
    const x = i + 1;

    const data = { label, y, x };
    data_array.push(data);
  }

  //======================================================

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
        type: "splineArea",
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [],
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
                  <Th className="sticky left-0 z-10 bg-blue-200">Alarm</Th>
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
                  <Th className="sticky left-0 z-10 bg-blue-200">Evap LWT</Th>
                  {renderActiveSetpoint("EvapLWT")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Evap EWT</Th>
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
                    UnitCapacity
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
                    Evap sat Temprature
                  </Th>
                  {renderActiveSetpoint("Evap sat Temperature")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond sat Tempraturre
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
                    Evap Apporach
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
                    Ampere Kompresor
                  </Th>
                  {renderActiveSetpoint("Ampere Kompressor")}
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    No. Of Start
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

      <div className="flex justify-center mt-14 mb-4">
        <h2 className=" text-4xl font-bold">{dataOnClick}</h2>
      </div>

      {dataOnClick != null ? (
        <CanvasJSChart className="" options={options} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default HVACchiller;
