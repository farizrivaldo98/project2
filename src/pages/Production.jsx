import axios from "axios";
import moment from "moment-timezone";
import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";

import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
} from "@chakra-ui/react";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Production() {
  const [oeeCm1, setOeeCm1] = useState([]);
  const [machineData, setMachine] = useState();
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();

  const fetchData = async (data, start, finish) => {
    let response = await axios.get("http://10.126.15.135:8001/part/oee", {
      params: {
        machine: data,
        start: start,
        finish: finish,
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

  const options1 = {
    theme: "light2",
    title: {
      text: "OEE",
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
        type: "line",
        name: "Thickness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [
          { x: 1, y: 100 },
          { x: 2, y: 98 },
          { x: 3, y: 30 },
          { x: 4, y: 58 },
          { x: 5, y: 87 },
        ],
      },
      {
        type: "line",
        name: "Diameter",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [
          { x: 1, y: 98 },
          { x: 2, y: 50 },
          { x: 3, y: 26 },
          { x: 4, y: 45 },
          { x: 5, y: 70 },
        ],
      },
      {
        type: "line",
        name: "Hardness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [
          { x: 1, y: 80 },
          { x: 2, y: 50 },
          { x: 3, y: 64 },
          { x: 4, y: 75 },
          { x: 5, y: 64 },
        ],
      },
    ],
  };

  return (
    <>
      <div className="flex flex-row justify-center  ">
        <CanvasJSChart className="" options={options} />
      </div>
      <div className="flex flex-row justify-center  ">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="mr-4"
        >
          <div>
            <CircularProgress value={82} color="green.400" size="150px">
              <CircularProgressLabel>82%</CircularProgressLabel>
            </CircularProgress>
          </div>
          <div></div>
          <Stack>
            <CardBody>
              <Heading size="md">Avability</Heading>

              <Text py="2">
                Runtime
                <Progress colorScheme="red" hasStripe value={64} />
                Idletime
                <Progress hasStripe value={64} />
                Stoptime
                <Progress hasStripe value={64} />
                <br />
                availability is the ratio of Run Time to Planned Production
                Time.
              </Text>
            </CardBody>
          </Stack>
        </Card>

        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="mr-4"
        >
          <div>
            <CircularProgress value={98} color="green.400" size="150px">
              <CircularProgressLabel>98%</CircularProgressLabel>
            </CircularProgress>
          </div>

          <Stack>
            <CardBody>
              <Heading size="md">Performance </Heading>

              <Text py="2">
                Actual Speed
                <Progress hasStripe value={64} />
                Setpoint Speed
                <Progress hasStripe value={64} />
                <br />
                Performance is the second of the three OEE factors to be
                calculated.
              </Text>
            </CardBody>
          </Stack>
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <div>
            <CircularProgress value={100} color="green.400" size="150px">
              <CircularProgressLabel>100%</CircularProgressLabel>
            </CircularProgress>
          </div>

          <Stack>
            <CardBody>
              <Heading size="md">Quality</Heading>

              <Text py="2">
                Good Product
                <Progress hasStripe value={64} />
                Afkir Product
                <Progress hasStripe value={64} />
                <br />
                Quality takes into account manufactured parts that do not meet
                quality standards,
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </div>
      <CanvasJSChart options={options1} />
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
