import React, { useEffect, useRef } from "react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AvabilityOPE() {
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const [avabilityCM1, setAvabilityCM1] = useState(1);

  const dateValue = useSelector((state) => state.prod.date);
  const dataLine1 = avabilityCM1.toFixed(2);
  const dataPointsAva = [
    {
      indexLabelFontColor: "black",
      indexLabel: String(dataLine1) + "%",
      label: "Line 1",
      y: avabilityCM1,
    },
    { label: "Line 2", y: 0 },
    { label: "Line 3", y: 0 },
    { label: "Line 4", y: 0 },
  ];

  useEffect(() => {
    fetchAvaLine(dateValue);
  });

  const fetchAvaLine = async (date) => {
    let response = await axios.get("http://10.126.15.124:8002/part/avaline", {
      params: {
        date: date,
      },
    });

    setAvabilityCM1(response.data[0].Ava1);
  };

  useEffect(() => {
    createPareto();
  }, []);

  const backPage = () => {
    navigate("/OPE");
  };

  var visitorsChartDrilldownHandler = (e) => {
    let chartClick = e.dataPoint.label;
    if (chartClick == "Line 1") {
      navigate("/avabilitmachine");
    }
  };

  const createPareto = () => {
    var dps = [];
    var chart = chartRef.current;
    var yValue,
      yTotal = 0,
      yPercent = 0;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++)
      yTotal += chart.data[0].dataPoints[i].y;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
      yValue = chart.data[0].dataPoints[i].y;
      yPercent += (yValue / yTotal) * 100;
      dps.push({ label: chart.data[0].dataPoints[i].label, y: yPercent });
    }
    chart.addTo("data", {
      type: "line",
      yValueFormatString: "0.##" % "",
      dataPoints: dps,
    });
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
    chart.axisY2[0].set("maximum", 100);
  };

  const options = {
    theme: "light2",
    // height: 800,
    title: {
      text: "Avability Line",
    },

    axisY: {
      title: "Data in (%)",
      lineColor: "#4F81BC",
      tickColor: "#4F81BC",
      labelFontColor: "#4F81BC",
    },
    data: [
      {
        click: visitorsChartDrilldownHandler,
        type: "column",
        dataPoints: dataPointsAva,
      },
    ],
  };

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />

        <CanvasJSChart
          options={options}
          onRef={(ref) => (chartRef.current = ref)}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
      <br />
      <div>
        <Button className="ml-4" colorScheme="red" onClick={() => backPage()}>
          Back
        </Button>
      </div>
    </>
  );
}

export default AvabilityOPE;
