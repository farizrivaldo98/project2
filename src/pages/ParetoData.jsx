import React, { Component } from "react";

import ParetoChart from "../lib/ParetoChart/node_modules/pareto-chart/";

class Pareto extends Component {
  render() {
    return (
      <div class="p-20">
        <ParetoChart
          width={40}
          height={10}
          lineLabel="Cumulative percentage"
          data={{
            Line1: {
              "Granulasi 1": 40,
              "Tableting 1": 13,
              "Striping 1": 10,
              "Final Mixing 1": 27,
              "CC 1": 15,
              "CC 2": 20,
              "CM 1": 70,
              "CM 2": 10,
              "CM 3 ": 5,
              "CM 4": 3,
              "CM 5": 3,
            },
            "Line 2 ": {
              "Granulasi 2": 20,
              "Tableting 2": 40,
              "Botling 2": 10,
            },
            "Line 3": {
              "Granulasi 3": 40,
              "Tableting 3": 13,
              "Final Mixing 1": 27,
              "Coating 3": 13,
              "Sortir 3": 13,
              "Striping 3": 10,
            },
            "Line 4 ": {},
          }}
        />
      </div>
    );
  }
}

export default Pareto;
