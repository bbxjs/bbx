import React from 'react';
import { State, connect, Use } from '../../../src';

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

  change(count) {
    this.setState({
      count,
    });
  }

  didStateUpdate() {
    console.log('state update');
  }
}

const countState = new CountState();
const countState2 = new CountState();


const A = () => <div>
  <Use state={[countState, countState2]}>
    {() => <h1>
      {countState.state.count}
      {countState2.state.count}
      <input value={countState.state.count} onChange={e => countState.change(parseInt(e.target.value))}/>
    </h1>}
  </Use>
</div>;

const C = () => <div>
  <Use state={[countState, countState2]}>
    {() => <h1>
      {countState.state.count}
      {countState2.state.count}
    </h1>}
  </Use>
</div>;

@connect(countState)
class B extends React.Component {
  render() {
    return <div>
      {countState.state.count}

      <button onClick={() => countState.add()}>+</button>
      <button onClick={() => countState.minus()}>-</button>

      <button onClick={() => countState2.add()}>+</button>
      <button onClick={() => countState2.minus()}>-</button>
    
      {countState.state.count % 2 ? <C /> : null}
    </div>
  }
}


class App extends React.Component {
  render() {
    console.log('render')
    return <div>
      <A />
      <B />
    </div>;
  }
}

export default App;
