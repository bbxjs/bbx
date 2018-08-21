import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { State, connect } from '../src';

Enzyme.configure({ adapter: new Adapter() });


describe('bbx connect', () => {
  test('connect', async () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }

      getUser() {
        this.setState({
          name: 'lily',
          age: '1',
        });
      }
    }
    const data = new Data();

    @connect(data)
    class App extends React.Component {
      render() {
        return <div>{data.state.name} {data.state.age}</div>;
      }
    }

    expect(shallow(<App />).html()).toEqual('<div> </div>');

    data.getUser();

    expect(shallow(<App />).html()).toEqual('<div>lily 1</div>');
  });

  test('connect multiple state', async () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }

      getUser() {
        this.setState({
          name: 'lily',
          age: '1',
        });
      }
    }

    class Data2 extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }

      getUser() {
        this.setState({
          name: 'lily2',
          age: '2',
        });
      }
    }
    const data = new Data();
    const data2 = new Data2();

    @connect(data)
    class App extends React.Component {
      render() {
        return <div>{data.state.name} {data.state.age} {data2.state.name} {data2.state.age}</div>;
      }
    }

    expect(shallow(<App />).html()).toEqual('<div>   </div>');

    data.getUser();
    data2.getUser();

    expect(shallow(<App />).html()).toEqual('<div>lily 1 lily2 2</div>');
  });


  test.only('connect PureComponent', async () => {
    class Data extends State {}
    const data = new Data();

    class App extends React.PureComponent {
      getUser() {}

      render() {
        return <div>1</div>;
      }
    }

    expect(() => connect(data)(App)).toThrow(new Error('bbx found that you are using "connect" and the PureComponent is passed, don\'t connect a PureComponent.'));
  });
});
