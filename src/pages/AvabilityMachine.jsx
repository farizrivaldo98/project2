import React, { useEffect, useRef } from "react";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment/moment";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Card,
  CardBody,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ButtonGroup,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AvabilityMachine() {
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const dateValue = useSelector((state) => state.prod.date);

  const [avabilityMachine, setAvabilityMachine] = useState([]);
  const [selectMachine, UseSelectMachine] = useState("");
  const [fetchPartData, UseFetchPartData] = useState([]);
  const [totalBreakdown, SetTotalBreakdown] = useState();
  const [circularData, UseCircularData] = useState(0);
  const [datacountMinor, setcountMinor] = useState(0);
  const [filterDataSave, setFilterDataSave] = useState([]);

  const fetchAvaMachine = async (date) => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/avamachine",
      {
        params: {
          date: date,
        },
      }
    );
    setAvabilityMachine(response.data);
  };

  const fetchPart = async (data) => {
    let response = await axios.get("http://10.126.15.124:8002/part/get", {
      params: {
        date: data,
      },
    });
    UseFetchPartData(response.data);
  };

  const dataPointsAva = avabilityMachine;

  useEffect(() => {
    createPareto();
    fetchAvaMachine(dateValue);
    fetchPart(dateValue);
  }, []);

  useEffect(() => {
    renderCountMinor();
  }, [selectMachine]);

  const backPage = () => {
    navigate("/avabilityope");
  };

  const filterData = fetchPartData.filter((el) => {
    if (selectMachine == "") {
      return;
    }
    if (selectMachine == "Avability CM1") {
      return el.Mesin.includes("CM1");
    }
    if (selectMachine == "Avability CM2") {
      return el.Mesin.includes("CM2");
    }
    if (selectMachine == "Avability CM3") {
      return el.Mesin.includes("CM3");
    }
    if (selectMachine == "Avability CM4") {
      return el.Mesin.includes("CM4");
    }
    if (selectMachine == "Avability CM5") {
      return el.Mesin.includes("CM5");
    }
  });

  let objTotalBreakdown = 0;
  for (var i = 0; i < filterData.length; i++) {
    objTotalBreakdown += filterData[i].Total;
  }

  var visitorsChartDrilldownHandler = (e) => {
    let chartClick = e.dataPoint.label;
    window.scrollTo(0, document.body.scrollHeight);

    UseSelectMachine(chartClick);
  };

  const filterAva = dataPointsAva.filter((el) => {
    if (selectMachine == "") {
      //return el.label.includes("Avability CM1");
      return;
    }
    if (selectMachine == "Avability CM1") {
      return el.label.includes("Avability CM1");
    }
    if (selectMachine == "Avability CM2") {
      return el.label.includes("Avability CM2");
    }
    if (selectMachine == "Avability CM3") {
      return el.label.includes("Avability CM3");
    }
    if (selectMachine == "Avability CM4") {
      return el.label.includes("Avability CM4");
    }
    if (selectMachine == "Avability CM5") {
      return el.label.includes("Avability CM5");
    }
  });

  const renderPartList = () => {
    return filterData
      .sort((a, b) => b.Total - a.Total)
      .map((partdata) => {
        return (
          <Tr>
            <Td>{partdata.Mesin}</Td>
            <Td>{partdata.Line}</Td>
            {partdata.Total <= 10 ? (
              <Td className="bg-amber-100">{partdata.Pekerjaan}</Td>
            ) : (
              <Td>{partdata.Pekerjaan}</Td>
            )}

            <Td>{moment(partdata.Tanggal).format("DD/MM/YYYY")}</Td>
            <Td>{partdata.Quantity}</Td>
            <Td>{partdata.Unit}</Td>
            <Td>{partdata.Pic}</Td>
            <Td>{partdata.Tawal}</Td>
            <Td>{partdata.Tahir}</Td>
            {partdata.Total <= 10 ? (
              <Td className="bg-amber-100">{partdata.Total}</Td>
            ) : (
              <Td>{partdata.Total}</Td>
            )}
          </Tr>
        );
      });
  };

  const renderCountMinor = () => {
    var count = 0;
    for (var i = 0; i < filterData.length; i++) {
      if (filterData[i].Total <= 10) {
        count++;
      }
    }
    setcountMinor(count);
  };

  const createPareto = () => {
    var dps = [];
    var chart = chartRef.current;
    var yValue,
      yTotal = 0,
      yPercent = 0;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++)
      yTotal += chart.data[0].dataPoints[i].y;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
      yValue = chart.data[0].dataPoints[i].y;
      yPercent += (yValue / yTotal) * 100;
      dps.push({ label: chart.data[0].dataPoints[i].label, y: yPercent });
    }
    chart.addTo("data", {
      type: "line",
      yValueFormatString: "0.##" % "",
      dataPoints: dps,
    });
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
    chart.axisY2[0].set("maximum", 100);
  };

  const options = {
    theme: "light2",
    height: 800,
    title: {
      text: "Avability Machine",
    },

    axisY: {
      title: "Data in (%)",
      lineColor: "#4F81BC",
      tickColor: "#4F81BC",
      labelFontColor: "#4F81BC",
    },
    data: [
      {
        indexLabelFontColor: "black",
        click: visitorsChartDrilldownHandler,
        type: "column",
        dataPoints: dataPointsAva,
      },
    ],
  };

  return (
    <>
      <div>
        <br />
        <br />

        <CanvasJSChart
          options={options}
          onRef={(ref) => (chartRef.current = ref)}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
      <br />
      <div>
        <Button className="ml-4" colorScheme="red" onClick={() => backPage()}>
          Back
        </Button>
      </div>

      <div className="flex flex-row justify-center  pb-10 ">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="mr-4"
        >
          <div>
            <CircularProgress
              value={filterAva[0] ? filterAva[0].y.toFixed(2) : 0}
              color="green.400"
              size="200px"
            >
              <CircularProgressLabel>
                {filterAva[0] ? filterAva[0].y.toFixed(2) : 0}%
              </CircularProgressLabel>
            </CircularProgress>
          </div>
          <div></div>
          <Stack>
            <CardBody>
              <Heading size="md">
                {filterAva[0] ? filterAva[0].label : "Avability"}
              </Heading>

              <Text py="2">
                Stop Time ({objTotalBreakdown} Min)
                <Progress hasStripe value={objTotalBreakdown} />
                <p className="mt-1">Minor Stop ({datacountMinor}x)</p>
                <br />
                availability is the ratio of Run Time to Planned Production
                Time.
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </div>

      <div>
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
              </Tr>
            </Thead>
            <Tbody>{renderPartList()}</Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default AvabilityMachine;
