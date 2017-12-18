class Clockwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: [],
      data: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
  }

  start = () => {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  step = () => {
    if (!this.state.running) return;
    this.calculate();
  };

  calculate = () => {
    this.updateMiliseconds();
    if (this.state.data.miliseconds >= 100) {
      this.updateSeconds();
    }
    if (this.state.data.seconds >= 60) {
      this.updateMinutes();
    }
  };

  updateMiliseconds = () => {
    this.setState(prevState => {
      return {
        data: {
          minutes: prevState.data.minutes,
          seconds: prevState.data.seconds,
          miliseconds: prevState.data.miliseconds + 1
        }
      };
    });
  };

  updateSeconds = () => {
    this.setState(prevState => {
      return {
        data: {
          minutes: prevState.data.minutes,
          seconds: prevState.data.seconds + 1,
          miliseconds: 0
        }
      };
    });
  };

  updateMinutes = () => {
    this.setState(prevState => {
      return {
        data: {
          minutes: prevState.data.minutes + 1,
          seconds: 0,
          miliseconds: prevState.data.miliseconds
        }
      };
    });
  };

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  };

  reset = () => {
    this.setState({
      data: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  };

  save = () => {
    const time = `${pad0(this.state.data.minutes)}:${pad0(this.state.data.seconds)}:${pad0(
      Math.floor(this.state.data.miliseconds)
    )}`;

    this.setState(prevState => {
      return {
        times: this.state.times.concat([time])
      };
    });
  };

  clear = () => {
    this.setState(prevState => {
      return {
        times: []
      };
    });
  };

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.start}>start</button>
          <button onClick={this.stop}>stop</button>
        </div>
        <FormattedClockwatch className="stopwatch" time={this.state.data} />
        <div>
          <button onClick={this.reset}>reset</button>
          <button onClick={this.save}>save</button>
        </div>
        <TimeList times={this.state.times} clear={this.clear} />
      </div>
    );
  }
}

const pad0 = value => {
  const result = value.toString();
  return result.length < 2 ? '0' + result : result;
};

const FormattedClockwatch = props => {
  return (
    <div>
      {pad0(props.time.minutes)}:{pad0(props.time.seconds)}:{pad0(Math.floor(props.time.miliseconds))}
    </div>
  );
};

const TimeList = props => {
  const times = props.times;

  return (
    <div>
      <ul>{times.map(time => <li>{time}</li>)}</ul>
      {times.length > 0 && <button onClick={props.clear}>clear</button>}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Clockwatch />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
