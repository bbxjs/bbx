import React from 'react';
import { State, connect } from '../../../src';

class CountState extends State {
  state = {
    count: 0,
  }

  add() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  minus() {
    this.setState({
      count: this.state.count - 1,
    });
  }
}

const countState = new CountState();

@connect(countState)
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{countState.state.count}</h1>
        <button onClick={() => countState.add()}>+</button>
        <button onClick={() => countState.minus()}>-</button>
      </div>
    );
  }
}

export default App;
