import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Loopo() {
        const [startDate, setStartDate] = useState();
        const [finishDate, setFinishDate] = useState();
        const [LoopoArea, setLoopoArea] = useState();
        const [LoopoData, setLoopoData] = useState();
        const [max, setmax]= useState ([]);
        const [min, setmin]= useState ([]);
        const [avg, setavg]= useState ([]);
        const [unit, setunit] = useState();
        const [title, setTitle] = useState();

        const fetchLoopo = async () => {
            let response = await axios.get(
                "http://10.126.15.124:8002/part/Loopo",
                {
                  params: {
                    area: LoopoArea,
                    start: startDate,
                    finish: finishDate,
                  },
                }
              ) 
              if (LoopoArea === "A845A_2.1") {
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              } else if (
                  LoopoArea === "FT845A_8.1" 
              ) {
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              } else if (LoopoArea === "LT845A_1.1"){
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              } else {
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              }
              setLoopoData(multipliedData);

              setTitle(LoopoArea);

              if (LoopoArea === "FT845A_8.1"){
                setunit("Meter Cubic/Hour")
              } else if (LoopoArea === "PT845A_1.1" || LoopoArea === "PT845A_8.1"  ){
                setunit("Bar")
              } else if  (LoopoArea === "QE845A_4.1"){
                setunit("W/Square Meter")
              } else if  (LoopoArea === "QE845A_5.1"){
                setunit("ppb")
              }else if  (LoopoArea === "TT845A_3.1"){
                setunit("°C")
              }else if  (LoopoArea === "LT560A_1.1"){
                setunit("%")
              }else {
                setunit("")
              }
            
            const maxLoopo = multipliedData.reduce ((acc, data) => Math.max (acc, data.y), Number.NEGATIVE_INFINITY);
            var max = Number(maxLoopo.toFixed(2))
            setmax(max)

            const minLoopo = Math.min(...response.data.map((data) => data.y));
            var min = Number(minLoopo.toFixed(2))
            setmin(min)

            const totalLoopo = multipliedData.reduce ((sum, data) => sum + data.y, 0);
            var total = 0
            total = Number(totalLoopo.toFixed(2))
            const averageLoopo = totalLoopo / multipliedData.length;
            var avg = Number(averageLoopo.toFixed(2))
            setavg(avg);
        }

        let dateStart = (e) => {
            var dataInput = e.target.value;
            setStartDate(dataInput);
          };
        
        let dateFinish = (e) => {
            var dataInput = e.target.value;
            setFinishDate(dataInput);
          };
        
        let getLoopoArea = (e) => {
            var dataInput = e.target.value;
            setLoopoArea(dataInput);
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
            axisX: {
              valueFormatString: "YYYY-MMM-DD HH:mm",
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
                name: title,
                showInLegend: true,
                markerType: "circle",
                yValueFormatString: "",
                xValueType: "dateTime",
                dataPoints: LoopoData,
                color: "purple"
              },
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
                    <h2>Parameter</h2>
                    <Select placeholder="Select Parameter" onChange={getLoopoArea}>
                        <option value="A845A_2.1">A845A_2.1</option>
                        <option value="FT845A_8.1">FT845A_8.1</option>
                        <option value="LT560A_1.1">LT560A_1.1</option>
                        <option value="P845A_1.1">P845A_1.1</option>
                        <option value="PT845A_1.1">PT845A_1.1</option>
                        <option value="PT845A_8.1">PT845A_8.1</option>
                        <option value="QE845A_4.1">QE845A_4.1</option>
                        <option value="QE845A_5.1">QE845A_5.1</option>
                        <option value="TT845A_3.1">TT845A_3.1</option>
                        <option value="V845A_3.1">V845A_3.1</option>
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
                        onClick={() => fetchLoopo()}
                    >
                        Submit
                    </Button>
                </div>
                    <div className="mt-3">
                    <div className="ml-16">Avg = {avg.toLocaleString()} {unit}</div>
                    <div className="ml-16">Max = {max.toLocaleString()} {unit}</div>
                    <div className="ml-16">Min = {min.toLocaleString()} {unit}</div>
                </div>

            </Stack>
            <div className="flex flex-row justify-center mx-12 pb-10 "> 
                <CanvasJSChart className="" options={options} />
            </div>
            </div>
        )
}