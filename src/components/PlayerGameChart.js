import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

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
      <h3 style={{textAlign: 'center'}} className="mt-5">Player Activity Stats
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
      <div>&nbsp;</div>
      <Doughnut data={state.dataDoughnut} options={{ responsive: true }} />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </MDBContainer>
    
  );
}

export default PlayerGameChart
