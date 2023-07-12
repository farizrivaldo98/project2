import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

function HVACchiller() {
  const [activeChiller, setActiveChiller] = useState(null);
  const [activeCompressor, setActiveCompressor] = useState(null);

  const handleChillerClick = (chillerId) => {
    setActiveChiller(chillerId);
    setActiveCompressor(null);
  };

  const handleCompressorClick = (compressorId) => {
    setActiveCompressor(compressorId);
    console.log(compressorId);
  };

  return (
    <div>
      <div className="grid grid-flow-col">
        <div className={`background-color: ${activeChiller === "chiller1" ? "black" : "currentColor"}`}>
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
                    activeCompressor === "compresor1" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor1" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor1")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor2" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor2" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor2")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={`background-color: ${activeChiller === "chiller2" ? "black" : "currentColor"}`}>
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
                    activeCompressor === "compresor3" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor3" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor3")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor4" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor4" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor4")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={`background-color: ${activeChiller === "chiller3" ? "black" : "currentColor"}`}>
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
                    activeCompressor === "compresor5" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor5" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor5")}
                >
                  Compresor 1
                </Button>
              </div>
              <div>
                <Button
                  className={`ml-2 w-full border-2 border-2 ${
                    activeCompressor === "compresor6" ? "bg-blue-500 text-white" : "border-gray-600"
                  }`}
                  colorScheme={activeCompressor === "compresor6" ? "blue" : "gray"}
                  onClick={() => handleCompressorClick("compresor6")}
                >
                  Compresor 2
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HVACchiller;
