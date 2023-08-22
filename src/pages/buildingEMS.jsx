import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BuildingEMS() {
  const [dataListTable, setDataListTable] = useState([]);
  const [allDataTable, setAllDataTable] = useState([]);
  const [tempChartData, setTempChartData] = useState([]);
  const [dpChartData, setDpChartData] = useState([]);
  const [rhChartData, setRhChartData] = useState([]);
  const [areaPicker, setAreaPicker] = useState();
  const [datePickerStart, setDatePickerStart] = useState();
  const [datePickerFinish, setDatePickerFinish] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        "http://10.126.15.124:8002/part/getTabelEMS"
      );
      setDataListTable(response.data);
    };
    fetchData();
  }, []);

  const renderDropDownArea = () => {
    return dataListTable.map((entry) => {
      const tableName = entry.TABLE_NAME;
      const cleanedName = tableName
        .replace("cMT-PMWorkshop_", "")
        .replace("_data", "");
      return (
        <>
          <option value={tableName}>{cleanedName}</option>;
        </>
      );
    });
  };

  const getSubmit = async () => {
    const response1 = await axios.get(
      "http://10.126.15.124:8002/part/getTempChart",
      {
        params: {
          area: areaPicker,
          start: datePickerStart,
          finish: datePickerFinish,
          format: 0,
        },
      }
    );
    const response2 = await axios.get(
      "http://10.126.15.124:8002/part/getTempChart",
      {
        params: {
          area: areaPicker,
          start: datePickerStart,
          finish: datePickerFinish,
          format: 1,
        },
      }
    );
    const response3 = await axios.get(
      "http://10.126.15.124:8002/part/getTempChart",
      {
        params: {
          area: areaPicker,
          start: datePickerStart,
          finish: datePickerFinish,
          format: 2,
        },
      }
    );
    const response4 = await axios.get(
      "http://10.126.15.124:8002/part/getAllDataEMS",
      {
        params: {
          area: areaPicker,
          start: datePickerStart,
          finish: datePickerFinish,
        },
      }
    );

    setTempChartData(response1.data);
    setRhChartData(response2.data);
    setDpChartData(response3.data);
    setAllDataTable(response4.data);
  };

  const renderTable = () => {
    return allDataTable.map((data) => {
      return (
        <Tr>
          <Td>{data.id}</Td>
          <Td>{data.date}</Td>
          <Td>{data.temp}</Td>
          <Td>{data.RH}</Td>
          <Td>{data.DP}</Td>
        </Tr>
      );
    });
  };

  const emsAreaPick = (e) => {
    var dataInput = e.target.value;
    setAreaPicker(dataInput);
    console.log(dataInput);
  };

  const datePickStart = (e) => {
    var dataInput = e.target.value;
    setDatePickerStart(dataInput);
  };
  const datePickFinish = (e) => {
    var dataInput = e.target.value;
    setDatePickerFinish(dataInput);
  };

  const options = {
    theme: "light2",
    title: {
      text: "Enviroment Room",
    },
    subtitles: [
      {
        text: "Enviroment Management System",
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
        name: "Temperature",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: tempChartData,
      },
      {
        type: "line",
        name: "RH",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: rhChartData,
      },
      {
        type: "line",
        name: "DP",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: dpChartData,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-row justify-center mt-8 mb-8">
        <div className="w-96 ml-4">
          <Select onChange={emsAreaPick} placeholder="Ruangan">
            {renderDropDownArea()}
          </Select>
        </div>
        <div className="ml-4  ">
          <Input
            onChange={datePickStart}
            placeholder="Start Date"
            size="md"
            type="date"
          />
        </div>
        <div className="ml-4  ">
          <Input
            onChange={datePickFinish}
            placeholder="Finish Date"
            size="md"
            type="date"
          />
        </div>
        <div className="ml-4  ">
          <Button onClick={() => getSubmit()} colorScheme="gray">
            Submit
          </Button>
        </div>
      </div>
      <div>
        <CanvasJSChart className="" options={options} />
      </div>
      <div className="mt-20 mx-20">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Machine Performance</TableCaption>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>Date Time</Th>
                <Th>Temperature</Th>
                <Th>Relative Humidity (RH)</Th>
                <Th>Differential Presure (DP)</Th>
              </Tr>
            </Thead>
            <Tbody>{renderTable()}</Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default BuildingEMS;
