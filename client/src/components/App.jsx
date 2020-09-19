import React from 'react';
import axios from 'axios';
import ChartView from './ChartView.jsx';
import DateForm from './DateForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2010-07-17',
      endDate: '',
      dates: [],
      prices: []
    };
    // no binding of methods -brian
  }

  setTodayDate() {
    // avoid single letter variable names -brian
    // let or const -brian
    var d = new Date();
    var today = d.toJSON().substring(0, 10)
    this.setState({ endDate: today }, () => {
      // once you know this is working, drop all console.logs -brian
      console.log('endDate set to today');
      this.getBitcoinData();
    })
  }

  setNewDates(newStart, newEnd) {
    this.setState({ startDate: newStart, endDate: newEnd }, () => {
      // once you know this is working, drop all console.logs -brian
      console.log('new dates set');
      this.getBitcoinData();
    });
  }

  getBitcoinData() {
    axios.get(`/bitcoinData`, {
      params: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    })
      .then((res) => {
        this.processData(res.data)
      })
      .catch((err) => {
        console.error('error getting bitcoin data: ', err)
      });
  }

  processData(data) {
    // let or const -brian
    var dateArr = [];
    var priceArr = [];
    // let or const -brian
    for (var key in data) {
      dateArr.push(key);
      priceArr.push(data[key]);
    }
    this.setState({ dates: dateArr, prices: priceArr }, () => {
      // once you know this is working, drop all console.logs -brian
      console.log('dates & prices have been populated');
    })
  }

  componentDidMount() {
    this.setTodayDate();
  };

  render() {
    // deconstruct state -brian
    // ex: const { dates, prices } = this.state;
    return (
      <div>
        <ChartView dates={this.state.dates} prices={this.state.prices} />
        <br />
        <DateForm setDates={this.setNewDates.bind(this)} />
      </div>
    )
  };
}

export default App;
