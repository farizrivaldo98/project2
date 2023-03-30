import React, { useEffect, useState, Component } from "react";
import { useSelector } from "react-redux";
import ParetoChart from "pareto-chart";
import axios from "axios";

function ParetoLine() {
  const [data, setData] = useState();
  const [paretoData, paretoSetData] = useState();
  const [line1, setline1] = useState();
  const [line2, setline2] = useState();
  const [line3, setline3] = useState();
  const [line4, setline4] = useState();

  const fetchData = async () => {
    // class sakaFarmaPlant {
    //   constructor(Line1, Line2, Line3, Line4) {
    //     this.Line1 = Line1;
    //     this.Line2 = Line2;
    //     this.Line3 = Line3;
    //     this.Line4 = Line4;
    //   }
    // }
    // const dataParetoSaka = new sakaFarmaPlant(
    //   data[0].total,
    //   data[1].total,
    //   data[2].total,
    //   data[3].total
    // );
    // console.log(dataParetoSaka);

    let response = await axios.get("http://localhost:8001/part/pareto");

    setData(response.data);
    console.log(data);

    setline1(data[0].total);
    setline2(data[1].total);
    setline3(data[2].total);
    setline4(data[3].total);

    console.log(line1, line2, line3, line4);
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
          "Saka Farma Plant": {
            "Line 1": 40,
            "Line 2": 30,
            "Line 3": 10,
            "Line 4": 27,
          },
        }}
      />
      {line1},{line2},{line3},{line4},
    </div>
  );
}

export default ParetoLine;
