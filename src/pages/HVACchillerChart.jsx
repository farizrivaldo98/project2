import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select, Tbody, Tr, Th, Td, Table, Box, TableContainer, Thead } from "@chakra-ui/react";
import axios from "axios";
import { ExportToExcel } from "../ExportToExcel";

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
    const [DataTable4, setDataTable4] = useState([]);
    const [DataTable5, setDataTable5] = useState([]);
    const [DataTable6, setDataTable6] = useState([]);
    const [DataTable7, setDataTable7] = useState([]);
    const [DataTable8, setDataTable8] = useState([]);
    const [DataTable9, setDataTable9] = useState([]);
    const [DataTable10, setDataTable10] = useState([]);
    const [DataTable11, setDataTable11] = useState([]);
    const [DataTable12, setDataTable12] = useState([]);
    const [ChooseData, setChooseData] = useState();
    const [startDate, setStartDate] = useState();
    const [oliatas, setoliatas] = useState();
    const [finishDate, setFinishDate] = useState();
    const [list, setList] = useState([{ area: "", chiller: "",komp: "", start: "", finish: "" }]);
    const [state, setState] = useState();
    const [deletestate, setdelete] = useState();
    const [fileName, setfilename] = useState();
    const [fanoutdoor, setfanoutdoor] = useState();

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
        if (KompTable ==="K2CH"){
          setoliatas("OlGlas");
        } else if (KompTable ==="K1CH"){
          setoliatas("OliGls")
        } 
      });
      useEffect(() =>{
        if (KompTable ==="K2CH"){
          setfanoutdoor("dr");
        } else if (KompTable ==="K1CH"){
          setfanoutdoor("dor")
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
          let response7 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData1", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response8 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData2", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response9 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData3", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response10 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData4", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          );
          let response11 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData5", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
                fan: fanoutdoor,
              }
            }
          ); 
          let response12 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData6", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response13 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData7", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response14 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData8", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          let response15 = await axios.get(
            "http://10.126.15.124:8002/part/ChillerData9", 
            {
              params: {
                start: startDate,
                finish: finishDate,
                chiller: ChillerTable,
                komp: KompTable,
              }
            }
          ); 
          setfilename("Data HVAC "+ KompTable +ChillerTable)
          
          setDataTable1(response4.data);
          setDataTable2(response5.data);
          setDataTable3(response6.data);
          setDataTable4(response7.data);
          setDataTable5(response8.data);
          setDataTable6(response9.data);
          setDataTable7(response10.data);
          setDataTable8(response11.data);
          setDataTable9(response12.data);
          setDataTable10(response13.data);
          setDataTable11(response14.data);
          setDataTable12(response15.data);
        };
      const TableDataFull = DataTable1.concat(DataTable2,
        DataTable3,
        DataTable4,
        DataTable5,
        DataTable6,
        DataTable7,
        DataTable8,
        DataTable9,
        DataTable10,
        DataTable11,
        DataTable12
        );
      var obj = {};
      for (var i = 0; i <TableDataFull.length; i++){
        var time = TableDataFull[i].time;
        var p_time = obj[time] || {};
        obj[time] = Object.assign(p_time, TableDataFull[i]);
      }
      const result = Object.values(obj); 

      const TableFull = () => {
        return result.map((data) => {
          return (
            <Tr>
              <Td>{data.time}</Td>
              <Td>{data.Alarm_Chiller}</Td>
              <Td>{data.Status_Chiller}</Td>
              <Td>{data.Fan_Kondensor}</Td>
              <Td>{data.Status_Kompresor}</Td>
              <Td>{data.Bodi_Chiller}</Td>
              <Td>{data.KisiKisi_Kondensor}</Td>
              <Td>{data.Lvl_Oil_Sight_Glass_Atas}</Td>
              <Td>{data.Lvl_Oil_Sight_Glass_Bawah}</Td>
              <Td>{data.Jalur_Sight_Glass_EXP_Valve}</Td>
              <Td>{data.Operator}</Td>
              <Td>{data.Engineer}</Td>
              <Td>{data.Utility_SPV}</Td>
              <Td>{data.Active_Setpoint}</Td>
              <Td>{data.Evap_LWT}</Td>
              <Td>{data.Evap_EWT}</Td>
              <Td>{data.Unit_Capacity_Full}</Td>
              <Td>{data.Outdoor_Temperature}</Td>
              <Td>{data.Unit_Capacity_Kompresor}</Td>
              <Td>{data.Evap_Pressure_Kompresor}</Td>
              <Td>{data.Cond_Pressure_Kompresor}</Td>
              <Td>{data.Evap_Sat_Temperature_Kompresor}</Td>
              <Td>{data.Cond_Sat_Temperature_Kompresor}</Td>
              <Td>{data.Suction_Temperature_Kompresor}</Td>
              <Td>{data.Discharge_Temperature_Kompresor}</Td>
              <Td>{data.Suction_SH_Kompresor}</Td>
              <Td>{data.Discharge_SH_Kompresor}</Td>
              <Td>{data.Evap_Approach_Kompresor}</Td>
              <Td>{data.Evap_Design_Approach_Kompresor}</Td>
              <Td>{data.Cond_Approach_Kompresor}</Td>
              <Td>{data.Oil_Pressure_Kompresor}</Td>
              <Td>{data.Oil_Pressure_Differential_Kompresor}</Td>
              <Td>{data.EXV_Position_Kompresor}</Td>
              <Td>{data.Run_Hour_Kompressor}</Td>
              <Td>{data.Ampere_Kompressor}</Td>
              <Td>{data.No_Of_Start_Kompresor}</Td>
              <Td>{data.Total_Fan_ON_Kompresor}</Td>
              <Td>{data.Tekanan_Return_Chiller}</Td>
              <Td>{data.Tekanan_Supply_Chiller}</Td>
              <Td>{data.Inlet_Softwater}</Td>
              <Td>{data.Pompa_CHWS_1}</Td>
              <Td>{data.Suhu_sebelum_Pompa_Supply}</Td>
              <Td>{data.Suhu_sesudah_Pompa_Supply}</Td>
              <Td>{data.Tekanan_Sebelum_Pompa_Supply}</Td>
              <Td>{data.Tekanan_Sesudah_Pompa_Supply}</Td>
              <Td>{data.Pompa_CHWR_1}</Td>
              <Td>{data.Suhu_sebelum_Pompa_Return}</Td>
              <Td>{data.Suhu_sesudah_Pompa_Return}</Td>
              <Td>{data.Tekanan_Sebelum_Pompa_Return}</Td>
              <Td>{data.Tekanan_Sesudah_Pompa_Return}</Td>
              <Td>{data.Tegangan_RS}</Td>
              <Td>{data.Tegangan_ST}</Td>
              <Td>{data.Tegangan_TR}</Td>
              <Td>{data.Ampere_RS}</Td>
              <Td>{data.Ampere_ST}</Td>
              <Td>{data.Ampere_TR}</Td>
              <Td>{data.Grounding_Ampere}</Td>
            </Tr>
          );
        })
      }
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
                       <option value="R-ActiSetpoiCH">Active Setpoint</option>
                       <option value="R-EvapLWTCH">Evap LWT</option>
                       <option value="R-EvapEWTCH">Evap EWT</option>
                       <option value="R-UnitCapCH">Unit Capacity Full</option>
                       <option value="R-OutTempCH">Outdoor Temperature</option>

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

                       <option value="H-TknReturnCH">Tekanan Return Chiller</option>
                       <option value="H-TknSupplyCH">Tekanan Supply Chiller</option>
                       <option value="H-InletSoftCH">Inlet Softwater</option>
                       <option value="O-StatONPS">Pompa CHWS 1</option>
                       <option value="H-ShuSebPmSupCH">Suhu sebelum Pompa Supply</option>
                       <option value="H-ShuSesPmSupCH">Suhu sesudah Pompa Supply</option>
                       <option value="H-PreSebPmSupCH">Tekanan Sebelum Pompa Supply</option>
                       <option value="H-PreSesPomSpCH">Tekanan Sesudah Pompa Supply</option>
                       <option value="O-StatONPR">Pompa CHWR 1</option>
                       <option value="H-SuhSbPomRetCH">Suhu sebelum Pompa Return</option>
                       <option value="H-SuhSesPmRetCH">Suhu sesudah Pompa Return</option>
                       <option value="H-PreSebPomRtCH">Tekanan Sebelum Pompa Return</option>
                       <option value="H-PrSesPomRetCH">Tekanan Sesudah Pompa Return</option>
                       <option value="RP-TegR-SCH">Tegangan R-S</option>
                       <option value="RP-TegS-TCH">Tegangan S-T</option>
                       <option value="RP-TegT-RCH">Tegangan T-R</option>
                       <option value="RP-AmpR-SCH">Ampere R-S</option>
                       <option value="RP-AmpS-TCH">Ampere S-T</option>
                       <option value="RP-AmpT-RCH">Ampere T-R</option>
                       <option value="H-GroundAmperCH">Grounding Ampere</option>
                   </Select>
               </div>
               <div>
                   <h2>Chiller</h2>
                   <Select value = {list.chiller} name="chiller" placeholder="Select Chiller" onChange={(e) => handleListChange(e, index)}>
                       <option value="1">Chiller 1</option>
                       <option value="2">Chiller 2</option>
                       <option value="3">Chiller 3</option>
                   </Select>
               </div>
               <div>
                   <h2>Kompresor</h2>
                   <Select value = {list.komp} name="komp" placeholder="Full Chiller" onChange={(e) => handleListChange(e, index)}>
                       <option value="K1CH">Kompresor 1</option>
                       <option value="K2CH">Kompresor 2</option>
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
                       <option value="1">Chiller 1</option>
                       <option value="2">Chiller 2</option>
                       <option value="3">Chiller 3</option>
                   </Select>
               </div>
               <div>
                   <h2>Kompresor</h2>
                   <Select  placeholder="Select Kompresor" onChange={KompData}>
                       <option value="K1CH">Kompresor 1</option>
                       <option value="K2CH">Kompresor 2</option>
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
              <div>
              <br />
                    <ExportToExcel apiData={result} fileName={fileName} />
              </div>
            </Stack>
            <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr backgroundColor="aliceblue">
                <Th>Date Time</Th>
                <Th>Alarm Chiller</Th>
                <Th>Status Chiller</Th>
                <Th>Fan Kondensor</Th>
                <Th>Status Kompresor</Th>
                <Th>Bodi Chiller</Th>
                <Th>Kisi-Kisi Kondensor</Th>
                <Th>Lvl Oil Sight Glass Atas</Th>
                <Th>Lvl Oil Sight Glass Bawah</Th>
                <Th>Jalur Sight Glass EXP Valve</Th>
                <Th>Operator</Th>
                <Th>OEngineer</Th>
                <Th>Utility SPV</Th>
                <Th>Active Setpoint</Th>
                <Th>Evap LWT</Th>
                <Th>Evap EWT</Th>
                <Th>Unit Capacity Full</Th>
                <Th>Outdoor Temperature</Th>
                <Th>Unit Capacity Kompresor</Th>
                <Th>Evap Pressure Kompresor</Th>
                <Th>Cond Pressure Kompresor</Th>
                <Th>Evap Sat Temperature Kompresor</Th>
                <Th>Cond Sat Temperature Kompresor</Th>
                <Th>Suction Temperature Kompresor</Th>
                <Th>Discharge Temperature Kompresor</Th>
                <Th>Suction SH Kompresor</Th>
                <Th>Discharge SH Kompresor</Th>
                <Th>Evap Approach Kompresor</Th>
                <Th>Evap Design Approach Kompresor</Th>
                <Th>Cond Approach Kompresor</Th>
                <Th>Oil Pressure Kompresor</Th>
                <Th>Oil Pressure Differential Kompresor</Th>
                <Th>EXV Position Kompresor</Th>
                <Th>Run Hour Kompressor</Th>
                <Th>Ampere Kompressor</Th>
                <Th>No. Of Start Kompresor</Th>
                <Th>Total Fan ON Kompresor</Th>
                <Th>Tekanan Return Chiller</Th>
                <Th>Tekanan Supply Chiller</Th>
                <Th>Inlet Softwater</Th>
                <Th>Pompa CHWS 1</Th>
                <Th>Suhu sebelum Pompa Supply</Th>
                <Th>Suhu sesudah Pompa Supply</Th>
                <Th>Tekanan Sebelum Pompa Supply</Th>
                <Th>Tekanan Sesudah Pompa Supply</Th>
                <Th>Pompa CHWR 1</Th>
                <Th>Suhu sebelum Pompa Return</Th>
                <Th>Suhu sesudah Pompa Return</Th>
                <Th>Tekanan Sebelum Pompa Return</Th>
                <Th>Tekanan Sesudah Pompa Return</Th>
                <Th>Tegangan R-S</Th>
                <Th>Tegangan S-T</Th>
                <Th>Tegangan T-R</Th>
                <Th>Ampere R-S</Th>
                <Th>Ampere S-T</Th>
                <Th>Ampere T-R</Th>
                <Th>Grounding Ampere</Th>
              </Tr>
            </Thead>
            <Tbody>{TableFull()}</Tbody>
          </Table>
        </TableContainer>
        </div>
    )

}