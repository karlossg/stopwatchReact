class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      display: display,
      data: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
  }

  start() {
    if (!this.state.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  format(times) {
    return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
  }

  render() {
    return (
      <div>
        <button>start</button>
        <button>stop</button>
        <div>{this.format(this.state.data)}</div>
        <button>reset</button>
        <button>save</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
