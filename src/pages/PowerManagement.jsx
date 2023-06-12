import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Button, ButtonGroup, Stack, Input, Select } from "@chakra-ui/react";
import axios from "axios";

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

  const fetchDataDayly = async () => {
    let response = await axios.get(
      "http://10.126.15.124:8002/part/getpowerdata",
      {
        params: {
          area: powerArea,
          start: startDate,
          finish: finishDate,
        },
      }
    );

    if (powerArea === "MVMDP") {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y * 1000000,
        x: data.x,
      }));
    } else if (
      powerArea === "LVMDP1" ||
      powerArea === "LVMDP2" ||
      powerArea === "SDP.1-Produksi"
    ) {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y * 1000,
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
      "http://10.126.15.124:8002/part/getpowermonthly",
      {
        params: {
          area: areaMonth,
          start: startMonth,
          finish: finishMonth,
        },
      }
    );

    if (areaMonth === "MVMDP") {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: data.y * 1000000,
      }));
    } else if (
      areaMonth === "LVMDP1" ||
      areaMonth === "LVMDP2" ||
      areaMonth === "SDP.1-Produksi"
    ) {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: data.y * 1000,
      }));
    } else {
      var multipliedData1 = response.data.map((data) => ({
        label: data.label,
        y: data.y,
      }));
    }

    setMonthlyPowe(multipliedData1);

    const totalY = multipliedData1.reduce((sum, data) => sum + data.y, 0);
    const averageY = Math.ceil(totalY / multipliedData1.length);
    setAvarageMonthly(averageY);
    setTotalMonthly(totalY);
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
        dataPoints: monthlyPower,
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
        dataPoints: monthlyPower,
      },
    ],
  };

  const options5 = {
    theme: "light4",
    title: {
      text: "Frequency",
    },
    subtitles: [
      {
        text: "Trend Frequency",
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
        dataPoints: monthlyPower,
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
          <h2>Panel</h2>
          <Select placeholder="Select Panel" onChange={getPowerArea}>
            <option value="MVMDP">MVMDP</option>
            <option value="LVMDP1">LVMDP1</option>
            <option value="LVMDP2">LVMDP2</option>
            <option value="Solar-Panel1-6">Solar-Panel1-6</option>
            <option value="Solar-Panel7-12">Solar-Panel7-12</option>
            <option value="SDP.1-Utility">SDP.1-Utility</option>
            <option value="PPLP.1-UtilityLt.2">PPLP.1-UtilityLt.2</option>
            <option value="PP.1-Chiller">PP.1-Chiller</option>
            <option value="PPLP.1-UtilityLt.1">PPLP.1-UtilityLt.1</option>
            <option value="PP.1-Genset">PP.1-Genset</option>
            <option value="PP.1-Boiler & PW">PP.1-Boiler & PW</option>
            <option value="PP.1-Kompressor">PP.1-Kompressor</option>
            <option value="PP.1-HWP">PP.1-HWP</option>
            <option value="PP.1-PUMPS">PP.1-PUMPS</option>
            <option value="PP.1-Lift">PP.1-Lift</option>
            <option value="PP.1-AC1.1">PP.1-AC1.1</option>
            <option value="PP.1-AC1.2">PP.1-AC1.2</option>
            <option value="PP.1-AC1.3">PP.1-AC1.3</option>
            <option value="PP.1-AC2.3">PP.1-AC2.3</option>
            <option value="SDP.1-Produksi">SDP.1-Produksi</option>
            <option value="SDP.2-Produksi">SDP.2-Produksi</option>
            <option value="PP.2-Hydrant.">PP.2-Hydrant.</option>
            <option value="PP.2-Fatigon">PP.2-Fatigon</option>
            <option value="PP.2-Puyer">PP.2-Puyer</option>
            <option value="PP.2-Mixagrib">PP.2-Mixagrib</option>
            <option value="PP.2-LabLt.2">PP.2-LabLt.2</option>
            <option value="PP.2-Fasilitas">PP.2-Fasilitas</option>
            <option value="PP.2-PackWH">PP.2-PackWH</option>
            <option value="LP.2-PRO1.1">LP.2-PRO1.1</option>
            <option value="LP.2-PRO1.2">LP.2-PRO1.2</option>
            <option value="LP.2-PRO1.3">LP.2-PRO1.3</option>
            <option value="LP.2-PRO2.3">LP.2-PRO2.3</option>
            <option value="LP.2-PRO3.1">LP.2-PRO3.1</option>
            <option value="LP.2-PRO4.1">LP.2-PRO4.1</option>
            <option value="LP.2-WH1.1">LP.2-WH1.1</option>
            <option value="PPLP.2-Mezz1.1">PPLP.2-Mezz1.1</option>
            <option value="PPLP.1-PosJaga1">PPLP.1-PosJaga1</option>
            <option value="PPLP.1-PosJaga2">PPLP.1-PosJaga2</option>
            <option value="PPLP.1-Workshop">PPLP.1-Workshop</option>
            <option value="PPLP.1-Koperasi">PPLP.1-Koperasi</option>
            <option value="GCPGenset">GCPGenset</option>
            <option value="SDPGenset">SDPGenset</option>
            <option value="PP.1-WWTP">PP.1-WWTP</option>
            <option value="PP.1-DumbWaiter">PP.1-DumbWaiter</option>
            <option value="PP.1-OfficeLt.1">PP.1-OfficeLt.1</option>
            <option value="PP.1-PumpitUtama">PP.1-PumpitUtama</option>
            <option value="PPChiller1">PPChiller1</option>
            <option value="PPChiller2">PPChiller2</option>
            <option value="PPChiller3">PPChiller3</option>
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
            <option value="MVMDP">MVMDP</option>
            <option value="LVMDP1">LVMDP1</option>
            <option value="LVMDP2">LVMDP2</option>
            <option value="Solar-Panel1-6">Solar-Panel1-6</option>
            <option value="Solar-Panel7-12">Solar-Panel7-12</option>
            <option value="SDP.1-Utility">SDP.1-Utility</option>
            <option value="PPLP.1-UtilityLt.2">PPLP.1-UtilityLt.2</option>
            <option value="PP.1-Chiller">PP.1-Chiller</option>
            <option value="PPLP.1-UtilityLt.1">PPLP.1-UtilityLt.1</option>
            <option value="PP.1-Genset">PP.1-Genset</option>
            <option value="PP.1-Boiler & PW">PP.1-Boiler & PW</option>
            <option value="PP.1-Kompressor">PP.1-Kompressor</option>
            <option value="PP.1-HWP">PP.1-HWP</option>
            <option value="PP.1-PUMPS">PP.1-PUMPS</option>
            <option value="PP.1-Lift">PP.1-Lift</option>
            <option value="PP.1-AC1.1">PP.1-AC1.1</option>
            <option value="PP.1-AC1.2">PP.1-AC1.2</option>
            <option value="PP.1-AC1.3">PP.1-AC1.3</option>
            <option value="PP.1-AC2.3">PP.1-AC2.3</option>
            <option value="SDP.1-Produksi">SDP.1-Produksi</option>
            <option value="SDP.2-Produksi">SDP.2-Produksi</option>
            <option value="PP.2-Hydrant.">PP.2-Hydrant.</option>
            <option value="PP.2-Fatigon">PP.2-Fatigon</option>
            <option value="PP.2-Puyer">PP.2-Puyer</option>
            <option value="PP.2-Mixagrib">PP.2-Mixagrib</option>
            <option value="PP.2-LabLt.2">PP.2-LabLt.2</option>
            <option value="PP.2-Fasilitas">PP.2-Fasilitas</option>
            <option value="PP.2-PackWH">PP.2-PackWH</option>
            <option value="LP.2-PRO1.1">LP.2-PRO1.1</option>
            <option value="LP.2-PRO1.2">LP.2-PRO1.2</option>
            <option value="LP.2-PRO1.3">LP.2-PRO1.3</option>
            <option value="LP.2-PRO2.3">LP.2-PRO2.3</option>
            <option value="LP.2-PRO3.1">LP.2-PRO3.1</option>
            <option value="LP.2-PRO4.1">LP.2-PRO4.1</option>
            <option value="LP.2-WH1.1">LP.2-WH1.1</option>
            <option value="PPLP.2-Mezz1.1">PPLP.2-Mezz1.1</option>
            <option value="PPLP.1-PosJaga1">PPLP.1-PosJaga1</option>
            <option value="PPLP.1-PosJaga2">PPLP.1-PosJaga2</option>
            <option value="PPLP.1-Workshop">PPLP.1-Workshop</option>
            <option value="PPLP.1-Koperasi">PPLP.1-Koperasi</option>
            <option value="GCPGenset">GCPGenset</option>
            <option value="SDPGenset">SDPGenset</option>
            <option value="PP.1-WWTP">PP.1-WWTP</option>
            <option value="PP.1-DumbWaiter">PP.1-DumbWaiter</option>
            <option value="PP.1-OfficeLt.1">PP.1-OfficeLt.1</option>
            <option value="PP.1-PumpitUtama">PP.1-PumpitUtama</option>
            <option value="PPChiller1">PPChiller1</option>
            <option value="PPChiller2">PPChiller2</option>
            <option value="PPChiller3">PPChiller3</option>
          </Select>
        </div>
        <div>
          <h2>Month serch</h2>
          <Select placeholder="Select Mounth" onChange={getStartMonth}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Agu</option>
            <option value="9">Sep</option>
            <option value="10">Okt</option>
            <option value="11">Nov</option>
            <option value="12">Des</option>
          </Select>
        </div>
        <div>
          <h2>Month serch</h2>
          <Select placeholder="Select Mounth" onChange={getFinishMonth}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Agu</option>
            <option value="9">Sep</option>
            <option value="10">Okt</option>
            <option value="11">Nov</option>
            <option value="12">Des</option>
          </Select>
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
      <CanvasJSChart className="" options={options2} />

      <Stack
        className="flex flex-row justify-center mb-4 mt-4 "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>Panel</h2>
          <Select placeholder="Select Panel">
            <option value="MVMDP">MVMDP</option>
            <option value="LVMDP1">LVMDP1</option>
            <option value="LVMDP2">LVMDP2</option>
          </Select>
        </div>
        <div>
          <h2>Start Time</h2>
          <Input
     
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <h2>Finish Time</h2>
          <Input
 
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
            //onClick={() => fetchDataDayly()}
          >
            Submit
          </Button>
        </div>

      </Stack>

      <div className="flex flex-row mt-10">
        <CanvasJSChart className="" options={options3} />
        <CanvasJSChart className="" options={options4} />
        <CanvasJSChart className="" options={options5} />
      </div>
    </div>
  );
}
