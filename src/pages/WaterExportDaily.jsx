import React, { useEffect, Component, useState } from "react";
import { Button, 
    ButtonGroup, 
    Stack, 
    Input, 
    Select, 
    Radio, 
    RadioGroup, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableContainer 
} from "@chakra-ui/react";
import axios from "axios";
import { ExportToExcel } from "../ExportToExcel";


function WaterExportDaily() {
    const [dataExport, setData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [finishDate, setFinishDate] = useState();
    const [fileName, setfilename] = useState();

    const fetchWaterConsumption = async () => {
        let response = await axios.get(
            "http://10.126.15.124:8002/part/ExportWaterConsumptionDaily", 
            {
              params: {
                start: startDate,
                finish: finishDate,
              }
            }
          );
          setData(response.data); 
          setfilename("Water Consumption Data Daily") 
    };
    const fetchWaterTotalizer = async () => {
        let response1 = await axios.get(
            "http://10.126.15.124:8002/part/ExportWaterTotalizerDaily",
            {
              params: {
                start: startDate,
                finish: finishDate,
              }
            }
          );
          setData(response1.data); 
          setfilename("Water Totalizer Data Daily")
    };
    
    let dateStart = (e) =>{
        var dataInput = e.target.value;
        setStartDate(dataInput);
        
    };
    let dateFinish = (e) =>{
        var dataInput = e.target.value;
        setFinishDate(dataInput);
        
    }; 
    const previewTable = () => {
        return dataExport.map((data) =>{
            return (
                <Tr>
                    <Td>{data.Tanggal}</Td>
                    <Td>{data.Chiller}</Td>
                    <Td>{data.Softwater}</Td>
                    <Td>{data.Boiler}</Td>
                    <Td>{data.Inlet_Pretreatment}</Td>
                    <Td>{data.Outlet_Pretreatment}</Td>
                    <Td>{data.Reject_Osmotron}</Td>
                    <Td>{data.Taman}</Td>
                    <Td>{data.Inlet_WWTP_Kimia}</Td>
                    <Td>{data.Inlet_WWTP_Biologi}</Td>
                    <Td>{data.Outlet_WWTP}</Td>
                    <Td>{data.CIP}</Td>
                    <Td>{data.Hotwater}</Td>
                    <Td>{data.Lab}</Td>
                    <Td>{data.Atas_Toilet_Lt2}</Td>
                    <Td>{data.Atas_Lab_QC}</Td>
                    <Td>{data.Workshop}</Td>
                    <Td>{data.Air_Mancur}</Td>
                </Tr>
            );
        });
    };
    return (
        <div>
            <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Export Daily Water Data </b></h1></div>
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
                    type="date"
                />
                </div>
                <div>Finish Time
                <Input
                    onChange={dateFinish}
                    placeholder="Select Date"
                    size="md"
                    type="date"
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
                    <ExportToExcel apiData={dataExport} fileName={fileName} />
                </div>
            </Stack>
            <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Preview {fileName}:</b></h1></div>
            <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr backgroundColor="aliceblue">
                <Th>Date Time</Th>
                <Th>Domestik</Th>
                <Th>Chiller</Th>
                <Th>Softwater</Th>
                <Th>Boiler</Th>
                <Th>Inlet Pretreatment</Th>
                <Th>Outlet Pretreatment</Th>
                <Th>Reject Osmotron</Th>
                <Th>Taman</Th>
                <Th>Inlet WWTP Kimia</Th>
                <Th>Inlet WWTP Biologi</Th>
                <Th>Outlet WWTP</Th>
                <Th>CIP</Th>
                <Th>Hotwater</Th>
                <Th>Lab</Th>
                <Th>Atas Toilet Lt2</Th>
                <Th>Atas Lab QC</Th>
                <Th>Workshop</Th>
                <Th>Air Mancur</Th>
              </Tr>
            </Thead>
            <Tbody>{previewTable()}</Tbody>
          </Table>
        </TableContainer>
        </div>
    );

    

    
}
export default WaterExportDaily;