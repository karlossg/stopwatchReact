class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    }
  }

  pad0(value) {
    let result = value.toString()
    if (result.length < 2) {
      result = '0' + result
    }
    return result
  }

  format(times) {
    console.log(times)
    return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`
  }

  render() {
    return (
      <div>
        <button>start</button>
        <button>stop</button>
        <div>{this.format(this.state)}</div>
        <button>reset</button>
        <button>save</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
