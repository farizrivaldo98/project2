import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { Chart } from "react-google-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function WaterManagement() {
  const [WaterDaily, setWaterDaily] = useState([]);
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [WaterArea, setWaterArea] = useState();
  const [SumberPDAM, setSumberPDAM] = useState([]);
  const [PDAMDom, setPDAMDom] = useState([]);
  const [DomWorkshop, setDomWork] = useState([]);
  const [DomQC, setDomQC] = useState([]);
  const [DomToilet, setDomToilet] = useState([]);
  const [PDAMIP, setPDAMIP] = useState([]);
  const [IPOP, setIPOP] = useState([]);
  const [OPOsmo, setOPOsmo] = useState([]);
  const [OsmoCIP, setOsmoCIP] = useState([]);
  const [OsmoPDAM, setOsmoPDAM] = useState([]);
  const [OPSoftwater, setOPSoftwater] = useState([]);
  const [SoftLab, setSoftLab] = useState([]);
  const [SoftChill, setSoftChill] = useState([]);
  const [SoftHot, setSoftHot] = useState([]);
  const [PDAMBoiler, setPDAMBoiler] = useState([]);
  const [PDAMTaman, setPDAMTaman] = useState([]);
  const [TamanAirMancur, setTamanAirMancur] = useState([]);
  const [startSankey, setStartSankey] = useState();
  const [finishSankey, setFinishSankey] = useState();
  
  const fetchWaterSankey = async () => {
      let response1 = await axios.get(
        "http://10.126.15.124:8002/part/waterSankey",
        {
          params: {
            start: startSankey,
            finish: finishSankey,
          }
        }
      );
      
      var PDAMtoDOM = ["PDAM","Domestik"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Domestik.toFixed(2))
        
        PDAMtoDOM.push(data);
      }
      setPDAMDom(PDAMtoDOM);

      var PDAMtoIP = ["PDAM","Inlet Pretreatment"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].InletPretreatment.toFixed(2))
        
        PDAMtoIP.push(data);
      }
      setPDAMIP(PDAMtoIP);

      var PDAMtoBoiler = ["PDAM","Boiler"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Boiler.toFixed(2))
        
        PDAMtoBoiler.push(data);
      }
      setPDAMBoiler(PDAMtoBoiler);

      var SumbertoPDAM = ["Sumber","PDAM"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Pdam.toFixed(2))
        
        SumbertoPDAM.push(data);
        
      }
      setSumberPDAM(SumbertoPDAM); 

      var DomtoWorkshop = ["Domestik","Workshop"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Workshop.toFixed(2))
        
        DomtoWorkshop.push(data);
      }
      setDomWork(DomtoWorkshop);

      var DomtoQC = ["Domestik","Atas Lab QC"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].AtasLabQC.toFixed(2))
        
        DomtoQC.push(data);
      }
      setDomQC(DomtoQC);

      var DomtoToilet = ["Domestik","Atas Toilet Lt.2"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].AtasToiletLt2.toFixed(2))
        
        DomtoToilet.push(data);
      }
      setDomToilet(DomtoToilet);

      var IPtoOP = ["Inlet Pretreatment","Outlet Pretreatment"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].OutletPretreatment.toFixed(2))
        
        IPtoOP.push(data);
      }
      setIPOP(IPtoOP);

      var OPtoOsmo = ["Outlet Pretreatment","Osmotron"];
      for (var i = 0; i < response1.data.length; i++) {
        var OP = Number(response1.data[i].OutletPretreatment.toFixed(2))
        var Soft = Number(response1.data[i].Softwater.toFixed(2))
        var data = OP - Soft
        OPtoOsmo.push(data);
      }
      setOPOsmo(OPtoOsmo);

      

      var OsmotoCIP = ["Osmotron","CIP"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Cip.toFixed(2))

        OsmotoCIP.push(data);
      }
      setOsmoCIP(OsmotoCIP);

      var OsmotoPDAM = ["Osmotron","Reject Osmotron"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].RejectOsmotron.toFixed(2))

        OsmotoPDAM.push(data);
      }
      setOsmoPDAM(OsmotoPDAM);

      var OPtoSoft = ["Outlet Pretreatment","Softwater"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Softwater.toFixed(2))

        OPtoSoft.push(data);
      }
      setOPSoftwater(OPtoSoft);

      var TamantoAirMancur = ["Taman & Pos Jaga","Air Mancur"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].AirMancur.toFixed(2))

        TamantoAirMancur.push(data);
      }
      setTamanAirMancur(TamantoAirMancur);

      var SofttoLab = ["Softwater","Lab"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Lab.toFixed(2))

        SofttoLab.push(data);
      }
      setSoftLab(SofttoLab);

      var SofttoChill = ["Softwater","Chiller"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Chiller.toFixed(2))

        SofttoChill.push(data);
      }
      setSoftChill(SofttoChill);

      var SofttoHot = ["Softwater","Hotwater"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Hotwater.toFixed(2))

        SofttoHot.push(data);
      }
      setSoftHot(SofttoHot);

      var PDAMtoTaman = ["PDAM","Taman & Pos Jaga"];
      for (var i = 0; i < response1.data.length; i++) {
        var data = Number(response1.data[i].Taman.toFixed(2))

        PDAMtoTaman.push(data);
      }
      setPDAMTaman(PDAMtoTaman);
  }
  
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

  let sankeyStart = (e) =>{
      var dataInput = e.target.value;
      setStartSankey(dataInput);
  };
  let sankeyFinish = (e) =>{
      var dataInput = e.target.value;
      setFinishSankey(dataInput);
  };
  const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
  '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

  const options1 = {
      sankey: {
        node: { nodePadding: 50,
               },

        link: {
          colorMode: 'gradient',
          colors: colors
        },
        label: {
           fontName: 'Times-Roman',
           fontSize: 14,
           color: '#871b47',
           bold: true,
           italic: true 
        },
        
      }
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
    
    const data = [
      ["From", "To", "Consumption"],
      SumberPDAM,
      PDAMDom,
      PDAMBoiler,
      PDAMIP,
      PDAMTaman,
      DomQC,
      DomToilet,
      DomWorkshop,
      IPOP,
      OPOsmo,
      OPSoftwater,
      OsmoCIP,
      OsmoPDAM,
      SoftLab,
      SoftHot,
      SoftChill,
    ]; 
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
      <div align="center" className="flex flex-row justify-center mx-12 pb-10">
          <CanvasJSChart className="" options={options} />
      </div>
      <Stack
          className="flex flex-row justify-center mb-4  "
          direction="row"
          spacing={4}
          align="center">
          
          <div>
          <h2>Start Time</h2>
          <Input
              onChange={sankeyStart}
              placeholder="Select Date and Time"
              size="md"
              type="date"
          />
          </div>
          <div>Finish Time
          <Input
              onChange={sankeyFinish}
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
                  onClick={() => fetchWaterSankey()}
              >
                  Submit
              </Button>
          </div>
        </Stack>
        <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Water Distribution</b></h1></div>
        <div align="center"><h2><b>Meter Cubic</b></h2></div>
        <div className="flex flex-row justify-center mx-auto pb-auto">
        <Chart
          chartType="Sankey"
          width= "1500px"
          height="1000px"
          data={data}
          options={options1}>
        </Chart>
        </div>
      </div>
    );
}