import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Osmotron() {
        const [startDate, setStartDate] = useState();
        const [finishDate, setFinishDate] = useState();
        const [OsmoArea, setOsmoArea] = useState();
        const [OsmoData, setOsmoData] = useState();
        const [max, setmax]= useState ([]);
        const [min, setmin]= useState ([]);
        const [avg, setavg]= useState ([]);
        const [unit, setunit] = useState();
        const [title, setTitle] = useState();

        const fetchOsmo = async () => {
            let response = await axios.get(
                "http://10.126.15.124:8002/part/Osmotron",
                {
                  params: {
                    area: OsmoArea,
                    start: startDate,
                    finish: finishDate,
                  },
                }
              ) 
              if (OsmoArea === "B270A_6.1") {
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              } else if (OsmoArea === "ET270A_6.11" ) {
                var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              } else if (OsmoArea === "ET270A_6.12"){
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
              setOsmoData(multipliedData);

              setTitle(OsmoArea);

              if (OsmoArea === "ET270A_6.11"){
                setunit("Volt")
              } else if (OsmoArea === "ET270A_6.12"  ){
                setunit("Ampere")
              } else if  (OsmoArea === "FIT270_5.50" || OsmoArea === "FIT270A_5.2" || OsmoArea === "FT270A_5.51"
              || OsmoArea === "FT270A_6.1" || OsmoArea === "FT270A_6.2"
              ){
                setunit("Liter/Hour")
              } else if  (OsmoArea === "FT270A_5.1"){
                setunit("Meter Cubic/Hour")
              }else if  (OsmoArea === "PDY270A_5.4" || OsmoArea === "PDY270A_5.7" || OsmoArea === "PT270A_1.1"
              || OsmoArea === "PT270A_5.1" || OsmoArea === "PT270A_5.4" || OsmoArea === "PT270A_5.5"
              || OsmoArea === "PT270A_5.6" || OsmoArea === "PT270A_5.7" || OsmoArea === "PT270A_5.8"
              || OsmoArea === "PT270A_6.1" || OsmoArea === "PT270A_6.2" || OsmoArea === "PT270A_6.3"){
                setunit("Bar")
              }else if  (OsmoArea === "QE270A_11.1"){
                setunit("mV")
              }else if  (OsmoArea === "QE270A_12.1"){
                setunit("pH")
              }else if  (OsmoArea === "QE270A_5.1" || OsmoArea === "QE270A_6.1" || OsmoArea === "QE270A_6.2"){
                setunit("μS/cm")
              }else if  (OsmoArea === "TE270A_5.1" || OsmoArea === "TE270A_6.1" || OsmoArea === "TT270A_5.2"){
                setunit("°C")
              }else if  (OsmoArea === "WCF_Factor"){
                setunit("%")
              }else {
                setunit("")
              }
            
            const maxOsmo = multipliedData.reduce ((acc, data) => Math.max (acc, data.y), Number.NEGATIVE_INFINITY);
            var max = Number(maxOsmo.toFixed(2))
            setmax(max)

            const minOsmo = Math.min(...response.data.map((data) => data.y));
            var min = Number(minOsmo.toFixed(2))
            setmin(min)

            const totalOsmo = multipliedData.reduce ((sum, data) => sum + data.y, 0);
            var total = 0
            total = Number(totalOsmo.toFixed(2))
            const averageOsmo = totalOsmo / multipliedData.length;
            var avg = Number(averageOsmo.toFixed(2))
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
        
        let getOsmoArea = (e) => {
            var dataInput = e.target.value;
            setOsmoArea(dataInput);
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
                dataPoints: OsmoData,
                color: "green"
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
                    <Select placeholder="Select Parameter" onChange={getOsmoArea}>
                        <option value="B270A_6.1">B270A_6.1</option>
                        <option value="ET270A_6.11">ET270A_6.11</option>
                        <option value="ET270A_6.12">ET270A_6.12</option>
                        <option value="FIT270_5.50">FIT270_5.50</option>
                        <option value="FIT270A_5.2">FIT270A_5.2</option>
                        <option value="FT270A_5.1">FT270A_5.1</option>
                        <option value="FT270A_5.51">FT270A_5.51</option>
                        <option value="FT270A_6.1">FT270A_6.1</option>
                        <option value="FT270A_6.2">FT270A_6.2</option>
                        <option value="P270A_1.1">P270A_1.1</option>
                        <option value="P270A_11.1">P270A_11.1</option>
                        <option value="P270A_12.1">P270A_12.1</option>
                        <option value="P270A_13.1">P270A_13.1</option>
                        <option value="P270A_5.1">P270A_5.1</option>
                        <option value="P270A_5.2">P270A_5.2</option>
                        <option value="P270A_6.1">P270A_6.1</option>
                        <option value="P270A_7.1">P270A_7.1</option>
                        <option value="PDY270A_5.4">PDY270A_5.4</option>
                        <option value="PDY270A_5.7">PDY270A_5.7</option>
                        <option value="PT270A_1.1">PT270A_1.1</option>
                        <option value="PT270A_5.1">PT270A_5.1</option>
                        <option value="PT270A_5.4">PT270A_5.4</option>
                        <option value="PT270A_5.5">PT270A_5.5</option>
                        <option value="PT270A_5.6">PT270A_5.6</option>
                        <option value="PT270A_5.7">PT270A_5.7</option>
                        <option value="PT270A_5.8">PT270A_5.8</option>
                        <option value="PT270A_6.1">PT270A_6.1</option>
                        <option value="PT270A_6.2">PT270A_6.2</option>
                        <option value="PT270A_6.3">PT270A_6.3</option>
                        <option value="QE270A_11.1">QE270A_11.1</option>
                        <option value="QE270A_12.1">QE270A_12.1</option>
                        <option value="QE270A_5.1">QE270A_5.1</option>
                        <option value="QE270A_6.1">QE270A_6.1</option>
                        <option value="QE270A_6.2">QE270A_6.2</option>
                        <option value="TE270A_5.1">TE270A_5.1</option>
                        <option value="TE270A_6.1">TE270A_6.1</option>
                        <option value="TT270A_5.2">TT270A_5.2</option>
                        <option value="V270A_5.10">V270A_5.10</option>
                        <option value="V270A_5.50">V270A_5.50</option>
                        <option value="V270A_5.51">V270A_5.51</option>
                        <option value="V270A_6.2">V270A_6.2</option>
                        <option value="V270A_6.5">V270A_6.5</option>
                        <option value="W270A_5.1">W270A_5.1</option>
                        <option value="WCF_Factor">WCF_Factor</option>
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
                        onClick={() => fetchOsmo()}
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