import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BuildingRnD() {
         const [startDate, setStartDate] = useState();
         const [finishDate, setFinishDate] = useState();
         const [Area, setArea] = useState();
         const [SuhuData, setSuhuData] = useState([]);
         const [RHData, setRHData] = useState([]);
         const [AllDataWH1, setAllDataWH1] = useState([]);

         const fetchWH1Data = async () => {
            let response = await axios.get(
              "http://10.126.15.124:8002/part/BuildingWH1Suhu", 
              {
                params: {
                  area: Area,
                  start: startDate,
                  finish: finishDate,
                },
              }
            );            
              setSuhuData(response.data);

              let response1 = await axios.get(
                "http://10.126.15.124:8002/part/BuildingWH1RH",
                {
                  params: {
                    area: Area,
                    start: startDate,
                    finish: finishDate,
                  },
                }
              );            
                setRHData(response1.data);
                
                  let response2 = await axios.get(
                    "http://10.126.15.124:8002/part/BuildingWH1All",
                    {
                      params: {
                        area: Area,
                        start: startDate,
                        finish: finishDate,
                      },
                    }
                  );     
                    setAllDataWH1(response2.data); console.log(response2.data);
        };

        const table = () => {
          return AllDataWH1.map((data) => {
            return (
              <Tr>
                <Td>{data.tgl}</Td>
                <Td>{data.temp}</Td>
                <Td>{data.RH}</Td>
              </Tr>
            );
          });
        };
         let dateStart = (e) => {
            var dataInput = e.target.value;
            setStartDate(dataInput);
          };
        
        let dateFinish = (e) => {
            var dataInput = e.target.value;
            setFinishDate(dataInput);
          };
        let getArea = (e) => {
            var dataInput = e.target.value;
            setArea(dataInput);
          };

          var localeOptions = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC",
            hour12: false
          };
          const options = {
      
            theme: "light1",
            title: {
              text: "WAREHOUSE 1 DATA GRAPH",
            },
            axisY: {
              prefix: "",
            },
            axisX: {
              valueFormatString: "YYYY-MMM-DD HH:mm K",
              labelFormatter: function(e) {
                let date = new Date(e.value);
                let content = date.toLocaleDateString("en-US", localeOptions);
                return content;
              }
            },
            toolTip: {
              shared: true,
            }, 
            data: [
                {
                type: "spline",
                name: "Temperature (°C)",
                showInLegend: true,
                xValueFormatString: "",
                yValueFormatString: "",
                dataPoints: SuhuData,
              },
              {
                type: "spline",
                name: "RH (%)",
                showInLegend: true,
                xValueFormatString: "",
                yValueFormatString: "",
                dataPoints: RHData,
              }
            ],
        };

    return(
        <div>
             <Stack
                className="flex flex-row justify-center mb-4  "
                direction="row"
                spacing={4}
                align="center"
                >
                <div>
                    <h2>Area</h2>
                    <Select placeholder="Select Area"  onChange={getArea}>
                        <option value="RakLayer3-C56WH1">C56 WH1</option>
                        <option value="RakLayer3-C64WH1">C64 WH1</option>
                        <option value="RakLayer3-C72WH1">C72 WH1</option>
                        <option value="PrekursorWH1">Prekursor WH1</option>
                    </Select>
                </div>
                <div>
                <h2>Start Time</h2>
                <Input
                    onChange={dateStart}
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                /> 
                </div>
                <div>Finish Time
                <Input
                    onChange={dateFinish}
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                />
                </div>
                <div>
                    <br />
                    <Button
                        className="m1-4"
                        colorScheme="gray"
                        onClick={() => fetchWH1Data()}
                    >
                        Submit
                    </Button>
                </div>
            </Stack>
            <div className="flex flex-row justify-center mx-12 pb-10 "> 
                <CanvasJSChart className="" options={options} />
            </div>
            <div className="mt-20 mx-20">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date Time</Th>
                <Th>Temperature (°C)</Th>
                <Th>Relative Humidity/RH (%)</Th>
              </Tr>
            </Thead>
            <Tbody>{table()}</Tbody>
          </Table>
        </TableContainer>
      </div>
        </div>
    )
}