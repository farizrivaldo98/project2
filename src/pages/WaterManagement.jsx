import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function WaterManagement() {
  const [WaterDaily, setWaterDaily] = useState([]);
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [WaterArea, setWaterArea] = useState();


  const fetchWaterDaily = async () => {
      let response = await axios.get(
          "http://10.126.15.124:8002/part/waterSystem",
          {
              params: {
                  area: WaterArea,
                  start: startDate,
                  finish: finishDate,
              },
          }

      );

          if (WaterArea === "cMT-BWT_PDAM_Sehari_data"){
              var multipliedData = response.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
              }));
          } else if (
              WaterArea === "cMT-BWT_Dom_sehari_data" ||
              WaterArea === "cMT-BWT_Softwater_sehari_data" ||
              WaterArea === "cMT-BWT_Boiler_sehari_data"
            ) {
              multipliedData = response.data.map((data) => ({
                label: data.label,
                y: data.y,
                x: data.x,
              }));
            } else {
              multipliedData = response.data.map((data) => ({
                label: data.label,
                y: data.y,
                x: data.x,
              }));
            }
            setWaterDaily(multipliedData);
  };
  let dateStart = (e) =>{
      var dataInput = e.target.value;
      setStartDate(dataInput);
  };
  let dateFinish = (e) =>{
      var dataInput = e.target.value;
      setFinishDate(dataInput);
  };
  let getWaterArea = (e) =>{
      var dataInput = e.target.value;
      setWaterArea(dataInput);
  };

  const options = {
      theme: "light1",
      title: {
        text: "Daily Water Consumption",
      },
      subtitles: [
        {
          text: "Meter Cubic",
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
          name: "Meter Cubic",
          showInLegend: true,
          xValueFormatString: "",
          yValueFormatString: "",
          dataPoints: WaterDaily,
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
              <h2>Flow Meter</h2>
              <Select placeholder="Select Flow Meter" onChange={getWaterArea}>
                  <option value="cMT-BWT_PDAM_Sehari_data">PDAM</option>
                  <option value="cMT-BWT_Dom_sehari_data">Domestik</option>
                  <option value="cMT-BWT_Softwater_sehari_data">Softwater</option>
                  <option value="cMT-BWT_Boiler_sehari_data">Boiler</option>
                  <option value="cMT-BWT_Inlet_Sehari_data">Inlet Pretreatment</option>
                  <option value="cMT-BWT_Outlet_sehari_data">Outlet Pretreatment</option>
                  <option value="cMT-BWT_RO_sehari_data">Reject Osmotronn</option>
                  <option value="cMT-BWT_Chiller_sehari_data">Chiller</option>
                  <option value="cMT-BWT_Taman_sehari_data">Taman & Pos Jaga</option>
                  <option value="cMT-BWT_WWTP_Biologi_1d_data">WWTP Biologi</option>
                  <option value="cMT-BWT_WWTP_Kimia_1d_data">WWTP Kimia</option>
                  <option value="cMT-BWT_WWTP_Outlet_1d_data">WWTP Outlet</option>
                  <option value="cMT-BWT_CIP_Sehari_data">CIP</option>
                  <option value="cMT-BWT_Hotwater_Sehari_data">Hotwater</option>
                  <option value="cMT-BWT_Lab_Sehari_data">Lab</option>
                  <option value="cMT-BWT_AtsToilet_Sehari_data">Atas Toilet lt.2</option>
                  <option value="cMT-BWT_Atas QC_Sehari_data">Atas Lab QC</option>
                  <option value="cMT-BWT_Workshop_Sehari_data">Workshop</option>
                  <option value="cMT-BWT_AirMancur_Sehari_data">Air Mancur</option>
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
                  onClick={() => fetchWaterDaily()}
              >
                  Submit
              </Button>
          </div>
      </Stack>
      <div className="flex flex-row justify-center mx-12 pb-10">
          <CanvasJSChart className="" options={options} />
      </div>
      </div>
    );
}