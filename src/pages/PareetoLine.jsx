import React, { useEffect, useState, Component } from "react";
import { useSelector } from "react-redux";
import ParetoChart from "pareto-chart";
import axios from "axios";

function ParetoLine() {
  const [data1, setData] = useState();
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
    //   data1[0].total,
    //   data1[1].total,
    //   data1[2].total,
    //   data1[3].total
    // );
    // console.log(dataParetoSaka);
    // paretoSetData(dataParetoSaka);

    let response = await axios.get("http://10.126.15.135:8001/part/pareto");

    //setData(response.data);

    setline1(Number(response.data[0].y));
    setline2(Number(response.data[1].y));
    setline3(Number(response.data[2].y));
    setline4(Number(response.data[3].y));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-20">
      <ParetoChart
        width={3}
        height={1}
        lineLabel="Cumulative percentage"
        data={{
          "Saka Farma Plant": {
            "Line 1": line1,
            "Line 2": line2,
            "Line 3": line3,
            "Line 4": line4,
          },
        }}
      />
    </div>
  );
}

export default ParetoLine;
