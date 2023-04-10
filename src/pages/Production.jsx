import axios from "axios";
import moment from "moment-timezone";
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

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Production() {
  const [oeeCm1, setOeeCm1] = useState([]);
  const [machineData, setMachine] = useState();
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();

  const fetchData = async (data, start, finish) => {
    console.log(start);
    console.log(finish);
    let response = await axios.get("http://10.126.15.135:8001/part/oee", {
      params: {
        machine: data,
      },
    });

    setOeeCm1(response.data);
  };

  let changeMachine = (e) => {
    var dataInput = e.target.value;
    setMachine(dataInput);
  };

  let dateStart = (e) => {
    var dataInput = e.target.value;

    let unixStart = Math.floor(new Date(dataInput).getTime() / 1000);
    setStartDate(unixStart);
  };

  let dateFinish = (e) => {
    var dataInput = e.target.value;

    let unixFinish = Math.floor(new Date(dataInput).getTime() / 1000);
    setFinishDate(unixFinish);
  };

  let submitData = () => {
    fetchData(machineData, startDate, finishDate);
  };

  useEffect(() => {}, []);

  const renderCm1 = () => {
    return oeeCm1.map((cm1) => {
      return (
        <Tr>
          <Td>{cm1.id}</Td>
          <Td>
            {moment
              .tz(
                new Date(cm1.time * 1000).toLocaleString(),
                "America/Los_Angeles"
              )
              .format("YYYY-MM-DD HH:mm")}
          </Td>
          <Td className="bg-blue-200">{cm1.avability}</Td>
          <Td className="bg-red-200">{cm1.performance}</Td>
          <Td className="bg-green-200">{cm1.quality}</Td>
          <Td>{cm1.oee}</Td>
          <Td>{cm1.output}</Td>
          <Td>{cm1.runTime}</Td>
          <Td>{cm1.stopTime}</Td>
          <Td>{cm1.idleTime}</Td>
        </Tr>
      );
    });
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "Overall Equipment Effectiveness",
    },
    subtitles: [
      {
        text: "80% OEE",
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Avability", y: 82 },
          { name: "Performance", y: 98 },
          { name: "Quality", y: 100 },
        ],
      },
    ],
  };

  return (
    <>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      <br />
      <Stack
        className="flex flex-row justify-center  "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Line</h2>
          <Select placeholder="Select Machine" onChange={changeMachine}>
            <option value="mezanine.tengah_Cm1_data">Cm1</option>
            <option value="mezanine.tengah_Cm2_data">Cm2</option>
            <option value="mezanine.tengah_Cm3_data">Cm3</option>
            <option value="mezanine.tengah_Cm4_data">Cm4</option>
            <option value="mezanine.tengah_Cm5_data">Cm5</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
            onChange={dateStart}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <h2>Finish Time</h2>
          <Input
            onChange={dateFinish}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => submitData()}
          >
            Submit
          </Button>
        </div>
      </Stack>
      <br />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Machine Performance</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Date Time</Th>
              <Th>Avability</Th>
              <Th>Pervormance</Th>
              <Th>Quality</Th>
              <Th>Oee</Th>
              <Th>Output</Th>
              <Th>RunTime</Th>
              <Th>StopTime</Th>
              <Th>Idle Time</Th>
            </Tr>
          </Thead>
          <Tbody>{renderCm1()}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Production;
