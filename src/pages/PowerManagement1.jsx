import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { Chart } from "react-google-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PowerManagement() {
  const [dailyPower, setDailyPower] = useState([]);
  const [monthlyPower, setMonthlyPowe] = useState([]);
  const [avarageDaily, setAvarageDaily] = useState(0);
  const [totalDaily, setTotalDaily] = useState(0);
  const [avarageMonthly, setAvarageMonthly] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [powerArea, setPowerArea] = useState();
  const [startMonth, setStartMonth] = useState();
  const [finishMonth, setFinishMonth] = useState();
  const [areaMonth, setAreaMonth] = useState();

  const [secArea, setSecArea] = useState();
  const [secStart, setSecStart] = useState();
  const [secFinish, setSecFinish] = useState();

  const [secFreq, setSecFreq] = useState([]);
  const [secPtP, setSecPtP] = useState([]);
  const [secPtN, setSecPtN] = useState([]);

  const [maxSecFreq, setmaxSecFreq] = useState([]);
  const [maxSecPtP, setmaxSecPtP] = useState([]);
  const [maxSecPtN, setmaxSecPtN] = useState([]);
  const [minSecFreq, setminSecFreq] = useState([]);
  const [minSecPtP, setminSecPtP] = useState([]);
  const [minSecPtN, setminSecPtN] = useState([]);

  const [datamaxFreq, setdatamaxFreq] = useState();
  const [datamaxPtoP, setdatamaxPtoP] = useState();
  const [datamaxPtoN, setdatamaxPtoN] = useState();
  const [dataminFreq, setdataminFreq] = useState();
  const [dataminPtoP, setdataminPtoP] = useState();
  const [dataminPtoN, setdataminPtoN] = useState();
  const [dataavgFreq, setdataavgFreq] = useState();
  const [dataavgPtoP, setdataavgPtoP] = useState();
  const [dataavgPtoN, setdataavgPtoN] = useState();

  const [percentRR, setPercentRR] = useState(0);
  const [percentSS, setPercentSS] = useState(0);
  const [percentTT, setPercentTT] = useState(0);
  const [percentRN, setPercentRN] = useState(0);
  const [percentSN, setPercentSN] = useState(0);
  const [percentTN, setPercentTN] = useState(0);

  const [totalRR, settotalRR] = useState(0);
  const [totalSS, settotalSS] = useState(0);
  const [totalTT, settotalTT] = useState(0);
  const [totalRN, settotalRN] = useState(0);
  const [totalSN, settotalSN] = useState(0);
  const [totalTN, settotalTN] = useState(0);

  const [datawidth, setWidth] = useState();
  const [dataheight, setHeight] = useState();

  const [startSankey, setStartSankey] = useState();
  const [finishSankey, setFinishSankey] = useState();
  const [dataSankey, setdataSankey] = useState([])
  const [state, setstate] = useState(0);
  
  const [MVMDP, setMVMDP] = useState([])
  const [LVMDP1, setLVMDP1] = useState([])
  const [LVMDP2, setLVMDP2] = useState([])
  const [SolarPanel16, setSolarPanel16] = useState([])
  const [SolarPanel712, setSolarPanel712] = useState([])
  const [SDP1Utility, setSDP1Utility] = useState([])
  const [PPLP1UtilityLt2, setPPLP1UtilityLt2] = useState([])
  const [PP1Chiller, setPP1Chiller] = useState([])
  const [PPLP1UtilityLt1, setPPLP1UtilityLt1] = useState([])
  const [PP1Genset, setPP1Genset] = useState([])
  const [PP1BoilerPW, setPP1BoilerPW] = useState([])
  const [PP1Kompressor, setPP1Kompressor] = useState([])
  const [PP1HWP, setPP1HWP] = useState([])
  const [PP1PUMPS, setPP1PUMPS] = useState([])
  const [PP1Lift, setPP1Lift] = useState([])
  const [PP1AC11, setPP1AC11] = useState([])
  const [PP1AC12, setPP1AC12] = useState([])
  const [PP1AC13, setPP1AC13] = useState([])
  const [PP1AC23, setPP1AC23] = useState([])
  const [SDP1Produksi, setSDP1Produksi] = useState([])
  const [SDP2Produksi, setSDP2Produksi] = useState([])
  const [PP2Hydrant, setPP2Hydrant] = useState([])
  const [PP2Puyer, setPP2Puyer] = useState([])
  const [PP2Fatigon, setPP2Fatigon] = useState([])
  const [PP2Mixagrib, setPP2Mixagrib] = useState([])
  const [PP2LabLt2, setPP2LabLt2] = useState([])
  const [PP2Fasilitas, setPP2Fasilitas] = useState([])
  const [PP2PackWH, setPP2PackWH] = useState([])
  const [LP2PRO11, setLP2PRO11] = useState([])
  const [LP2PRO12, setLP2PRO12] = useState([])
  const [LP2PRO13, setLP2PRO13] = useState([])
  const [LP2PRO23, setLP2PRO23] = useState([])
  const [LP2PRO31, setLP2PRO31] = useState([])
  const [LP2PRO41, setLP2PRO41] = useState([])
  const [LWP2H11, setLWP2H11] = useState([])
  const [PPLP2Mezz11, setPPLP2Mezz11] = useState([])
  const [PPLP1PosJaga1, setPPLP1PosJaga1] = useState([])
  const [PPLP1PosJaga2, setPPLP1PosJaga2] = useState([])
  const [PPLP1Workshop, setPPLP1Workshop] = useState([])
  const [PPLP1Koperasi, setPPLP1Koperasi] = useState([])
  const [GCPGenset, setGCPGenset] = useState([])
  const [SDPGenset, setSDPGenset] = useState([])
  const [PP1WWTP, setPP1WWTP] = useState([])
  const [PP1DumpWater, setPP1DumpWater] = useState([])
  const [PP1OfficeLt1, setPP1OfficeLt1] = useState([])
  const [PP1PumpitUtama, setPP1PumpitUtama] = useState([])
  const [PPChiller1, setPPChiller1] = useState([])
  const [PPChiller2, setPPChiller2] = useState([])
  const [PPChiller3, setPPChiller3] = useState([])

  useEffect(() => {
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    setWidth(bodyWidth);
    setHeight(bodyHeight);
  }, []);

  const fetchPowerSankey = async () => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/PowerSankey",
      {
        params: {
          start: startSankey,
          finish: finishSankey,
        }
      }
    );  
    const data = [];
    for (var i = 0; i < response.data.length; i++){
      setMVMDP (Math.floor(response.data[i].MVMDP))
      setLVMDP1 (Math.floor(response.data[i].LVMDP1))
      setLVMDP2 ( Math.floor(response.data[i].LVMDP2))
      setSolarPanel16( Math.floor(response.data[i].SolarPanel16))
      setSolarPanel712 (Math.floor(response.data[i].SolarPanel712))
      setSDP1Utility (Math.floor(response.data[i].SDP1Utility))
      setPPLP1UtilityLt2  (Math.floor(response.data[i].PPLP1UtilityLt2))
      setPP1Chiller  (Math.floor(response.data[i].PP1Chiller))
      setPPLP1UtilityLt1 ( Math.floor(response.data[i].PPLP1UtilityLt1))
      setPP1Genset  (Math.floor(response.data[i].PP1Genset))
      setPP1BoilerPW  (Math.floor(response.data[i].PP1BoilerPW))
      setPP1Kompressor  (Math.floor(response.data[i].PP1Kompressor))
      setPP1HWP ( Math.floor(response.data[i].PP1HWP))
      setPP1PUMPS  (Math.floor(response.data[i].PP1PUMPS))
      setPP1Lift  (Math.floor(response.data[i].PP1Lift))
      setPP1AC11  (Math.floor(response.data[i].PP1AC11))
      setPP1AC12  (Math.floor(response.data[i].PP1AC12))
      setPP1AC13  (Math.floor(response.data[i].PP1AC13))
      setPP1AC23 ( Math.floor(response.data[i].PP1AC23))
      setSDP1Produksi  (Math.floor(response.data[i].SDP1Produksi))
      setSDP2Produksi ( Math.floor(response.data[i].SDP2Produksi))
      setPP2Hydrant ( Math.floor(response.data[i].PP2Hydrant))
      setPP2Puyer  (Math.floor(response.data[i].PP2Puyer))
      setPP2Fatigon  (Math.floor(response.data[i].PP2Fatigon))
      setPP2Mixagrib  (Math.floor(response.data[i].PP2Mixagrib))
      setPP2LabLt2  (Math.floor(response.data[i].PP2LabLt2))
      setPP2Fasilitas  (Math.floor(response.data[i].PP2Fasilitas))
      setPP2PackWH  (Math.floor(response.data[i].PP2PackWH))
      setLP2PRO11  (Math.floor(response.data[i].LP2PRO11))
      setLP2PRO12  (Math.floor(response.data[i].LP2PRO12))
      setLP2PRO13  (Math.floor(response.data[i].LP2PRO13))
      setLP2PRO23  (Math.floor(response.data[i].LP2PRO23))
      setLP2PRO31  (Math.floor(response.data[i].LP2PRO31))
      setLP2PRO41  (Math.floor(response.data[i].LP2PRO41))
      setLWP2H11  (Math.floor(response.data[i].LWP2H11))
      setPPLP2Mezz11  (Math.floor(response.data[i].PPLP2Mezz11))
      setPPLP1PosJaga1  (Math.floor(response.data[i].PPLP1PosJaga1))
      setPPLP1PosJaga2  (Math.floor(response.data[i].PPLP1PosJaga2))
      setPPLP1Workshop ( Math.floor(response.data[i].PPLP1Workshop))
      setPPLP1Koperasi ( Math.floor(response.data[i].PPLP1Koperasi))
      setGCPGenset  (Math.floor(response.data[i].GCPGenset))
      setSDPGenset  (Math.floor(response.data[i].SDPGenset))
      setPP1WWTP  (Math.floor(response.data[i].PP1WWTP))
      setPP1DumpWater  (Math.floor(response.data[i].PP1DumpWater))
      setPP1OfficeLt1  (Math.floor(response.data[i].PP1OfficeLt1))
      setPP1PumpitUtama  (Math.floor(response.data[i].PP1PumpitUtama))
      setPPChiller1  (Math.floor(response.data[i].PPChiller1))
      setPPChiller2  (Math.floor(response.data[i].PPChiller2))
      setPPChiller3  (Math.floor(response.data[i].PPChiller3))
      }   
    }
    
    const supplylistrik = LVMDP1 + LVMDP2 + SolarPanel16 + SolarPanel712 + SDPGenset;
    
    const data = [
      ["From", "To", "Consumption (kWh)"],
      ["a","b",0],
    ]; 
    const data1 = [
      ["From", "To", "Consumption (%)"],
      ["a","b",0],
    ];

      if (LVMDP1 > 0 && LVMDP1 != null){
        var nilai = ['LVMDP1','Supply Listrik']
        nilai.push(LVMDP1)
        data.push(nilai)

        var list = ['LVMDP1','Supply Listrik']
        var persen = LVMDP1 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LVMDP2 > 0 && LVMDP2 != null){
        var nilai = ['LVMDP2','Supply Listrik']
        nilai.push(LVMDP2)
        data.push(nilai)

        var list = ['LVMDP2','Supply Listrik']
        var persen = LVMDP2 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (GCPGenset > 0 && GCPGenset != null){
        var nilai = ['GCP Genset','SPDP Genset']
        nilai.push(GCPGenset)
        data.push(nilai)

        var list = ['GCP Genset','SPDP Genset']
        var persen = GCPGenset / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SDPGenset > 0 && SDPGenset != null){
        var nilai = ['SPDP Genset','Supply Listrik']
        nilai.push(SDPGenset)
        data.push(nilai)

        var list = ['SPDP Genset','Supply Listrik']
        var persen = SDPGenset / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SolarPanel16 > 0 && SolarPanel16 != null){
        var nilai = ['Solar Panel1-6 ','Supply Listrik']
        nilai.push(SolarPanel16)
        data.push(nilai)

        var list = ['Solar Panel1-6 ','Supply Listrik']
        var persen = SolarPanel16 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SolarPanel712 > 0 && SolarPanel712 != null){
        var nilai = ['Solar Panel7-12 ','Supply Listrik']
        nilai.push(SolarPanel712)
        data.push(nilai)

        var list = ['Solar Panel7-12 ','Supply Listrik']
        var persen = SolarPanel712 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1Chiller > 0 && PP1Chiller != null){
        var nilai = ['Supply Listrik','PP1. Chiller']
        nilai.push(PP1Chiller)
        data.push(nilai)

        var list = ['Supply Listrik','PP1. Chiller']
        var persen = PP1Chiller / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SDP1Utility > 0 && SDP1Utility != null){
        var nilai = ['Supply Listrik','SDP.1 Utility']
        nilai.push(SDP1Utility)
        data.push(nilai)

        var list = ['Supply Listrik','SDP.1 Utility']
        var persen = SDP1Utility / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SDP1Produksi > 0 && SDP1Produksi != null){
        var nilai = ['Supply Listrik','SDP.1 Produksi']
        nilai.push(SDP1Produksi)
        data.push(nilai)

        var list = ['Supply Listrik','SDP.1 Produksi']
        var persen = SDP1Produksi / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (SDP2Produksi > 0 && SDP2Produksi != null){
        var nilai = ['Supply Listrik','SDP.2 Produksi']
        nilai.push(SDP2Produksi)
        data.push(nilai)

        var list = ['Supply Listrik','SDP.2 Produksi']
        var persen = SDP2Produksi / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      } 
      if (PP2Hydrant > 0 && PP2Hydrant != null){
        var nilai = ['Supply Listrik','PP.2 Hydrant']
        nilai.push(PP2Hydrant)
        data.push(nilai)

        var list = ['Supply Listrik','PP.2 Hydrant']
        var persen = PP2Hydrant / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPChiller1 > 0 && PPChiller1 != null){
        var nilai = ['PP1. Chiller','PP.1 Chiller 1']
        nilai.push(PPChiller1)
        data.push(nilai)

        var list = ['PP1. Chiller','PP.1 Chiller 1']
        var persen = PPChiller1 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPChiller2 > 0 && PPChiller2 != null){
        var nilai = ['PP1. Chiller','PP.1 Chiller 2']
        nilai.push(PPChiller2)
        data.push(nilai)

        var list = ['PP1. Chiller','PP.1 Chiller 2']
        var persen = PPChiller2 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPChiller3 > 0 && PPChiller3 != null){
        var nilai = ['PP1. Chiller','PP.1 Chiller 3']
        nilai.push(PPChiller3)
        data.push(nilai)

        var list = ['PP1. Chiller','PP.1 Chiller 3']
        var persen = PPChiller3 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1AC11 > 0 && PP1AC11 != null){
        var nilai = ['SDP.1 Produksi','PP.1 AC 1.1']
        nilai.push(PP1AC11)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 AC 1.1']
        var persen = PP1AC11 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1AC12 > 0 && PP1AC12 != null){
        var nilai = ['SDP.1 Produksi','PP.1 AC 1.2']
        nilai.push(PP1AC12)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 AC 1.2']
        var persen = PP1AC12 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1AC13 > 0 && PP1AC13 != null){
        var nilai = ['SDP.1 Produksi','PP.1 AC 1.3']
        nilai.push(PP1AC13)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 AC 1.3']
        var persen = PP1AC13 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1AC23 > 0 && PP1AC23 != null){
        var nilai = ['SDP.1 Produksi','PP.1 AC 2.3']
        nilai.push(PP1AC23)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 AC 2.3']
        var persen = PP1AC23 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1Lift > 0 && PP1Lift != null){
        var nilai = ['SDP.1 Produksi','PP.1 Lift']
        nilai.push(PP1Lift)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 Lift']
        var persen = PP1Lift / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1HWP > 0 && PP1HWP != null){
        var nilai = ['SDP.1 Produksi','PP.1 HWP']
        nilai.push(PP1HWP)
        data.push(nilai)

        var list = ['SDP.1 Produksi','PP.1 HWP']
        var persen = PP1HWP / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1Kompressor > 0 && PP1Kompressor != null){
        var nilai = ['SDP.1 Utility','PP.1 Kompressor']
        nilai.push(PP1Kompressor)
        data.push(nilai)

        var list = ['SDP.1 Utility','PP.1 Kompressor']
        var persen = PP1Kompressor / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1BoilerPW > 0 && PP1BoilerPW != null){
        var nilai = ['SDP.1 Utility','PP.1 Boiler & PW']
        nilai.push(PP1BoilerPW)
        data.push(nilai)

        var list = ['SDP.1 Utility','PP.1 Boiler & PW']
        var persen = PP1BoilerPW / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1UtilityLt1 > 0 && PPLP1UtilityLt1 != null){
        var nilai = ['SDP.1 Utility','PPLP.1 Utility Lt.1']
        nilai.push(PPLP1UtilityLt1)
        data.push(nilai)

        var list = ['SDP.1 Utility','PPLP.1 Utility Lt.1']
        var persen = PPLP1UtilityLt1 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1UtilityLt2 > 0 && PPLP1UtilityLt2 != null){
        var nilai = ['SDP.1 Utility','PPLP.1 Utility Lt.2']
        nilai.push(PPLP1UtilityLt2)
        data.push(nilai)

        var list = ['SDP.1 Utility','PPLP.1 Utility Lt.2']
        var persen = PPLP1UtilityLt2 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1PUMPS > 0 && PP1PUMPS != null){
        var nilai = ['SDP.1 Utility','PP.1 PUMPS']
        nilai.push(PP1PUMPS)
        data.push(nilai)

        var list = ['SDP.1 Utility','PP.1 PUMPS']
        var persen = PP1PUMPS / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1Genset > 0 && PP1Genset != null){
        var nilai = ['SDP.1 Utility','PP.1 Genset']
        nilai.push(PP1Genset)
        data.push(nilai)

        var list = ['SDP.1 Utility','PP.1 Genset']
        var persen = PP1Genset / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1PumpitUtama > 0 && PP1PumpitUtama != null){
        var nilai = ['SDP.2 Produksi','PP.1 Pumpit Utama']
        nilai.push(PP1PumpitUtama)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.1 Pumpit Utama']
        var persen = PP1PumpitUtama / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1OfficeLt1 > 0 && PP1OfficeLt1 != null){
        var nilai = ['SDP.2 Produksi','PP.1 Office Lt.1']
        nilai.push(PP1OfficeLt1)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.1 Office Lt.1']
        var persen = PP1OfficeLt1 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1DumpWater > 0 && PP1DumpWater != null){
        var nilai = ['SDP.2 Produksi','PP.1 Dumb Water']
        nilai.push(PP1DumpWater)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.1 Dumb Water']
        var persen = PP1DumpWater / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2Fasilitas > 0 && PP2Fasilitas != null){
        var nilai = ['SDP.2 Produksi','PP.2 Fasilitas']
        nilai.push(PP2Fasilitas)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Fasilitas']
        var persen = PP2Fasilitas / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1PosJaga1 > 0 && PPLP1PosJaga1 != null){
        var nilai = ['SDP.2 Produksi','PPLP.1 Pos Jaga 1']
        nilai.push(PPLP1PosJaga1)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PPLP.1 Pos Jaga 1']
        var persen = PPLP1PosJaga1 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1PosJaga2 > 0 && PPLP1PosJaga2 != null){
        var nilai = ['SDP.2 Produksi','PPLP.1 Pos Jaga 2']
        nilai.push(PPLP1PosJaga2)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PPLP.1 Pos Jaga 2']
        var persen = PPLP1PosJaga2 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1Workshop > 0 && PPLP1Workshop != null){
        var nilai = ['SDP.2 Produksi','PPLP.1 Workshop']
        nilai.push(PPLP1Workshop)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PPLP.1 Workshop']
        var persen = PPLP1Workshop / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP1Koperasi > 0 && PPLP1Koperasi != null){
        var nilai = ['SDP.2 Produksi','PPLP.1 Koperasi']
        nilai.push(PPLP1Koperasi)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PPLP.1 Koperasi']
        var persen = PPLP1Koperasi / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO11 > 0 && LP2PRO11 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 1.1']
        nilai.push(LP2PRO11)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 1.1']
        var persen = LP2PRO11 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO12 > 0 && LP2PRO12 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 1.2']
        nilai.push(LP2PRO12)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 1.2']
        var persen = LP2PRO12 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO13 > 0 && LP2PRO13 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 1.3']
        nilai.push(LP2PRO13)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 1.3']
        var persen = LP2PRO13 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO23 > 0 && LP2PRO23 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 2.3']
        nilai.push(LP2PRO23)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 2.3']
        var persen = LP2PRO23 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO31 > 0 && LP2PRO31 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 3.1']
        nilai.push(LP2PRO31)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 3.1']
        var persen = LP2PRO31 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LP2PRO41 > 0 && LP2PRO41 != null){
        var nilai = ['SDP.2 Produksi','LP.2 PRO 4.1']
        nilai.push(LP2PRO41)
        data.push(nilai)

        var list = ['SDP.2 Produksi','LP.2 PRO 4.1']
        var persen = LP2PRO41 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2PackWH > 0 && PP2PackWH != null){
        var nilai = ['SDP.2 Produksi','PP.2 Pack WH']
        nilai.push(PP2PackWH)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Pack WH']
        var persen = PP2PackWH / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2Mixagrib > 0 && PP2Mixagrib != null){
        var nilai = ['SDP.2 Produksi','PP.2 Mixagrib']
        nilai.push(PP2Mixagrib)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Mixagrib']
        var persen = PP2Mixagrib / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2Fatigon > 0 && PP2Fatigon != null){
        var nilai = ['SDP.2 Produksi','PP.2 Fatigon']
        nilai.push(PP2Fatigon)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Fatigon']
        var persen = PP2Fatigon / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2Puyer > 0 && PP2Puyer != null){
        var nilai = ['SDP.2 Produksi','PP.2 Puyer']
        nilai.push(PP2Puyer)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Puyer']
        var persen = PP2Puyer / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (LWP2H11 > 0 && LWP2H11 != null){
        var nilai = ['SDP.2 Produksi','PP.2 WH 1.1']
        nilai.push(LWP2H11)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 WH 1.1']
        var persen = LWP2H11 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP2LabLt2 > 0 && PP2LabLt2 != null){
        var nilai = ['SDP.2 Produksi','PP.2 Lab Lt.2']
        nilai.push(PP2LabLt2)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.2 Lab Lt.2']
        var persen = PP2LabLt2 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PP1WWTP > 0 && PP1WWTP != null){
        var nilai = ['SDP.2 Produksi','PP.1 WWTP']
        nilai.push(PP1WWTP)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PP.1 WWTP']
        var persen = PP1WWTP / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }
      if (PPLP2Mezz11 > 0 && PPLP2Mezz11 != null){
        var nilai = ['SDP.2 Produksi','PPLP.2 Mezz 1.1']
        nilai.push(PPLP2Mezz11)
        data.push(nilai)

        var list = ['SDP.2 Produksi','PPLP.2 Mezz 1.1']
        var persen = PPLP2Mezz11 / supplylistrik*100
        list.push(persen.toFixed(2))
        data1.push(list)
      }  ;
  const fetchDataDayly = async () => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/PowerDaily",
      {
        params: {
          area: powerArea,
          start: startDate,
          finish: finishDate,
        },
      }
    )
    if (powerArea === "cMT-Gedung-UTY_MVMDP_data") {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      })); 
    } else if (
      powerArea === "cMT-Gedung-UTY_LVMDP1_data" ||
      powerArea === "cMT-Gedung-UTY_LVMDP2_data" ||
      powerArea === "cMT-Gedung-UTY_SDP.1-Produksi_data"
    ) {
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

    setDailyPower(multipliedData);

    const totalY = multipliedData.reduce((sum, data) => sum + data.y, 0);
    const averageY = Math.ceil(totalY / multipliedData.length);

    setAvarageDaily(averageY);
    setTotalDaily(totalY);
  };

  const fetchDataMonthly = async () => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/PowerMonthly",
      {
        params: {
          area: areaMonth,
          start: startMonth,
          finish: finishMonth,
        },
      }
    ); 

    if (areaMonth === "cMT-Gedung-UTY_MVMDP_data") {
      var multipliedData1 = response.data.map((data) => ({
        y: Number(data.y),
        x: data.x,
      }));
    } else if (
      areaMonth === "cMT-Gedung-UTY_LVMDP1_data" ||
      areaMonth === "cMT-Gedung-UTY_LVMDP2_data" ||
      areaMonth === "cMT-Gedung-UTY_SDP.1-Produksi_data"
    ) {
      var multipliedData1 = response.data.map((data) => ({
        y: Number(data.y),
        x: data.x,
      }));
    } else {
      var multipliedData1 = response.data.map((data) => ({
        y: Number(data.y),
        x: data.x,
      }));
    }

    setMonthlyPowe(multipliedData1); 

    const totalY = multipliedData1.reduce((sum, data) => sum + data.y, 0);
    const averageY = Math.ceil(totalY / multipliedData1.length);
    setAvarageMonthly(averageY);
    setTotalMonthly(totalY);
  };

  const fetchSec = async () => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/getPowerSec",
      {
        params: {
          area: secArea,
          start: secStart,
          finish: secFinish,
        },
      }
    );
    let response2 = await axios.get(
      "http://10.126.15.124:8002/part/getavgpower",
      {
        params: {
          area: secArea,
          start: secStart,
          finish: secFinish,
        },
      }
    );

    const totalLL =
      Number(response2.data[0].RR) +
      Number(response2.data[0].SS) +
      Number(response2.data[0].TT);

    const totalLN =
      Number(response2.data[0].RN) +
      Number(response2.data[0].SN) +
      Number(response2.data[0].TN);

    const RRdata = (Number(response2.data[0].RR) / totalLL) * 100;
    const SSdata = (Number(response2.data[0].SS) / totalLL) * 100;
    const TTdata = (Number(response2.data[0].TT) / totalLL) * 100;

    const RNdata = (Number(response2.data[0].RN) / totalLN) * 100;
    const SNdata = (Number(response2.data[0].SN) / totalLN) * 100;
    const TNdata = (Number(response2.data[0].TN) / totalLN) * 100;

    // let response1 = await axios.get("http://10.126.15.124:8002/part/getRangeSet");

    setPercentRR(RRdata);
    setPercentSS(SSdata);
    setPercentTT(TTdata);
    setPercentRN(RNdata);
    setPercentSN(SNdata);
    setPercentTN(TNdata);
    if (secArea == "cMT-Gedung-UTY_MVMDP_Detik_data") {
      var multipliedData = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.freq.toFixed(2)),
        x: data.id,
      }));
      var multipliedData1 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoP.toFixed(2)),
        x: data.id,
      }));
      var multipliedData2 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoN.toFixed(2)),
        x: data.id,
      }));

      const maxFreq = Math.max(...response.data.map((item) => item.freq));
      const maxPtoP = Math.max(...response.data.map((item) => item.PtoP));
      const maxPtoN = Math.max(...response.data.map((item) => item.PtoN));
      const minFreq = Math.min(...response.data.map((item) => item.freq));
      const minPtoP = Math.min(...response.data.map((item) => item.PtoP));
      const minPtoN = Math.min(...response.data.map((item) => item.PtoN));
      const sumFreq = response.data.reduce(
        (total, item) => total + item.freq,
        0
      );
      const sumPtoP = response.data.reduce(
        (total, item) => total + item.PtoP,
        0
      );
      const sumPtoN = response.data.reduce(
        (total, item) => total + item.PtoN,
        0
      );
      const avgFreq = sumFreq / response.data.length;
      const avgPtoP = sumPtoP / response.data.length;
      const avgPtoN = sumPtoN / response.data.length;
      setdatamaxFreq(maxFreq.toFixed(2));
      setdatamaxPtoP(maxPtoP.toFixed(2));
      setdatamaxPtoN(maxPtoN.toFixed(2));
      setdataminFreq(minFreq.toFixed(2));
      setdataminPtoP(minPtoP.toFixed(2));
      setdataminPtoN(minPtoN.toFixed(2));
      setdataavgFreq(avgFreq.toFixed(2));
      setdataavgPtoP(avgPtoP.toFixed(2));
      setdataavgPtoN(avgPtoN.toFixed(2));
      settotalRR(Number(response2.data[0].RR).toFixed(2));
      settotalSS(Number(response2.data[0].SS).toFixed(2));
      settotalTT(Number(response2.data[0].TT).toFixed(2));
      settotalRN(Number(response2.data[0].RN).toFixed(2));
      settotalSN(Number(response2.data[0].SN).toFixed(2));
      settotalTN(Number(response2.data[0].TN).toFixed(2));
    } else {
      var multipliedData = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.freq.toFixed(2)) / 1000,
        x: data.id,
      }));
      var multipliedData1 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoP.toFixed(2)) / 100,
        x: data.id,
      }));
      var multipliedData2 = response.data.map((data) => ({
        label: data.datetime.slice(0, -5).replace("T", " "),
        y: Number(data.PtoN.toFixed(2)) / 100,
        x: data.id,
      }));

      var freqArrayMax = [];
      var freqArrayMin = [];

      // for (var i = 0; i <= response.data.length; i++) {
      //   freqArrayMax.push({
      //     y: response1.data[0].Freq_max,
      //     x: response.data[0].id + i,
      //   });
      //   freqArrayMin.push({
      //     y: response1.data[0].Freq_min,
      //     x: response.data[0].id + i,
      //   });
      // }

      setmaxSecFreq(freqArrayMax);
      setminSecFreq(freqArrayMin);

      // var multipliedData3 = response1.data.map((data) => ({
      //   y: Number(data.Freq_max),
      //   x: data.id,
      // }));
      const maxFreq = Math.max(...response.data.map((item) => item.freq));
      const maxPtoP = Math.max(...response.data.map((item) => item.PtoP));
      const maxPtoN = Math.max(...response.data.map((item) => item.PtoN));
      const minFreq = Math.min(...response.data.map((item) => item.freq));
      const minPtoP = Math.min(...response.data.map((item) => item.PtoP));
      const minPtoN = Math.min(...response.data.map((item) => item.PtoN));
      const sumFreq = response.data.reduce(
        (total, item) => total + item.freq,
        0
      );
      const sumPtoP = response.data.reduce(
        (total, item) => total + item.PtoP,
        0
      );
      const sumPtoN = response.data.reduce(
        (total, item) => total + item.PtoN,
        0
      );
      const avgFreq = sumFreq / response.data.length;
      const avgPtoP = sumPtoP / response.data.length;
      const avgPtoN = sumPtoN / response.data.length;
      setdatamaxFreq((maxFreq / 1000).toFixed(2));
      setdatamaxPtoP((maxPtoP / 100).toFixed(2));
      setdatamaxPtoN((maxPtoN / 100).toFixed(2));
      setdataminFreq((minFreq / 1000).toFixed(2));
      setdataminPtoP((minPtoP / 100).toFixed(2));
      setdataminPtoN((minPtoN / 100).toFixed(2));
      setdataavgFreq((avgFreq / 1000).toFixed(2));
      setdataavgPtoP((avgPtoP / 100).toFixed(2));
      setdataavgPtoN((avgPtoN / 100).toFixed(2));
      settotalRR((Number(response2.data[0].RR) / 100).toFixed(2));
      settotalSS((Number(response2.data[0].SS) / 100).toFixed(2));
      settotalTT((Number(response2.data[0].TT) / 100).toFixed(2));
      settotalRN((Number(response2.data[0].RN) / 100).toFixed(2));
      settotalSN((Number(response2.data[0].SN) / 100).toFixed(2));
      settotalTN((Number(response2.data[0].TN) / 100).toFixed(2));
    }

    setSecFreq(multipliedData);
    setSecPtP(multipliedData1);
    setSecPtN(multipliedData2);
  };

  let dateStart = (e) => {
    var dataInput = e.target.value;
    setStartDate(dataInput);
  };

  let dateFinish = (e) => {
    var dataInput = e.target.value;
    setFinishDate(dataInput);
  };

  let getPowerArea = (e) => {
    var dataInput = e.target.value;
    setPowerArea(dataInput);
  };

  let getStartMonth = (e) => {
    var dataInput = e.target.value;
    setStartMonth(dataInput);
  };
  let getFinishMonth = (e) => {
    var dataInput = e.target.value;
    setFinishMonth(dataInput);
  };
  let getAreaMonth = (e) => {
    var dataInput = e.target.value;
    setAreaMonth(dataInput);
  };

  let getSecArea = (e) => {
    var dataInput = e.target.value;
    setSecArea(dataInput);
  };
  let getSecStart = (e) => {
    var dataInput = e.target.value;
    let unixStart = Math.floor(new Date(dataInput).getTime() / 1000 + 25200);
    setSecStart(unixStart);
  };
  let getSecFinish = (e) => {
    var dataInput = e.target.value;
    let unixStart = Math.floor(new Date(dataInput).getTime() / 1000 + 25200);
    setSecFinish(unixStart);
  };

  let sankeyStart = (e) =>{
    var dataInput = e.target.value;
    setStartSankey(dataInput);
  };
  let sankeyFinish = (e) =>{
    var dataInput = e.target.value;
    setFinishSankey(dataInput);
  };

  const options = {
    theme: "light1",
    title: {
      text: "Daily Power",
    },
    subtitles: [
      {
        text: "kilo watt per hour",
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
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: dailyPower,
      },
    ],
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
  
  const options2 = {
    theme: "light2",
    title: {
      text: "Monthly Power",
    },
    subtitles: [
      {
        text: "kilo watt per hour",
      },
    ],
    axisY: {
      prefix: "",
    },
    axisX: {
      valueFormatString: "YYYY-MMM-DD",
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
        type: "splineArea",
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        xValueType: "dateTime",
        yValueType: "number",
        dataPoints: monthlyPower,
      },
    ],
  };

  const options3 = {
    theme: "light5",
    title: {
      text: "Phase to Netral",
    },
    subtitles: [
      {
        text: "Trend Volt",
      },
    ],
    axisY: {
      valueFormatString: "#,##0.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "Volt L-N",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secPtN,
      },
    ],
  };

  const options4 = {
    theme: "light3",
    title: {
      text: "Phase to Phase",
    },
    subtitles: [
      {
        text: "Trend Volt",
      },
    ],
    axisY: {
      valueFormatString: "#,##0.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        name: "Volt L-L",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secPtP,
      },
    ],
  };

  const options5 = {
    theme: "light2",
    title: {
      text: "Frequency",
    },
    subtitles: [
      {
        text: "Trend Frequency",
      },
    ],
    axisY: {
      valueFormatString: "##.###.##",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "Hz",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: secFreq,
      },
      // {
      //   type: "spline",
      //   name: "Set",
      //   showInLegend: true,
      //   xValueFormatString: "",
      //   yValueFormatString: "",
      //   dataPoints: maxSecFreq,
      // },
      // {
      //   type: "spline",
      //   name: "Set",
      //   showInLegend: true,
      //   xValueFormatString: "",
      //   yValueFormatString: "",
      //   dataPoints: minSecFreq,
      // },
    ],
  };

  const options6 = {
    theme: "light2",
    animationEnabled: true,
    // width: datawidth,
    // height: dataheight,

    title: {},
    subtitles: [
      {
        //text: `${oeeCalculation.oee.toFixed(2)}% OEE`,

        text: `Volt L-L`,
        verticalAlign: "center",

        fontSize: 30,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        //click: visitorsChartDrilldownHandler,

        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y} | {volt} V",
        yValueFormatString: "##.##'%'",

        dataPoints: [
          { name: "Line-R", y: percentRR, volt: totalRR },
          { name: "Line-S", y: percentSS, volt: totalSS },
          { name: "Line-T", y: percentTT, volt: totalTT },
        ],
      },
    ],
  };
  const options7 = {
    theme: "light2",
    animationEnabled: true,
    // width: datawidth,
    // height: dataheight,

    title: {},
    subtitles: [
      {
        //text: `${oeeCalculation.oee.toFixed(2)}% OEE`,

        text: `Volt L-N`,
        verticalAlign: "center",

        fontSize: 30,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        //click: visitorsChartDrilldownHandler,

        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y} | {volt} V",
        yValueFormatString: "##.##'%'",

        dataPoints: [
          { name: "Line-R", y: percentRN, volt: totalRN },
          { name: "Line-S", y: percentSN, volt: totalSN },
          { name: "Line-T", y: percentTN, volt: totalTN },
        ],
      },
    ],
  };

  const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
  '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

  const options8 = {
      sankey: {
        node: { nodePadding: 20,
                label: { fontSize: 16 },
              },

        link: {
          colorMode: 'gradient',
          colors: colors
        },
        
        
      }
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
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getPowerArea}>
            <option value="cMT-Gedung-UTY_MVMDP_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Inverter1-6_SP_data">
              Solar-Panel1-6
            </option>
            <option value="cMT-Gedung-UTY_Inverter7-12_SP_data">
              Solar-Panel7-12
            </option>
            <option value="cMT-Gedung-UTY_SDP.1-Utility_data">
              SDP.1-Utility
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data">
              PPLP.1-UtilityLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Chiller_data">
              PP.1-Chiller
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data">
              PPLP.1-UtilityLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Genset_data">PP.1-Genset</option>
            <option value="cMT-Gedung-UTY_PP.1-Boiler&PW_data">
              PP.1-Boiler & PW
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Kompressor_data">
              PP.1-Kompressor
            </option>
            <option value="cMT-Gedung-UTY_PP.1-HWP_data">PP.1-HWP</option>
            <option value="cMT-Gedung-UTY_PP.1-PUMPS_data">PP.1-PUMPS</option>
            <option value="cMT-Gedung-UTY_PP.1-Lift_data">PP.1-Lift</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.1_data">PP.1-AC1.1</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.2_data">PP.1-AC1.2</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.3_data">PP.1-AC1.3</option>
            <option value="cMT-Gedung-UTY_PP.1-AC2.3_data">PP.1-AC2.3</option>
            <option value="cMT-Gedung-UTY_SDP.1-Produksi_data">
              SDP.1-Produksi
            </option>
            <option value="cMT-Gedung-UTY_SDP.2-Produksi_data">
              SDP.2-Produksi
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Hydrant_data">
              PP.2-Hydrant.
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fatigon_data">
              PP.2-Fatigon
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Puyer_data">PP.2-Puyer</option>
            <option value="cMT-Gedung-UTY_PP.2-Mixagrib_data">
              PP.2-Mixagrib
            </option>
            <option value="cMT-Gedung-UTY_PP.2-LabLt.2_data">
              PP.2-LabLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fasilitas_data">
              PP.2-Fasilitas
            </option>
            <option value="cMT-Gedung-UTY_PP.2-PackWH_data">PP.2-PackWH</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.1_data">LP.2-PRO1.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.2_data">LP.2-PRO1.2</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.3_data">LP.2-PRO1.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO2.3_data">LP.2-PRO2.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO3.1_data">LP.2-PRO3.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO4.1_data">LP.2-PRO4.1</option>
            <option value="cMT-Gedung-UTY_LP.2WH1.1_data">LP.2-WH1.1</option>
            <option value="cMT-Gedung-UTY_LP.2MEZZ1.1_data">
              PPLP.2-Mezz1.1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga1_data">
              PPLP.1-PosJaga1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga2_data">
              PPLP.1-PosJaga2
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Workshop_data">
              PPLP.1-Workshop
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Koperasi_data">
              PPLP.1-Koperasi
            </option>
            <option value="cMT-Gedung-UTY_GCP_Genset_data">GCPGenset</option>
            <option value="cMT-Gedung-UTY_SDP_Genset_data">SDPGenset</option>
            <option value="cMT-Gedung-UTY_PP.1WWTP_data">PP.1-WWTP</option>
            <option value="cMT-Gedung-UTY_PP.2DumbWaiter_data">
              PP.1-DumbWaiter
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2OfficeLt1_data">
              PP.1-OfficeLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.2Pumpit_data">
              PP.1-PumpitUtama
            </option>
            <option value="cMT-Gedung-UTY_Chiller1_data">PPChiller1</option>
            <option value="cMT-Gedung-UTY_Chiller2_data">PPChiller2</option>
            <option value="cMT-Gedung-UTY_Chiller3_data">PPChiller3</option>
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
        <div>
          <h2>Finish Time</h2>
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
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchDataDayly()}
          >
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <div className="ml-16">Total = {totalDaily.toLocaleString()} Kwh</div>
          <div className="ml-16">
            Avarage = {avarageDaily.toLocaleString()} Kwh
          </div>
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
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getAreaMonth}>
            <option value="cMT-Gedung-UTY_MVMDP_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Inverter1-6_SP_data">
              Solar-Panel1-6
            </option>
            <option value="cMT-Gedung-UTY_Inverter7-12_SP_data">
              Solar-Panel7-12
            </option>
            <option value="cMT-Gedung-UTY_SDP.1-Utility_data">
              SDP.1-Utility
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data">
              PPLP.1-UtilityLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Chiller_data">
              PP.1-Chiller
            </option>
            <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data">
              PPLP.1-UtilityLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Genset_data">PP.1-Genset</option>
            <option value="cMT-Gedung-UTY_PP.1-Boiler&PW_data">
              PP.1-Boiler & PW
            </option>
            <option value="cMT-Gedung-UTY_PP.1-Kompressor_data">
              PP.1-Kompressor
            </option>
            <option value="cMT-Gedung-UTY_PP.1-HWP_data">PP.1-HWP</option>
            <option value="cMT-Gedung-UTY_PP.1-PUMPS_data">PP.1-PUMPS</option>
            <option value="cMT-Gedung-UTY_PP.1-Lift_data">PP.1-Lift</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.1_data">PP.1-AC1.1</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.2_data">PP.1-AC1.2</option>
            <option value="cMT-Gedung-UTY_PP.1-AC1.3_data">PP.1-AC1.3</option>
            <option value="cMT-Gedung-UTY_PP.1-AC2.3_data">PP.1-AC2.3</option>
            <option value="cMT-Gedung-UTY_SDP.1-Produksi_data">
              SDP.1-Produksi
            </option>
            <option value="cMT-Gedung-UTY_SDP.2-Produksi_data">
              SDP.2-Produksi
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Hydrant_data">
              PP.2-Hydrant.
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fatigon_data">
              PP.2-Fatigon
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Puyer_data">PP.2-Puyer</option>
            <option value="cMT-Gedung-UTY_PP.2-Mixagrib_data">
              PP.2-Mixagrib
            </option>
            <option value="cMT-Gedung-UTY_PP.2-LabLt.2_data">
              PP.2-LabLt.2
            </option>
            <option value="cMT-Gedung-UTY_PP.2-Fasilitas_data">
              PP.2-Fasilitas
            </option>
            <option value="cMT-Gedung-UTY_PP.2-PackWH_data">PP.2-PackWH</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.1_data">LP.2-PRO1.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.2_data">LP.2-PRO1.2</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO1.3_data">LP.2-PRO1.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO2.3_data">LP.2-PRO2.3</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO3.1_data">LP.2-PRO3.1</option>
            <option value="cMT-Gedung-UTY_LP.2-PRO4.1_data">LP.2-PRO4.1</option>
            <option value="cMT-Gedung-UTY_LP.2WH1.1_data">LP.2-WH1.1</option>
            <option value="cMT-Gedung-UTY_LP.2MEZZ1.1_data">
              PPLP.2-Mezz1.1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga1_data">
              PPLP.1-PosJaga1
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-PosJaga2_data">
              PPLP.1-PosJaga2
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Workshop_data">
              PPLP.1-Workshop
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2-Koperasi_data">
              PPLP.1-Koperasi
            </option>
            <option value="cMT-Gedung-UTY_GCP_Genset_data">GCPGenset</option>
            <option value="cMT-Gedung-UTY_SDP_Genset_data">SDPGenset</option>
            <option value="cMT-Gedung-UTY_PP.1WWTP_data">PP.1-WWTP</option>
            <option value="cMT-Gedung-UTY_PP.2DumbWaiter_data">
              PP.1-DumbWaiter
            </option>
            <option value="cMT-Gedung-UTY_PPLP.2OfficeLt1_data">
              PP.1-OfficeLt.1
            </option>
            <option value="cMT-Gedung-UTY_PP.2Pumpit_data">
              PP.1-PumpitUtama
            </option>
            <option value="cMT-Gedung-UTY_Chiller1_data">PPChiller1</option>
            <option value="cMT-Gedung-UTY_Chiller2_data">PPChiller2</option>
            <option value="cMT-Gedung-UTY_Chiller3_data">PPChiller3</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
                    onChange={getStartMonth}
                    placeholder="Select Date"
                    size="md"
                    type="month"
                />
        </div>
        <div>
          <h2>Month serch</h2>
          <Input
                    onChange={getFinishMonth}
                    placeholder="Select Date"
                    size="md"
                    type="month"
                />  
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchDataMonthly()}
          >
            Submit
          </Button>
        </div>
        <div className="mt-3">
          <div className="ml-16">
            Total = {totalMonthly.toLocaleString()} Kwh
          </div>
          <div className="ml-16">
            Avarage = {avarageMonthly.toLocaleString()} Kwh
          </div>
        </div>
      </Stack>
      <CanvasJSChart align="center" className="" options={options2} />

      <Stack
        className="flex flex-row justify-center mb-4 mt-4 "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getSecArea}>
            <option value="cMT-Gedung-UTY_MVMDP_Detik_data">MVMDP</option>
            <option value="cMT-Gedung-UTY_LVMDP1_Detik_data">LVMDP1</option>
            <option value="cMT-Gedung-UTY_LVMDP2_Detik_data">LVMDP2</option>
            <option value="cMT-Gedung-UTY_Mixagrip_Detik_data">Line 1</option>
            <option value="cMT-Gedung-UTY_Puyer_Detik_data">Line 2</option>
            <option value="cMT-Gedung-UTY_Fatigon_Detik_data">Line 3</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
            onChange={getSecStart}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <h2>Finish Time</h2>
          <Input
            onChange={getSecFinish}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => fetchSec()}
          >
            Submit
          </Button>
        </div>
      </Stack>
      <div className="flex justify-center font-bold text-4xl mt-10">
        Voltage Balance
      </div>
      <div className="flex flex-row mx-50 px-30 mt-2">
        <CanvasJSChart className="" options={options6} />
        <CanvasJSChart className="" options={options7} />
      </div>

      <div className="flex flex-row mt-10">
        <CanvasJSChart className="" options={options3} />
        <CanvasJSChart className="" options={options4} />
        <CanvasJSChart className="" options={options5} />
      </div>
      <div className="flex flex-row justify-around mt-4">
        <div className="flex flex-col">
          <p> Max L-N : {datamaxPtoN} V</p>
          <p> Min L-N : {dataminPtoN} V</p>
          <p> avg L-N : {dataavgPtoN} V</p>
        </div>
        <div className="flex flex-col">
          <p> Max L-L : {datamaxPtoP} V</p>
          <p> Min L-L : {dataminPtoP} V</p>
          <p> avg L-L : {dataavgPtoP} V</p>
        </div>
        <div className="flex flex-col">
          <p> Max Freq : {datamaxFreq} Hz</p>
          <p> Min Freq : {dataminFreq} Hz</p>
          <p> avg Freq : {dataavgFreq} Hz</p>
        </div>
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
                  onClick={() => fetchPowerSankey()}
              >
                  Submit
              </Button>
          </div>
        </Stack>
        <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Power Sankey Diagram </b></h1></div>
        <div align="center"><h3 style={{ fontSize: "1rem"}}><b>kWh</b></h3></div>
        <div align="center" className="flex flex-row justify-center mx-12 pb-10">
        <Chart
          chartType= "Sankey"
          width= "100%"
          height="1000px"
          data={data}
          options={options8}>
        </Chart>
        </div>
        <div align="center"><h1 style={{ fontSize: "2rem"}}><b>Power Sankey Diagram (%)</b></h1></div>
        <div align="center"><h3 style={{ fontSize: "1rem"}}><b>Total Supply Listrik : {supplylistrik} Kwh</b></h3></div>
        <div align="center" className="flex flex-row justify-center mx-12 pb-10">
        <Chart
          chartType="Sankey"
          width= "100%"
          height="1000px"
          data={data1}
          options={options8}>
        </Chart>
        </div>
    </div>
  );
}
