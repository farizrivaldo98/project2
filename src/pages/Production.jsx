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

  const fetchData = async () => {
    let response = await axios.get("http://10.126.15.135:8001/part/oeecm1");
    setOeeCm1(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <Td>{cm1.avability}</Td>
          <Td>{cm1.performance}</Td>
          <Td>{cm1.quality}</Td>
          <Td className="bg-blue-200">{cm1.oee}</Td>
          <Td>{cm1.output}</Td>
          <Td>{cm1.runTime}</Td>
          <Td>{cm1.stopTime}</Td>
          <Td>{cm1.idleTime}</Td>
        </Tr>
      );
    });
  };

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "OVERALL EQUIPMENT EFFECTIVENESS",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 80, label: "Avability" },
          { y: 98, label: "Performance" },
          { y: 100, label: "Quality" },
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
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
