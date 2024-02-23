import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select, Tbody, Tr, Th, Td, Table, Box } from "@chakra-ui/react";
import axios from "axios";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function HVACchillerChart() {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [area, setArea] = useState();
    const [label1, setlabel1] = useState([]);
    const [label2, setlabel2] = useState([]);
    const [label3, setlabel3] = useState([]);
    const [label4, setlabel4] = useState([]);
    const [ChillerTable, setChillerTable] = useState();
    const [KompTable, setKomTable] = useState();
    const [DataTable1, setDataTable1] = useState([]);
    const [DataTable2, setDataTable2] = useState([]);
    const [DataTable3, setDataTable3] = useState([]);
    const [ChooseData, setChooseData] = useState();
    const [startDate, setStartDate] = useState();
    const [oliatas, setoliatas] = useState();
    const [finishDate, setFinishDate] = useState();
    const [list, setList] = useState([{ area: "", chiller: "",komp: "", start: "", finish: "" }]);
    const [state, setState] = useState();
    const [deletestate, setdelete] = useState();

    const fetchDataChiller = async () => {
      let arr = []    
        for (let i in list){
            arr.push({
                params: list[i]
            })
        }
        let response;
        let response1;
        let response2;
        let response3; 
        for (const id in arr) {
            response= await axios.get(
                "http://10.126.15.124:8002/part/ChillerGraph",
                arr.at(0)
            );
            response1= await axios.get(
                "http://10.126.15.124:8002/part/ChillerGraph",
                arr.at(1)
             );
            response2= await axios.get(
                "http://10.126.15.124:8002/part/ChillerGraph",
                arr.at(2)
             );
            response3= await axios.get(
                "http://10.126.15.124:8002/part/ChillerGraph",
                arr.at(3)
             );
        } ; 
            if (area === "R-EvapPress"){
                var multipliedData = response.data.map((data) => ({
                    label: data.label,
                    y: data.y,
                    x: data.x,
                }));
  
            } else if (
                area === "R-UnitCap" ||
                area === "R-Status" ||
                area === "R-Alarm"
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
              setData(multipliedData); 

            if (area === "R-EvapPress"){
                var multipliedData1 = response1.data.map((data) => ({
                    label: data.label,
                    y: data.y,
                    x: data.x,
                }));
                
            } else if (
                area === "R-UnitCap" ||
                area === "R-Status" ||
                area === "R-Alarm"
              ) {
                multipliedData1 = response1.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));  
            } else {
                multipliedData1 = response1.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              }
              setData1(multipliedData1);
              
            if (area === "R-EvapPress"){
                var multipliedData2 = response2.data.map((data) => ({
                    label: data.label,
                    y: data.y,
                    x: data.x,
                }));
                
            } else if (
                area === "R-UnitCap" ||
                area === "R-Status" ||
                area === "R-Alarm"
              ) {
                multipliedData2 = response2.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));  
            } else {
                multipliedData2 = response2.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              }
              setData2(multipliedData2);

              if (area === "R-EvapPress"){
                var multipliedData3 = response3.data.map((data) => ({
                    label: data.label,
                    y: data.y,
                    x: data.x,
                }));
                
            } else if (
                area === "R-UnitCap" ||
                area === "R-Status" ||
                area === "R-Alarm"
              ) {
                multipliedData3 = response3.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));  
            } else {
                multipliedData3 = response3.data.map((data) => ({
                  label: data.label,
                  y: data.y,
                  x: data.x,
                }));
              }
              setData3(multipliedData3); 
        };
        const fetchName = async () => {
          setlabel1(list.at(0).area);
          setlabel2(list.at(1).area);
          setlabel3(list.at(2).area);
          setlabel4(list.at(3).area);
        };
    const handleAddlist = () => {  
        setList ([...list, {area: "", chiller: "",komp: "", start: "", finish: ""}])
    };
    const handleDeleteList = (i) => {
        const newList = [...list];
        newList.splice(i, 1);
        setList(newList);
        if (i === 1){
          setData1()}
        else if (i === 0){
          setData()
        }
        else if (i === 2){
          setData2()
        }
        else if (i === 3){
          setData3()
        }
    };
    const handleListChange = (e, i) => {
        const field = e.target.name;
        const newList = [...list];
        newList[i][field] = e.target.value;
        setList(newList); 
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
          text: "HVAC Chiller",
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
            name: "1."+label1,
            showInLegend: true,
            markerType: "circle",
            yValueFormatString: "",
            xValueType: "dateTime",
            dataPoints: data,
            color: "red"
          },
          {
            type: "spline",
            name: "2."+label2,
            showInLegend: true,
            markerType: "circle",
            yValueFormatString: "",
            xValueType: "dateTime",
            dataPoints: data1,
            color: "blue"
          },
          {
            type: "spline",
            name: "3."+label3,
            showInLegend: true,
            markerType: "circle",
            yValueFormatString: "",
            xValueType: "dateTime",
            dataPoints: data2,
            color: "green"
          },
          {
            type: "spline",
            name: "4."+label4,
            showInLegend: true,
            markerType: "circle",
            yValueFormatString: "",
            xValueType: "dateTime",
            dataPoints: data3,
            color: "magenta"
          },
        ],
      };
      useEffect(()=>{
        if (list.length >=4){
            setState(true);
        } else {
            setState(false);
        }
        
      });
      let dateStart = (e) =>{
        var dataInput = e.target.value;
        setStartDate(dataInput);
        
      };
      let dateFinish = (e) =>{
        var dataInput = e.target.value;
         setFinishDate(dataInput);
      };
      let DataType = (e) =>{
        var dataInput = e.target.value;
         setChooseData(dataInput);
      };
      let chillerData = (e) =>{
        var dataInput = e.target.value;
         setChillerTable(dataInput);
      };
      let KompData = (e) =>{
        var dataInput = e.target.value;
         setKomTable(dataInput);
      };
      useEffect(() =>{
        if (KompTable ==="K2"){
          setoliatas("OlGlas");
        } else if (KompTable ==="K1"){
          setoliatas("OliGls")
        } 
      });
      const fetchChillerTable = async () => {
        
          let response4 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerStatus", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
                
              }
            }
          );
          let response5 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerKondisi", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
                oliats: oliatas,
              }
            }
          );
          let response6 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerNama", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          const compareTime = (a,b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeA - timeB;
          };
          response4.data.sort(compareTime);
          
          setDataTable1(response4.data);
          setDataTable2(response5.data);
          setDataTable3(response6.data);
        };
      const timeTable = () => {
        return DataTable1.map((myData, index) =>{
          return <Td>{myData.time}</Td>;
        });
      };
      const renderData = (indexData) => {
        const Datanames = [
          "Time",
          "Alarm Chiller",
          "Status Chiller",
          "Fan Kondensor",
          "Status Kompresor",
        ];
        return DataTable1.map((myData) =>{
          return <Td>{myData[indexData]}</Td>;
        });
      };
      const renderData1 = (indexData) => {
        const Datanames = [
          "Bodi Chiller",
          "Kisi-Kisi Kondensor",
          "Lvl Oil Sight Glass Atas",
          "Lvl Oil Sight Glass Bawah",
          "Jalur Sight Glass EXP Valve",
        ];
        return DataTable2.map((myData1) =>{
          return <Td>{myData1[indexData]}</Td>;
        }); 
      };
      const renderData2 = (indexData) => {
        const Datanames = [
          "Operator",
          "Engineer",
          "Utility SPV",
        ];
        return DataTable3.map((myData2) =>{
          return <Td>{myData2[indexData]}</Td>;
        });
      };
    return (
        <div>
        <form>
            {list.map((list, index) => (   
               <div key={index}>
               <Stack
               className="flex flex-row justify-center mb-4  "
               direction="row"
               spacing={4}
               align="center"
               >
               <div>
                   <h2>Area</h2>
                   <Select value = {list.area} name="area" placeholder="Select Area" onChange={(e) => handleListChange(e, index)}>
                       <option value="R-ActiSetpoi">Active Setpoint</option>
                       <option value="R-EvapLWT">Evap LWT</option>
                       <option value="R-EvapEWT">Evap EWT</option>
                       <option value="R-UnitCap">Unit Capacity Full</option>
                       <option value="R-OutTemp">Outdoor Temperature</option>

                       <option value="R-Capacity">Unit Capacity Kompresor</option>
                       <option value="R-EvapPress">Evap Pressure Kompresor</option>
                       <option value="R-CondPress">Cond Pressure Kompresor</option>
                       <option value="R-EvapSatTe">Evap Sat Temperature Kompresor</option>
                       <option value="R-ConSatTem">Cond Sat Temperature Kompresor</option>
                       <option value="R-SuctiTemp">Suction Temperature Kompresor</option>
                       <option value="R-DischTemp">Discharge Temperature Kompresor</option>
                       <option value="R-SuctionSH">Suction SH Kompresor</option>
                       <option value="R-DischarSH">Discharge SH Kompresor</option>
                       <option value="R-EvapAppro">Evap Approach Kompresor</option>
                       <option value="R-EvaDsgApp">Evap Design Approach Kompresor</option>
                       <option value="R-CondAppro">Cond Approach Kompresor</option>
                       <option value="R-OilPress">Oil Pressure Kompresor</option>
                       <option value="R-OilPresDf">Oil Pressure Differential Kompresor</option>
                       <option value="R-EXVPositi">EXV Position Kompresor</option>
                       <option value="R-RunHour">Run Hour Kompressor </option>
                       <option value="R-Ampere">Ampere Kompressor </option>
                       <option value="R-No.Start">No. Of Start Kompresor</option>
                       <option value="H-FanOutdor">Total Fan ON Kompresor</option>

                       <option value="H-TknReturn">Tekanan Return Chiller</option>
                       <option value="H-TknSupply">Tekanan Supply Chiller</option>
                       <option value="H-InletSoft">Inlet Softwater</option>
                       <option value="O-StatONPS">Pompa CHWS 1</option>
                       <option value="H-ShuSebPmSup">Suhu sebelum Pompa Supply</option>
                       <option value="H-ShuSesPmSup">Suhu sesudah Pompa Supply</option>
                       <option value="H-PreSebPmSup">Tekanan Sebelum Pompa Supply</option>
                       <option value="H-PreSesPomSp">Tekanan Sesudah Pompa Supply</option>
                       <option value="O-StatONPR">Pompa CHWR 1</option>
                       <option value="H-SuhSbPomRet">Suhu sebelum Pompa Return</option>
                       <option value="H-SuhSesPmRet">Suhu sesudah Pompa Return</option>
                       <option value="H-PreSebPomRt">Tekanan Sebelum Pompa Return</option>
                       <option value="H-PrSesPomRet">Tekanan Sesudah Pompa Return</option>
                       <option value="RP-TegR-S">Tegangan R-S</option>
                       <option value="RP-TegS-T">Tegangan S-T</option>
                       <option value="RP-TegT-R">Tegangan T-R</option>
                       <option value="RP-AmpR-S">Ampere R-S</option>
                       <option value="RP-AmpS-T">Ampere S-T</option>
                       <option value="RP-AmpT-R">Ampere T-R</option>
                       <option value="H-GroundAmper">Grounding Ampere</option>
                   </Select>
               </div>
               <div>
                   <h2>Chiller</h2>
                   <Select value = {list.chiller} name="chiller" placeholder="Select Chiller" onChange={(e) => handleListChange(e, index)}>
                       <option value="CH1">Chiller 1</option>
                       <option value="CH2">Chiller 2</option>
                       <option value="CH3">Chiller 3</option>
                   </Select>
               </div>
               <div>
                   <h2>Kompresor</h2>
                   <Select value = {list.komp} name="komp" placeholder="Full Chiller" onChange={(e) => handleListChange(e, index)}>
                       <option value="K1">Kompresor 1</option>
                       <option value="K2">Kompresor 2</option>
                   </Select>
               </div>
               <div>
               <h2>Start Time</h2>
               <Input
                   onChange={(e) => handleListChange(e, index)}
                   placeholder="Select Date and Time"
                   size="md"
                   type="date"
                   value = {list.start} 
                   name="start"
               /> 
               </div>
               <div>Finish Time
               <Input
                   onChange={(e) => handleListChange(e, index)}
                   placeholder="Select Date and Time"
                   size="md"
                   type="date"
                   value = {list.finish} name="finish"
               />
               </div>
               <div>
                <br />
                <Button
                     className="m1-4"
                     colorScheme="gray"
                     onClick={() => handleDeleteList(index)}
                 >
                     Delete
                 </Button>
            </div>
           </Stack>
           </div> 
            ))}
        </form>
        <Stack
           className="flex flex-row justify-center mb-4  "
           direction="row"
           spacing={4}
           align="center">
            <div>
                <Button
                     isDisabled={state}
                     className="m1-4"
                     colorScheme="gray"
                     onClick={handleAddlist}
                 >
                     Compare
                 </Button>
            </div>
            <div>
                 <Button
                     className="m1-4"
                     colorScheme="gray"
                     onClick={() => {fetchDataChiller();fetchName()}}
                 >
                     Submit
                 </Button>
            </div>
            </Stack>
            <div className="flex flex-row justify-center mx-12 pb-10 "> 
                <CanvasJSChart className="" options={options} />
            </div>
            <Stack
               className="flex flex-row justify-center mb-4  "
               direction="row"
               spacing={4}
               align="center"
               >
                <div>
                   <h2>Chiller</h2>
                   <Select  placeholder="Select Chiller" onChange={chillerData}>
                       <option value="CH1">Chiller 1</option>
                       <option value="CH2">Chiller 2</option>
                       <option value="CH3">Chiller 3</option>
                   </Select>
               </div>
               <div>
                   <h2>Kompresor</h2>
                   <Select  placeholder="Select Kompresor" onChange={KompData}>
                       <option value="K1">Kompresor 1</option>
                       <option value="K2">Kompresor 2</option>
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
                     onClick={() => fetchChillerTable()}
                 >
                     Submit
                 </Button>
              </div>
            </Stack>
            <div>
              <Box overflowX="auto">
                <Table variant="simple" minWidth="100%">
                  <Tbody>
                    <Tr backgroundColor="aliceblue">
                      <Th className="sticky left-0 z-10 bg-blue-200">Time</Th>
                      {timeTable("Time")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Alarm Chiller</Th>
                      {renderData("Alarm Chiller")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Status Chiller</Th>
                      {renderData("Status Chiller")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Fan Kondensor</Th>
                      {renderData("Fan Kondensor")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Status Kompresor</Th>
                      {renderData("Status Kompresor")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Bodi Chiller</Th>
                      {renderData1("Bodi Chiller")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Kisi-Kisi Kondensor</Th>
                      {renderData1("Kisi-Kisi Kondensor")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Lvl Oil Sight Glass Atas</Th>
                      {renderData1("Lvl Oil Sight Glass Atas")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Lvl Oil Sight Glass Bawah</Th>
                      {renderData1("Lvl Oil Sight Glass Bawah")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Jalur Sight Glass EXP Valve</Th>
                      {renderData1("Jalur Sight Glass EXP Valve")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Operator</Th>
                      {renderData2("Operator")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Engineer</Th>
                      {renderData2("Engineer")}
                    </Tr>
                    <Tr>
                      <Th className="sticky left-0 z-10 bg-blue-200">Utility Supervisor</Th>
                      {renderData2("Utility SPV")}
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </div>
            </div>
    )

}