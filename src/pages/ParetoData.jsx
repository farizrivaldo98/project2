import { useEffect, useState, Component } from "react";
import ParetoChart from "../lib/ParetoChart/node_modules/pareto-chart/";
import axios from "axios";

function Pareto() {
  const [dataLine1, setLine1] = useState({});
  const [dataLine2, setLine2] = useState({});
  const [dataLine3, setLine3] = useState({});
  const [dataLine4, setLine4] = useState({});

  const [granulasi1, setGranulasi1] = useState();
  const [tableting1, setTableting1] = useState();
  const [striping1, setStriiping1] = useState();
  const [mixing1, setMixing1] = useState();
  const [CC1, setCC1] = useState();
  const [CC2, setCC2] = useState();
  const [CM1, setCM1] = useState();
  const [CM2, setCM2] = useState();
  const [CM3, setCM3] = useState();
  const [CM4, setCM4] = useState();
  const [CM5, setCM5] = useState();

  const [granulasi2, setGranulasi2] = useState();
  const [tableting2, setTableting2] = useState();
  const [botling2, setBotling2] = useState();

  const [granulasi3, setGranulasi3] = useState();
  const [tableting3, setTableting3] = useState();
  const [coating3, setCoating3] = useState();
  const [sortir3, setSortir3] = useState();
  const [striping3, setStriiping3] = useState();
  const [mixing3, setMixing3] = useState();

  const fetchData = async () => {
    let response1 = await axios.get("http://localhost:8001/part/line1");
    var result1 = {};
    for (var i = 0; i < response1.data.length; i++) {
      result1[response1.data[i].Mesin] = Number(response1.data[i].Line1);
    }
    setLine1(result1);

    let response2 = await axios.get("http://localhost:8001/part/line2");
    var result2 = {};
    for (var i = 0; i < response2.data.length; i++) {
      result2[response2.data[i].Mesin] = Number(response2.data[i].Line2);
    }
    setLine2(result2);

    let response3 = await axios.get("http://localhost:8001/part/line3");
    var result3 = {};
    for (var i = 0; i < response3.data.length; i++) {
      result3[response3.data[i].Mesin] = Number(response3.data[i].Line3);
    }
    setLine3(result3);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-20">
      <ParetoChart
        width={40}
        height={10}
        lineLabel="Cumulative percentage"
        data={{
          "Line 1": dataLine1,
          "Line 2": dataLine2,
          "Line 3": dataLine3,
          "Line 4": {},
        }}
      />
    </div>
  );
}

export default Pareto;
