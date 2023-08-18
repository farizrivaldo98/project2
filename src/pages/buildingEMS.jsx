import React, { useState, useEffect } from "react";
import { Select, Input, Button } from "@chakra-ui/react";
import CanvasJSReact from "../canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function buildingEMS() {
  //const [dropData, setDropData] = useState([]);
  //   const [arrayRuangan, setArrayRuangan] = useState([
  //     "N33",
  //     "P10",
  //     "W25AF1",
  //     "WH1",
  //     "GBAC1_H1",
  //     "Packing_F_Line1",
  //     "Packing_F_Line2",
  //     "Packing_F_Line3",
  //     "R._GAC_WH2",
  //     "R._K27",
  //     "R._K30",
  //     "R._K31",
  //     "R._K32",
  //     "R._K33",
  //     "R._K34",
  //     "R._K35",
  //     "R._K36",
  //     "R._N10",
  //     "R._N11",
  //     "R._N13",
  //     "R._N14",
  //     "R._N15",
  //     "R._N16",
  //     "R._N18",
  //     "R._N20",
  //     "R._N28",
  //     "R._N3",
  //   ]);

  const renderDropDownArea = () => {
    const myArray = [
      "N33",
      "P10",
      "W25AF1",
      "WH1",
      "GBAC1_H1",
      "Packing_F_Line1",
      "Packing_F_Line2",
      "Packing_F_Line3",
      "R._GAC_WH2",
      "R._K27",
      "R._K30",
      "R._K31",
      "R._K32",
      "R._K33",
      "R._K34",
      "R._K35",
      "R._K36",
      "R._N10",
      "R._N11",
      "R._N13",
      "R._N14",
      "R._N15",
      "R._N16",
      "R._N18",
      "R._N20",
      "R._N28",
      "R._N3",
    ];

    return myArray.map((data1) => {
      return (
        <>
          <option value={data1}>{data1}</option>;
        </>
      );
    });
  };

  const options = {
    theme: "light1",

    subtitles: [
      {
        // text: "Data chiller",
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
        name: "test",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [],
      },
    ],
  };

  return (
    <>
      <div className="flex flex-row justify-center mt-8 mb-8">
        <div className="w-96 ml-4">
          <Select placeholder="Ruangan">{renderDropDownArea()}</Select>
        </div>
        <div className="ml-4  ">
          <Input placeholder="Select Date and Time" size="md" type="date" />
        </div>
        <div className="ml-4  ">
          <Input placeholder="Select Date and Time" size="md" type="date" />
        </div>
        <div className="ml-4  ">
          <Button colorScheme="gray">Submit</Button>
        </div>
      </div>

      <CanvasJSChart className="" options={options} />
    </>
  );
}

export default buildingEMS;
