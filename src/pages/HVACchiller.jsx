import React, { useState } from "react";
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

function HVACchiller() {
  const [activeChiller, setActiveChiller] = useState(null);
  const [activeCompressor, setActiveCompressor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState();
  const [dataOnClick, setOnClick] = useState();

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

  const dateFinish = (e) => {
    setFinishDate(e.target.value);
  };

  function showContent(element) {
    const content = element.innerHTML;
    setOnClick(content);
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: scrollHeight, behavior: "smooth" });
  }

  const thElements = document.getElementsByTagName("Th");
  for (let i = 0; i < thElements.length; i++) {
    const th = thElements[i];
    th.style.cursor = "pointer";
    th.addEventListener("click", function () {
      showContent(this);
    });
  }

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
        </div>
      ) : (
        <div></div>
      )}

      {activeCompressor !== null ? (
        <div>
          <Box overflowX="auto">
            <Table variant="simple " minWidth="100%">
              <Tbody>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Time</Th>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Status Chiller
                  </Th>
                  <Td>232</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Alarm</Th>
                  <Td>567</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Body Chiller
                  </Th>
                  <Td>235</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Kisi-Kisi Kondensor
                  </Th>
                  <Td>966</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Fan Kondensor
                  </Th>
                  <Td>574</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Active Setpoint
                  </Th>
                  <Td>678</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Evap LWT</Th>
                  <Td>506</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Evap EWT</Th>
                  <Td>343</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Unit Capacity
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Status Kompresor
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    UnitCapacity
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap Presure
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond Presure
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap sat Temprature
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond sat Tempraturre
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suction Temperature
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Discharge Temperature
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Evap Apporach
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Cond Approach
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Oil Presure
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    EXV position
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Run Hour Kompressor
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Ampere Kompresor
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    No. Of Start
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Level Oil sight glass atas
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Level Oil sight glass bawah
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Jalur Sight glass Exp valve
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Total Fan ON
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Return Chiller
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Supplay Chiller
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Inlet Soft water
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Pompa CHWS 1
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suhu sebelum pompa{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Suhu sesudah pompa{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Sebelum pompa{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tekanan Sesudah pompa{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan R-S{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan S-T{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Tegangan T-R{" "}
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere R-S</Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere S-T</Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Ampere T-R</Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Grounding Ampere
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">
                    Jam monitoring
                  </Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
                <Tr>
                  <Th className="sticky left-0 z-10 bg-blue-200">Operator</Th>
                  <Td>133</Td>
                  <Td>324</Td>
                  <Td>232</Td>
                  <Td>567</Td>
                  <Td>235</Td>
                  <Td>966</Td>
                  <Td>574</Td>
                  <Td>678</Td>
                  <Td>506</Td>
                  <Td>343</Td>
                  <Td>133</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex justify-center mt-7">
        <h2 className=" text-4xl font-bold">{dataOnClick}</h2>
      </div>
    </div>
  );
}

export default HVACchiller;
