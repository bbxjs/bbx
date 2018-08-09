import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { State, connect, update } from '../src';

Enzyme.configure({ adapter: new Adapter() });


describe('bbx update', () => {
  test('not update', async () => {
    class Data extends State {}
    const data = new Data();
    const render = jest.fn();

    @connect(data)
    @update(() => ([data.state.name]))
    class A extends React.Component {
      render() {
        render();
        return <div>{data.state.name}</div>;
      }
    }

    class App extends React.Component {
      state = {}

      render() {
        return <A />;
      }
    }

    const wrapper = mount(<App />);
    wrapper.setState({});

    expect(render.mock.calls.length).toBe(1);
  });

  test('update by state', async () => {
    class Data extends State {
      state = {}
    }
    const data = new Data();
    const render = jest.fn();

    @connect(data)
    @update(() => ([data.state.name]))
    class A extends React.Component {
      render() {
        render();
        return <div>{data.state.name}</div>;
      }
    }

    class App extends React.Component {
      state = {}

      render() {
        return <A />;
      }
    }
    mount(<App />);
    data.setState({
      name: 'lily',
    });
    expect(render.mock.calls.length).toBe(2);
  });

  test('update by props', async () => {
    class Data extends State {}
    const data = new Data();
    const render = jest.fn();

    @connect(data)
    @update(() => ([data.state.name]))
    class A extends React.Component {
      render() {
        render();
        return <div>{data.state.name}</div>;
      }
    }

    class App extends React.Component {
      state = {
        name: '',
      }

      render() {
        const { name } = this.state;
        return <A name={name} />;
      }
    }
    const wrapper = mount(<App />);
    wrapper.setState({ name: 'lily' });

    expect(render.mock.calls.length).toBe(2);
  });
});
