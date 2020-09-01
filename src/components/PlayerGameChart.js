import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { colors } from "@material-ui/core";

const PlayerGameChart = ({data}) => {
const state = {
    dataDoughnut: {
      labels: ["Play", "Won", "Lost"],
      datasets: [
        {
          data: [data.play, data.won, data.lost],
          backgroundColor: ["#666666", "#669933", "#FFA900"],
          hoverBackgroundColor: [
            "#999999",
            "#99cc33",
            "#FFCC00"
          ]
        }
      ]
    }
  }
  return (
    <MDBContainer>
      <h3 className="mt-5">Poker Game Stats</h3>
      <Doughnut data={state.dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
  );
}

export default PlayerGameChart
