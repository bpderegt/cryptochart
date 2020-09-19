import React from 'react';
import { Line } from 'react-chartjs-2';


// deconstruct props -brian
const ChartView = (props) => {
  // deconstruct props -brian
  // ex: const { dates, prices } = this.props;
  // let or const -brian
  var data = {
    labels: props.dates,
    datasets: [
      {
        label: 'BTC',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: props.prices
      }
    ]
  }
  return (
    <div>
      <Line
        data={data}
        // seems like we could build this external to the actual component -brian
        options={{
          title: {
            display: true,
            text: 'Bitcoin Prices',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }}
      />
    </div>
  )
};

export default ChartView;