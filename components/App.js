class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '00',
      seconds: '00',
      miliseconds: '00'
    };
  }

  render() {
    return (
      <div>
        <button>start</button>
        <button>stop</button>
        <div>
          {this.state.minutes}:{this.state.seconds}:{this.state.miliseconds}
        </div>
        <button>reset</button>
        <button>save</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
