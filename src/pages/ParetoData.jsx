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
              "Dificult parking": 40,
              "Rude sales person": 13,
              "Poor lighting": 10,
              "Confusing layout": 27,
              "Limmited sizes": 15,
              "Certificate error": 20,
              "Certificate missing": 70,
              "Invoice error": 10,
              "Packaging error": 5,
              "Wrong quantity": 3,
            },
            "Line 2 ": {
              "Certificate error": 20,
              "Certificate missing": 40,
              "Invoice error": 10,
              "Packaging error": 5,
              "Wrong quantity": 3,
              Others: 2,
            },
            "Line 3": {
              Tests: 20,
              Codification: 40,
              Release: 10,
              Analysis: 5,
              Planning: 15,
            },
            "Line 4 ": {
              "Confusing layout": 27,
              "Limmited sizes": 15,
              "Certificate error": 20,
              "Certificate missing": 70,
              "Invoice error": 10,
            },
          }}
        />
      </div>
    );
  }
}

export default Pareto;
