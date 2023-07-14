import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import Axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Instrument() {
  const [dataInstrument, setDataInstrument] = useState([]);
  const [inputText, setInputText] = useState("");
  const [submitText, setSubmitText] = useState("");
  const [switchAllData, setSwitchAllData] = useState(false);

  const [hardnessData, setHardnessData] = useState([]);
  const [thicknessData, setThicknessData] = useState([]);
  const [diameterData, setDiameterData] = useState([]);

  const fetchData = async () => {
    let response = await Axios.get("http://10.126.15.124:8002/part/instrument");
    setDataInstrument(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let switchAll = (e) => {
    alert("Membuka Semua data mengakibatkan web menjadi lambat");
    setSwitchAllData(true);
  };
  let hidenAll = (e) => {
    setSwitchAllData(false);
  };

  let inputHendeler = (e) => {
    var dataInput = e.target.value;
    setInputText(dataInput);
  };

  let clickSubmit = async () => {
    setSubmitText(inputText);
    let data = { nobatch: `${submitText}` };
    let hardness = await Axios.post(
      "http://10.126.15.124:8002/part/hardness",
      data
    );

    var result1 = [];
    for (var i = 0; i < hardness.data.length; i++) {
      var obj1 = {
        x: i,
        y: Number(hardness.data[i].y),
      };
      result1.push(obj1);
    }

    setHardnessData(result1);

    let thickness = await Axios.post(
      "http://10.126.15.124:8002/part/thickness",
      data
    );
    var result2 = [];
    for (var i = 0; i < thickness.data.length; i++) {
      var obj2 = {
        x: i,
        y: Number(thickness.data[i].y),
      };
      result2.push(obj2);
    }

    setThicknessData(result2);

    let diameter = await Axios.post(
      "http://10.126.15.124:8002/part/diameter",
      data
    );
    var result3 = [];
    for (var i = 0; i < diameter.data.length; i++) {
      var obj3 = {
        x: i,
        y: Number(diameter.data[i].y),
      };
      result3.push(obj3);
    }

    setDiameterData(result3);
  };

  const renderInstrumentList = () => {
    const filterData = dataInstrument.filter((el) => {
      if (submitText == "" && switchAllData == false) {
        return null;
      }
      if (switchAllData == true && submitText == "") {
        return el;
      }
      if (switchAllData == true && !submitText == "") {
        return el.nobatch.includes(submitText);
      }
    });

    return filterData.map((instrument) => {
      return (
        <Tr>
          <Td>null</Td>
          <Td>null</Td>
          <Td>{instrument.nobatch}</Td>
          <Td>{instrument.date}</Td>
          <Td>{instrument.time}</Td>
          <Td>{instrument.notest}</Td>
          <Td>{instrument.thickness}</Td>
          <Td>{instrument.diameter}</Td>
          <Td>{instrument.hardness}</Td>
          <Td>{instrument.R_thickness}</Td>
          <Td>null</Td>
          <Td>{instrument.R_diameter}</Td>
          <Td>null</Td>
          <Td>{instrument.R_hardness}</Td>
          <Td>null</Td>
        </Tr>
      );
    });
  };

  const options = {
    theme: "light2",
    title: {
      text: "HARDNESS TESTER",
    },
    subtitles: [
      {
        text: "instrument production",
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
        type: "spline",
        name: "Thickness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: thicknessData,
      },
      {
        type: "spline",
        name: "Diameter",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: diameterData,
      },
      {
        type: "spline",
        name: "Hardness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: hardnessData,
      },
    ],
  };
  //console.log(hardnessData);

  return (
    <div>
      <CanvasJSChart options={options} />
      <br />
      <div
        className="flex flex-row justify-center"
        direction="row"
        spacing={4}
        align="center"
      >
        <div className="main">
          <h1>Search Betch</h1>
          <div className="search">
            <input
              onChange={inputHendeler}
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              className=" mr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => clickSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
      <div>
        <br />
        <Button className="ml-4" colorScheme="blue" onClick={() => switchAll()}>
          Show All Data
        </Button>
        <Button className="ml-4" colorScheme="red" onClick={() => hidenAll()}>
          Hiden All Data
        </Button>
      </div>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Operator</Th>
              <Th>Product</Th>
              <Th>No.Batch</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>No.Test</Th>
              <Th>Thickness</Th>
              <Th>Diameter</Th>
              <Th>Hardness</Th>
              <Th>Ref. Thickness min</Th>
              <Th>Ref. Thickness max</Th>
              <Th>Ref. Diameter min</Th>
              <Th>Ref. Diameter max</Th>
              <Th>Ref. Hardness min</Th>
              <Th>Ref. Hardness max</Th>
            </Tr>
          </Thead>
          <Tbody>{renderInstrumentList()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Instrument;
