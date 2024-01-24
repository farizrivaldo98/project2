import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select, Radio, RadioGroup} from "@chakra-ui/react";
import axios from "axios";
import { ExportToExcel } from "../ExportToExcel";

function WaterExportMonthly() {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState();
    const [finishDate, setFinishDate] = useState();
    const [fileName, setfilename] = useState();

    const fetchWaterTotalizer = async () => {
        let response1 = await axios.get(
            "http://10.126.15.124:8002/part/ExportWaterTotalizerMonthly",
            {
              params: {
                start: startDate,
                finish: finishDate,
              }
            }
          );
          setData(response1.data); 
          setfilename("Water Totalizer Data Monthly")
    };
    const fetchWaterConsumption = async () => {
        let response = await axios.get(
            "http://10.126.15.124:8002/part/ExportWaterConsumptionMonthly", 
            {
              params: {
                start: startDate,
                finish: finishDate,
              }
            }
          );
          setData(response.data); 
          setfilename("Water Consumption Data Monthly") 
    };

    let dateStart = (e) =>{
        var dataInput = e.target.value;
        setStartDate(dataInput);
    };
    let dateFinish = (e) =>{
        var dataInput = e.target.value;
        setFinishDate(dataInput);
    }; 
    return (
        <div>
            <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Export Monthly Water Data </b></h1></div>
            <Stack
                className="flex flex-row justify-center mb-4  "
                direction="row"
                spacing={4}
                align="center"
            >
            <div>
                <h2>Start Time</h2>
                <Input
                    onChange={dateStart}
                    placeholder="Select Date"
                    size="md"
                    type="month"
                />
                </div>
                <div>Finish Time
                <Input
                    onChange={dateFinish}
                    placeholder="Select Date"
                    size="md"
                    type="month"
                />
                </div>
                <div> Data Type : 
                <RadioGroup>
                <Stack direction='row'>
                    <Radio value='1' onClick={() => fetchWaterConsumption()}>Consumption</Radio>
                    <Radio value='2' onClick={() => fetchWaterTotalizer()}>Totalizer</Radio>
                </Stack>
                </RadioGroup>
                </div>
 
            </Stack>
            <Stack
                className="flex flex-row justify-center mb-4  "
                direction="row"
                spacing={4}
                align="center"
            >
                <div>
                    <ExportToExcel apiData={data} fileName={fileName} />
                </div>
            </Stack>
        </div>
    );
}
export default WaterExportMonthly;