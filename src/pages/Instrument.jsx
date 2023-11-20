import React, { useEffect, Component, useState } from "react";
import CanvasJSReact from "../canvasjs.react";

import {
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
} from "@chakra-ui/react";
import Axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Instrument() {
  const [dataInstrument, setDataInstrument] = useState([]);
  const [inputText, setInputText] = useState("");
  const [submitText, setSubmitText] = useState("");
  const [switchAllData, setSwitchAllData] = useState(false);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [hardnessData, setHardnessData] = useState([]);
  const [thicknessData, setThicknessData] = useState([]);
  const [diameterData, setDiameterData] = useState([]);
  const [stringData1, setStringData1new] = useState("")
  const [stringData2, setStringData2new] = useState("")
  const [stringData3,setStringData3new] = useState("")
  const [stringData4, setStringData4new] = useState("")
  const [stringData5, setStringData5new] = useState("")


  const fetchData = async () => {
    let response = await Axios.get("http://10.126.15.124:8002/part/instrument");
    setDataInstrument(response.data);
  };


  let switchAll = (e) => {
    alert("Membuka Semua data mengakibatkan web menjadi lambat");
    setSwitchAllData(true);
  };
  let hidenAll = (e) => {
    setSwitchAllData(false);
  };

  let inputHendeler = (e) => {
    var dataInput = e.target.value;
    setInputText(dataInput);
  };

  let clickSubmit = async () => {
    setSubmitText(inputText);
    let data = { nobatch: `${submitText}` };
    let hardness = await Axios.post(
      "http://10.126.15.124:8002/part/hardness",
      data
    );

    var result1 = [];
    for (var i = 0; i < hardness.data.length; i++) {
      var obj1 = {
        x: i,
        y: Number(hardness.data[i].y),
      };
      result1.push(obj1);
    }

    setHardnessData(result1);

    let thickness = await Axios.post(
      "http://10.126.15.124:8002/part/thickness",
      data
    );
    var result2 = [];
    for (var i = 0; i < thickness.data.length; i++) {
      var obj2 = {
        x: i,
        y: Number(thickness.data[i].y),
      };
      result2.push(obj2);
    }

    setThicknessData(result2);

    let diameter = await Axios.post(
      "http://10.126.15.124:8002/part/diameter",
      data
    );
    var result3 = [];
    for (var i = 0; i < diameter.data.length; i++) {
      var obj3 = {
        x: i,
        y: Number(diameter.data[i].y),
      };
      result3.push(obj3);
    }

    setDiameterData(result3);
  };

  const backeupFilter = () => {
    const filterData1 = dataInstrument.filter((el) => {
      if (submitText == "" && switchAllData == false) {
        return null;
      }
      if (switchAllData == true && submitText == "") {
        return el;
      }
      if (switchAllData == true && !submitText == "") {
        return el.nobatch.includes(submitText);
      }
    });
    setDataToFilter(filterData1)
    console.log(filterData1);
  }


  const renderInstrumentList = () => {

    const filterData = dataInstrument.filter((el) => {
      if (submitText == "" && switchAllData == false) {
        return null;
      }
      if (switchAllData == true && submitText == "") {
        return el;
      }
      if (switchAllData == true && !submitText == "") {
        return el.nobatch.includes(submitText);
      }
    });
    console.log(filterData);
    return filterData.map((instrument) => {
      return (
        <Tr>
          <Td>{instrument.operator}</Td>
          <Td>{instrument.produk}</Td>
          <Td>{instrument.nobatch}</Td>
          <Td>{instrument.date}</Td>
          <Td>{instrument.time}</Td>
          <Td>{instrument.notest}</Td>
          <Td
            className={
              Number(instrument.thickness) <
                Number(instrument.R_thickness_min) ||
              Number(instrument.thickness) > Number(instrument.R_thickness_max)
                ? "bg-red-200"
                : "bg-blue-200"
            }
          >
            {instrument.thickness}
          </Td>
          <Td
            className={
              Number(instrument.diameter) < Number(instrument.R_diameter_min)
                ? "bg-red-200"
                : "bg-blue-200"
            }
          >
            {instrument.diameter}
          </Td>
          <Td
            className={
              Number(instrument.hardness) < Number(instrument.R_hardness_max) ||
              Number(instrument.hardness) > Number(instrument.R_hardness_min)
                ? "bg-red-200"
                : "bg-blue-200"
            }
          >
            {instrument.hardness}
          </Td>
          <Td>{instrument.R_thickness_min}</Td>
          <Td>{instrument.R_thickness_max}</Td>
          <Td>{instrument.R_diameter_min}</Td>
          <Td>{instrument.R_hardness_max}</Td>
          <Td>{instrument.R_hardness_min}</Td>

          {/* IIni masih kebalik antara mix dan max dari hardness */}
        </Tr>
      );
    });

   
  };

  useEffect(() => {
 

    const fetchDataFilter = async () => {
      await   fetchData();
      backeupFilter()
    }
    fetchDataFilter()

    RenderDisition()
  
  
  }, [dataToFilter]);
  //==============================DISITION MAKING=============================================

const RenderDisition = async() => {


  const makeDecision = (record) => {
    console.log(record);
    const hardnessParse = parseFloat(record.hardness);
    const thicknessParse = parseFloat(record.thickness);

    const hardness_minParse = parseFloat(record.R_hardness_min);
    const thickness_minParse = parseFloat(record.R_thickness_min);

    const hardness_maxParse = parseFloat(record.R_hardness_max);
    const thickness_maxParse = parseFloat(record.thickness_max);

    let decision = "Data memenuhi syarat referensi";

    if (hardnessParse < hardness_maxParse) {
      decision =
        "Data tidak memenuhi syarat referensi: Hardness terlalu rendah.";
    } else if (hardnessParse > hardness_minParse) {
      decision =
        "Data tidak memenuhi syarat referensi: Hardness terlalu tinggi.";
    }

    if (thicknessParse < thickness_minParse) {
      decision =
        "Data tidak memenuhi syarat referensi: Thickness terlalu kecil.";
    } else if (thicknessParse > thickness_maxParse) {
      decision =
        "Data tidak memenuhi syarat referensi: Thickness terlalu besar.";
    }

    return decision;
  };

  const penyimpanganCounts = {
    "Hardness terlalu rendah": 0,
    "Hardness terlalu tinggi": 0,
    "Thickness terlalu kecil": 0,
    "Thickness terlalu besar": 0,
  };

  const keputusanData = [];

  const hardnessValues = [];
  const thicknessValues = [];
  const diameterValues =[]

  const ambildataDesetin = (data) => {
    setStringData5new(data)
  }

console.log(dataToFilter);
  dataToFilter.forEach((record) => {
    const decision = makeDecision(record);
    keputusanData.push({ id: record.id, decision });
    ambildataDesetin(decision)
    // Memeriksa alasan penyimpangan dan meningkatkan hitungan yang sesuai
    Object.keys(penyimpanganCounts).forEach((reason) => {
      if (decision.includes(reason)) {
        penyimpanganCounts[reason] += 1;
      }
    });
  

    // Menambahkan nilai hardness dan thickness yang memenuhi syarat
    if (!decision.includes("Hardness terlalu rendah")) {
      hardnessValues.push(parseFloat(record.hardness));
      diameterValues.push(parseFloat(record.diameter))
    }
    if (!decision.includes("Thickness terlalu kecil")) {
      thicknessValues.push(parseFloat(record.thickness));
      diameterValues.push(parseFloat(record.diameter))
    }
  });

  const totalTablet = dataToFilter.length;
  const presentasePenyimpangan =
    (Object.values(penyimpanganCounts).reduce((acc, val) => acc + val, 0) /
      totalTablet) *
    100;

  function calculateMean(arr) {
    const sum = arr.reduce((acc, current) => acc + current, 0);

    return sum / arr.length;
  }


  const dataPushDesicition = (data1,data2,data3,data4) => {
    setStringData1new(data1)
    setStringData2new(data2)
    setStringData3new(data3)
    setStringData4new(data4)

  }

  const describe = {
    "Avarage hardness": calculateMean(hardnessValues).toFixed(2),
    "Avarage thickness": calculateMean(thicknessValues).toFixed(2),
    "Avarage diameter" : calculateMean(diameterValues).toFixed(2),
  };



  var string1data = JSON.stringify(describe)
  var sring2data = `Total tablet yang tidak memenuhi syarat: ${Object.values(
    penyimpanganCounts
  ).reduce((acc, val) => acc + val, 0)}`
  var string3data = `Presentase penyimpangan: ${presentasePenyimpangan.toFixed(2)}%`
  var string4data = ""

  dataPushDesicition(string1data,sring2data,string3data,string4data)
  const mostCommonReason = Object.keys(penyimpanganCounts).reduce((a, b) =>
    penyimpanganCounts[a] > penyimpanganCounts[b] ? a : b
  );

  if (
    Object.values(penyimpanganCounts).reduce((acc, val) => acc + val, 0) === 0
  ) {
    string4data = "Semua data memenuhi syarat.";
  } else {
    string4data =
      `Parameter yang paling banyak menyebabkan penyimpangan: ${mostCommonReason}`
    
  }

}
 


  
  //=============================////////////////=============================================


  const options = {
    theme: "light2",
    title: {
      text: "HARDNESS TESTER",
    },
    subtitles: [
      {
        text: "instrument production",
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
        type: "spline",
        name: "Thickness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: thicknessData,
      },
      {
        type: "spline",
        name: "Diameter",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: diameterData,
      },
      {
        type: "spline",
        name: "Hardness",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: hardnessData,
      },
    ],
  };
  //console.log(hardnessData);

  return (
    <div>
      <CanvasJSChart options={options} />
      <br />
      <div
        className="flex flex-row justify-center"
        direction="row"
        spacing={4}
        align="center"
      >
        <div className="main">
          <h1>Search Betch</h1>
          <div className="search">
            <input
              onChange={inputHendeler}
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              className=" mr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <br />
          <Button
            className="ml-4"
            colorScheme="gray"
            onClick={() => clickSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="flex flex-row ml-4 ">
        <div className="flex-1 mt-20">
        <div>
        <br />
        <Button className="ml-4" colorScheme="blue" onClick={() => switchAll()}>
          Show All Data
        </Button>
        <Button className="ml-4" colorScheme="red" onClick={() => hidenAll()}>
          Hiden All Data
        </Button>
      </div>
        </div>
        {stringData5 ? (
  stringData5 === "Data memenuhi syarat referensi" ? (
    <div className="inline-block p-3 bg-green-100 rounded-md mr-4">
      <p className="text-2xl font-bold">Machine Learning Analytical</p>
      <br />
      <p>{stringData1}</p>
      <p>{stringData2}</p>
      <p>{stringData3}</p>
      <p>{stringData4}</p>
      <p className="font-bold">"Tablet lolos" {stringData5}</p>
     
    </div>
  ) : (
    <div className="inline-block p-3 bg-red-100 rounded-md mr-4">
      <p className="text-2xl font-bold">Machine Learning Analytical</p>
      <br />
      <p>{stringData1}</p>
      <p>{stringData2}</p>
      <p>{stringData3}</p>
      <p>{stringData4}</p>
      <p>{stringData5}</p>
      <p className="font-bold">Untuk tindak lanjut Hubungi EXT. 401, atau pastikan parameter mesin</p>
    </div>
  )
) : (
  <div className="inline-block p-2 bg-green-100 mb-12 mr-10">
    <p className="text-2xl font-bold">Machine Learning Analytical</p>
    <p>Saya siap menganalisa data anda</p>
  </div>
)}

    
        
      </div>

      
      

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Operator</Th>
              <Th>Product</Th>
              <Th>No.Batch</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>No.Test</Th>
              <Th>Thickness</Th>
              <Th>Diameter</Th>
              <Th>Hardness</Th>
              <Th>Ref. Thickness min</Th>
              <Th>Ref. Thickness max</Th>
              <Th>Ref. Diameter </Th>
              <Th>Ref. Hardness min</Th>
              <Th>Ref. Hardness max</Th>
            </Tr>
          </Thead>
          <Tbody>{renderInstrumentList()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Instrument;
