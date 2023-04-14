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
  const [oeeVar, setVarOee] = useState([{ Ava: 0, Per: 0, Qua: 0, oee: 0 }]);
  const [avaLine, setAvaLine] = useState([]);
  const [perLine, setPerLine] = useState([]);
  const [quaLine, setQuaLine] = useState([]);
  const [oeeLine, setOeeLine] = useState([]);
  const [toalOut, setTotalOut] = useState();
  const [totalRun, setTotalRun] = useState();
  const [totalStop, setTotalStop] = useState();
  const [totalIdle, setTotalIdle] = useState();
  const [totalSpeed, setTotalSpeed] = useState();

  const [machineData, setMachine] = useState();
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();

  const fetchData = async (data, start, finish) => {
    let response = await axios.get("http://10.126.15.83:8001/part/oee", {
      params: {
        machine: data,
        start: start,
        finish: finish,
      },
    });
    let response1 = await axios.get(
      "http://10.126.15.83:8001/part/variableoee",
      {
        params: {
          machine: data,
          start: start,
          finish: finish,
        },
      }
    );
    setOeeCm1(response.data);
    setVarOee(response1.data);

    var resultAva = [];
    for (var i = 0; i < response.data.length; i++) {
      var objAva = {
        x: response.data[i].id,
        y: Number(response.data[i].avability.toFixed(2)),
      };
      resultAva.push(objAva);
    }
    setAvaLine(resultAva);

    var resultPer = [];
    for (var i = 0; i < response.data.length; i++) {
      var objPer = {
        x: response.data[i].id,
        y: Number(response.data[i].performance.toFixed(2)),
      };
      resultPer.push(objPer);
    }
    setPerLine(resultPer);

    var resultQua = [];
    for (var i = 0; i < response.data.length; i++) {
      var objQua = {
        x: response.data[i].id,
        y: Number(response.data[i].quality.toFixed(2)),
      };
      resultQua.push(objQua);
    }
    setQuaLine(resultQua);

    //Output==================================
    let objOut = 0;
    for (var i = 0; i < response.data.length; i++) {
      objOut += Number(response.data[i].output);
    }
    setTotalOut(objOut);

    //Runtime====================================
    let objRun = 0;
    for (var i = 0; i < response.data.length; i++) {
      objRun += Number(response.data[i].runTime);
    }
    setTotalRun(objRun);

    //Stop==================================
    let objStop = 0;
    for (var i = 0; i < response.data.length; i++) {
      objStop += Number(response.data[i].stopTime);
    }
    setTotalStop(objStop);
    //Idle====================================
    let objIdle = 0;
    for (var i = 0; i < response.data.length; i++) {
      objIdle += Number(response.data[i].idleTime);
    }
    setTotalIdle(objIdle);

    ////Speed========================================
    let objSpeed = ((objOut * 25) / 4 / objRun).toFixed(1);

    setTotalSpeed(objSpeed);
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
          <Td className="bg-blue-200">{cm1.avability.toFixed(2)}</Td>
          <Td className="bg-red-200">{cm1.performance.toFixed(2)}</Td>
          <Td className="bg-green-200">{cm1.quality.toFixed(2)}</Td>
          <Td>{cm1.oee.toFixed(2)}</Td>
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
        text: `${oeeVar[0].oee.toFixed(2)}% OEE`,
        verticalAlign: "center",
        fontSize: 26,
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
          { name: "Avability", y: oeeVar[0].Ava },
          { name: "Performance", y: oeeVar[0].Per },
          { name: "Quality", y: oeeVar[0].Qua },
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
        name: "Avability",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: avaLine,
      },
      {
        type: "line",
        name: "Performance",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: perLine,
      },
      {
        type: "line",
        name: "Quality",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: quaLine,
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
            <CircularProgress
              value={oeeVar[0].Ava.toFixed(2)}
              color="green.400"
              size="200px"
            >
              <CircularProgressLabel>
                {oeeVar[0].Ava.toFixed(2)}%
              </CircularProgressLabel>
            </CircularProgress>
          </div>
          <div></div>
          <Stack>
            <CardBody>
              <Heading size="md">Avability</Heading>

              <Text py="2">
                Runtime ({totalRun} Min)
                <Progress hasStripe value={100} />
                Idletime ({totalIdle} Min)
                <Progress hasStripe value={(totalIdle / totalRun) * 100} />
                Stoptime ({totalStop} Min)
                <Progress hasStripe value={(totalStop / totalRun) * 100} />
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
            <CircularProgress
              value={oeeVar[0].Per.toFixed(2)}
              color="green.400"
              size="200px"
            >
              <CircularProgressLabel>
                {oeeVar[0].Per.toFixed(2)}%
              </CircularProgressLabel>
            </CircularProgress>
          </div>

          <Stack>
            <CardBody>
              <Heading size="md">Performance </Heading>

              <Text py="2">
                Actual Speed {totalSpeed} slave/min
                <Progress hasStripe value={totalSpeed} />
                Setpoint Speed 40 slave/min
                <Progress hasStripe value={40} />
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
            <CircularProgress
              value={oeeVar[0].Qua.toFixed(2)}
              color="green.400"
              size="200px"
            >
              <CircularProgressLabel>
                {oeeVar[0].Qua.toFixed(2)}%
              </CircularProgressLabel>
            </CircularProgress>
          </div>

          <Stack>
            <CardBody>
              <Heading size="md">Quality</Heading>

              <Text py="2">
                Good Product ({toalOut} Box)
                <Progress hasStripe value={64} />
                Afkir Product (0 Box)
                <Progress hasStripe value={0} />
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
          <h2>Mesin</h2>
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
