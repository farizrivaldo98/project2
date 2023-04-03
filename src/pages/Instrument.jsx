import React, { Component } from "react";
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

function Instrument() {
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
      prefix: "₹",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "area",
        name: "GBP",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "₹#,##0.##",
        dataPoints: [
          { x: new Date("2017- 01- 01"), y: 84.927 },
          { x: new Date("2017- 02- 01"), y: 82.609 },
          { x: new Date("2017- 03- 01"), y: 81.428 },
          { x: new Date("2017- 04- 01"), y: 83.259 },
          { x: new Date("2017- 05- 01"), y: 83.153 },
          { x: new Date("2017- 06- 01"), y: 84.18 },
          { x: new Date("2017- 07- 01"), y: 84.84 },
          { x: new Date("2017- 08- 01"), y: 82.671 },
          { x: new Date("2017- 09- 01"), y: 87.496 },
          { x: new Date("2017- 10- 01"), y: 86.007 },
          { x: new Date("2017- 11- 01"), y: 87.233 },
          { x: new Date("2017- 12- 01"), y: 86.276 },
        ],
      },
      {
        type: "area",
        name: "USD",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "₹#,##0.##",
        dataPoints: [
          { x: new Date("2017- 01- 01"), y: 67.515 },
          { x: new Date("2017- 02- 01"), y: 66.725 },
          { x: new Date("2017- 03- 01"), y: 64.86 },
          { x: new Date("2017- 04- 01"), y: 64.29 },
          { x: new Date("2017- 05- 01"), y: 64.51 },
          { x: new Date("2017- 06- 01"), y: 64.62 },
          { x: new Date("2017- 07- 01"), y: 64.2 },
          { x: new Date("2017- 08- 01"), y: 63.935 },
          { x: new Date("2017- 09- 01"), y: 65.31 },
          { x: new Date("2017- 10- 01"), y: 64.75 },
          { x: new Date("2017- 11- 01"), y: 64.49 },
          { x: new Date("2017- 12- 01"), y: 63.84 },
        ],
      },
      {
        type: "area",
        name: "GBP",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "₹#,##0.##",
        dataPoints: [
          { x: new Date("2017- 01- 01"), y: 34.927 },
          { x: new Date("2017- 02- 01"), y: 54.609 },
          { x: new Date("2017- 03- 01"), y: 45.428 },
          { x: new Date("2017- 04- 01"), y: 34.259 },
          { x: new Date("2017- 05- 01"), y: 37.153 },
          { x: new Date("2017- 06- 01"), y: 54.18 },
          { x: new Date("2017- 07- 01"), y: 43.84 },
          { x: new Date("2017- 08- 01"), y: 23.671 },
          { x: new Date("2017- 09- 01"), y: 12.496 },
          { x: new Date("2017- 10- 01"), y: 23.007 },
          { x: new Date("2017- 11- 01"), y: 34.233 },
          { x: new Date("2017- 12- 01"), y: 22.276 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Mesin</Th>
              <Th>Line</Th>
              <Th>Pekerjaan</Th>
              <Th>Tanggal</Th>
              <Th>Quantity</Th>
              <Th>Unit</Th>
              <Th>Pic</Th>
              <Th>Awal Pengerjaan</Th>
              <Th>Ahir Pengerjaan</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>data 1</Td>
              <Td>data 2</Td>
              <Td>data 3</Td>
              <Td>data 4</Td>
              <Td>data 5</Td>
              <Td>data 6</Td>
              <Td>data 7</Td>
              <Td>data 8</Td>
              <Td>data 9</Td>
              <Td>data 10</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Instrument;
