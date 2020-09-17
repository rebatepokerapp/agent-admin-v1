import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function ChartFiguresPerWeek({ totalperday }) {

  let day1=0;
  let day2=0;
  let day3=0;
  let day4=0;
  let day5=0;
  let day6=0;
  let day7=0;

  if(totalperday){
    totalperday.forEach( row => {
      if(row._id.day === 2){
        day1=row.total;
      } else if(row._id.day === 3){
        day2=row.total;
      } else if(row._id.day === 4){
        day3=row.total;
      } else if(row._id.day === 5){
        day4=row.total;
      } else if(row._id.day === 6){
        day5=row.total;
      } else if(row._id.day === 7){
        day6=row.total;
      } else if(row._id.day === 1){
        day7=row.total;
      }
    });
  }

  const data = [
    createData('Monday', day1),
    createData('Tuesday', day2),
    createData('Wednesday', day3),
    createData('Thursday', day4),
    createData('Friday', day5),
    createData('Saturday', day6),
    createData('Sunday', day7)
  ];

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke="#333333" />
          <YAxis stroke="#009900">
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: '#009900' }}
            >
              Rake Profit ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#FFA900" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}