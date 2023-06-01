import React, { useEffect, Component, useState } from "react";
import axios from "axios";
import CanvasJSReact from "../canvasjs.react";
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Input,
  Select,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  Box,
  Text,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import { getDateProd } from "../features/part/prodSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LandingProduction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateValue = useSelector((state) => state.prod.date);

  const [opeVar, setOpeVar] = useState([{ Ava: 0, Per: 0, Qua: 0, oee: 0 }]);
  const [dateGlobal, setDate] = useState();
  const [datawidth, setWidth] = useState();
  const [dataheight, setHeight] = useState();

  useEffect(() => {
    setDate(dateValue);
    fetchOPE(dateValue);
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    setWidth(bodyWidth);
    setHeight(bodyHeight);
  }, [dateValue]);

  let opeCalculation =
    (opeVar[0].Ava / 100) * (opeVar[0].Per / 100) * (opeVar[0].Qua / 100) * 100;

  const fetchOPE = async (date) => {
    let response = await axios.get("http://10.126.15.135:8002/part/ope", {
      params: {
        date: date,
      },
    });
    setOpeVar(response.data);
  };

  var visitorsChartDrilldownHandler = (e) => {
    let chartClick = e.dataPoint.name;
    if (chartClick == "Avability") {
      navigate("/avabilityope");
    }
  };

  var visitorsCentralClick = (e) => {
    //console.log(e);
  };

  const getDate = (e) => {
    var dataInput = e.target.value;

    dispatch(getDateProd(dataInput));
  };

  const headerHendeler = (e) => {
    navigate("/oeeLine");
  };

  const options = {
    theme: "light2",
    animationEnabled: true,
    width: datawidth,
    height: dataheight,

    title: {},
    subtitles: [
      {
        //text: `${oeeCalculation.oee.toFixed(2)}% OEE`,

        text: `${opeCalculation.toFixed(2)}% OEE`,
        verticalAlign: "center",

        fontSize: 48,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        click: visitorsChartDrilldownHandler,

        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",

        dataPoints: [
          { name: "Avability", y: opeVar[0].Ava },
          { name: "Performance", y: opeVar[0].Per },
          { name: "Quality", y: opeVar[0].Qua },
        ],
      },
    ],
  };

  return (
    <div class="flex flex-col  gap-x-6 gap-y-8 sm:grid-cols-6 p-4">
      <div class="flex justify-center">
        <div className="mr-10">
          <h2>Year serch</h2>
          <Select>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Select>
        </div>
        <div>
          <h2>Month serch</h2>
          <Select onChange={getDate} value={dateValue}>
            <option value="0">All</option>
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
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => headerHendeler()}
          class="text-center text-5xl font-bold cursor-pointer"
        >
          Overall Plant Effectiveness
        </h1>

        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}

export default LandingProduction;
