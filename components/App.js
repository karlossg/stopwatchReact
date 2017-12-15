const FormattedClockwatch = props => {
  return (
    <div>
      {pad0(props.time.minutes)}:{pad0(props.time.seconds)}:{pad0(Math.floor(props.time.miliseconds))}
    </div>
  );
};

const pad0 = value => {
  let result = value.toString();

  return result.length < 2 ? '0' + result : result;
};

class Clockwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
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

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>
        <FormattedClockwatch time={this.state.data} />
        <button onClick={this.reset}>reset</button>
        <button>save</button>
      </div>
    );
  }
}

class TimeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: []
    };
  }

  render() {
    return (
      <div>
        <p> Times Saved: </p>
        <ul />
      </div>
    );
  }
}

const App = () => {
  return (
    <div>
      <Clockwatch />
      <TimeList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
