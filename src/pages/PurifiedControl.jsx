import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { Chart } from "react-google-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    export default function PurifiedControl() {
        const [startDate, setStartDate] = useState();
        const [finishDate, setFinishDate] = useState();
        const [purifiedArea, setPurifiedArea] = useState();
        const [purifiedData, setPurifiedData] = useState();
        const [highPC, sethighPC]= useState ([]);
        const [lowPC, setlowPC]= useState ([]);
        const [avgPC, setavgPC]= useState ([]);
        const [unit, setunit] = useState();
        const [title, setTitle] = useState();

        const fetchPurified = async () => {
            let response = await axios.get(
              "http://10.126.15.124:8002/part/PurifiedWater",
              {
                params: {
                  area: purifiedArea,
                  start: startDate,
                  finish: finishDate,
                },
              }
            )
            if (purifiedArea === "cMT-BWT_TE845A_8.1_data") {
              var multipliedData = response.data.map((data) => ({
                label: data.label,
                y: data.y,
                x: data.x,
              }));
              setunit("°C");
              setTitle("Temperature")
            } else if (
                purifiedArea === "cMT-BWT_QE845A_6.1_data" 
            ) {
              var multipliedData = response.data.map((data) => ({
                label: data.label,
                y: data.y,
                x: data.x,
              }));
              setunit("ppb");
              setTitle("Total Organic Carbon")
            } else if (purifiedArea === "cMT-BWT_QE845A_8.1_data"){
              var multipliedData = response.data.map((data) => ({
                label: data.label,
                y: data.y,
                x: data.x,
              }));
              setunit("µS/cm");
              setTitle("Conductivity")
            }
        
            setPurifiedData(multipliedData);

            const maxPC = multipliedData.reduce ((acc, data) => Math.max (acc, data.y), Number.NEGATIVE_INFINITY);
            var max = Number(maxPC.toFixed(2))
            sethighPC(max)

            const minPC = Math.min(...response.data.map((data) => data.y));
            var min = Number(minPC.toFixed(2))
            setlowPC(min)

            const totalPC = multipliedData.reduce ((sum, data) => sum + data.y, 0);
            var total = 0
            total = Number(totalPC.toFixed(2))
            const averagePC = totalPC / multipliedData.length;
            var avg = Number(averagePC.toFixed(2))
            setavgPC(avg);
        }
        let dateStart = (e) => {
            var dataInput = e.target.value;
            setStartDate(dataInput);
          };
        
        let dateFinish = (e) => {
            var dataInput = e.target.value;
            setFinishDate(dataInput);
          };
        
        let getPurifiedArea = (e) => {
            var dataInput = e.target.value;
            setPurifiedArea(dataInput);
          };

        const options = {
            theme: "light1",
            title: {
              text: title,
            },
            subtitles: [
              {
                text: unit,
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
                type: "splineArea",
                name: title,
                showInLegend: true,
                xValueFormatString: "",
                yValueFormatString: "",
                dataPoints: purifiedData,
              },
            ],
          };
        return (
            <div>
                <Stack
                className="flex flex-row justify-center mb-4  "
                direction="row"
                spacing={4}
                align="center"
                >
                <div>
                    <h2>Parameter</h2>
                    <Select placeholder="Select Parameter" onChange={getPurifiedArea}>
                        <option value="cMT-BWT_QE845A_6.1_data">QE845A 6.1</option>
                        <option value="cMT-BWT_QE845A_8.1_data">QE845A 8.1</option>
                        <option value="cMT-BWT_TE845A_8.1_data">TE845A 8.1</option>
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
                        onClick={() => fetchPurified()}
                    >
                        Submit
                    </Button>
                </div>
                    <div className="mt-3">
                    <div className="ml-16">Avg = {avgPC.toLocaleString()} {unit}</div>
                    <div className="ml-16">Max = {highPC.toLocaleString()} {unit}</div>
                    <div className="ml-16">Min = {lowPC.toLocaleString()} {unit}</div>
                </div>

            </Stack>
            <div className="flex flex-row justify-center mx-12 pb-10 "> 
                <CanvasJSChart className="" options={options} />
            </div>
                <div className="mt-3">
                    <div className="ml-16">Standard value :</div>
                    <div className="ml-16">Conductivity = below/equal 1,3µS/cm (25°)</div>
                    <div className="ml-16">Total Organic Carbon = below/equal 500ppb{lowPC.toLocaleString()} {unit}</div>
                </div>
            </div>
        )
    }