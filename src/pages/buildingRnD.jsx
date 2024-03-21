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
         const [DPData, setDPData] = useState([]);
         const [AllDataRND, setAllDataRND] = useState([]);

         const fetchRNDSuhu = async () => {
            let response = await axios.get(
              "http://10.126.15.1:8002/part/BuildingRNDSuhu",
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
                "http://10.126.15.124:8002/part/BuildingRNDRH",
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
                  "http://10.126.15.124:8002/part/BuildingRNDDP",
                  {
                    params: {
                      area: Area,
                      start: startDate,
                      finish: finishDate,
                    },
                  }
                );            
                  setDPData(response2.data);
                
                  let response3 = await axios.get(
                    "http://10.126.15.124:8002/part/BuildingRNDAll",
                    {
                      params: {
                        area: Area,
                        start: startDate,
                        finish: finishDate,
                      },
                    }
                  );     
                    setAllDataRND(response3.data);
        };

        const table = () => {
          return AllDataRND.map((data) => {
            return (
              <Tr>
                <Td>{data.tgl}</Td>
                <Td>{data.temp}</Td>
                <Td>{data.RH}</Td>
                <Td>{data.DP}</Td>
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
            timeZoneName: "short",
            hour12: false
          };
          const options = {
      
            theme: "light1",
            title: {
              text: "RND LABORATORIUM GRAPH",
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
              },
              {
                type: "spline",
                name: "DP (Pa)",
                showInLegend: true,
                xValueFormatString: "",
                yValueFormatString: "",
                dataPoints: DPData,
                color: "magenta"
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
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-01_data">R. ACCEDE</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-02_data">R. JMCO RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-03_data">R. Primary Packaging RND Lt. 3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-04_data">R. Coating RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-05_data">R. Aging Gummy RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-06_data">Koridor 1 RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-07_data">Koridor 2 RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-08_data">R. Tool RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-09_data">R. Tumbler RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-10_data">R. WIP RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-11_data">R. Proses Gummy RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-12_data">R. Granulation & FBD RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-13_data">R. Washing RND Lt.3</option>
                        <option value="CMT-HVAC-RND-Lt.3_EMS_RND3_HMI-14_data">Locker RND Lt.3</option>
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
                        onClick={() => fetchRNDSuhu()}
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
                <Th>Temperature</Th>
                <Th>Relative Humidity (RH)</Th>
                <Th>Differential Presure (DP)</Th>
              </Tr>
            </Thead>
            <Tbody>{table()}</Tbody>
          </Table>
        </TableContainer>
      </div>
        </div>
    )
}