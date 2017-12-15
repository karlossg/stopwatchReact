const FormattedClockwatch = props => {
  return (
    <div>
      {pad0(props.time.minutes)}:{pad0(props.time.seconds)}:{pad0(Math.floor(props.time.miliseconds))}
    </div>
  );
};

const pad0 = value => {
  let result = value;
  return result.length < 2 ? (result = '0' + result) : result;
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
          miliseconds: prevState.data.miliseconds + 1
        }
      };
    });
  };

  updateMinutes = () => {
    this.setState(prevState => {
      return {
        data: {
          minutes: prevState.data.minutes + 1,
          seconds: prevState.data.seconds,
          miliseconds: prevState.data.miliseconds
        }
      };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <button>stop</button>
        <FormattedClockwatch time={this.state.data} />
        <button>reset</button>
        <button>save</button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Clockwatch />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
