import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { State, Use } from '../src';

Enzyme.configure({ adapter: new Adapter() });


describe.only('bbx Use', () => {
  test('Use', async () => {
    class Data extends State {
      constructor(name, age) {
        super();
        this.state = {
          name,
          age,
        };
      }
    }
    const render = jest.fn();
    const data = new Data('lily', 1);
    const data2 = new Data('lily2', 2);

    class App extends React.Component {
      state = {
        test: false,
      }

      render() {
        return (
          <div>
            <Use state={this.state.test ? data2 : data}>
              {
                () => {
                  render();
                  // eslint-disable-next-line
                  return <div>{data.state.name}{data.state.age},{data2.state.name}{data2.state.age}</div>;
                }
              }
            </Use>
          </div>
        );
      }
    }
    const wrapper = mount(<App />);
    expect(render.mock.calls.length).toBe(1);
    expect(wrapper.html()).toBe('<div><div>lily1,lily22</div></div>');
    data.setState({ age: 2 });
    expect(render.mock.calls.length).toBe(2);
    expect(wrapper.html()).toBe('<div><div>lily2,lily22</div></div>');
    wrapper.setState({ test: true });
    expect(render.mock.calls.length).toBe(3);
    data2.setState({ age: 3 });
    expect(render.mock.calls.length).toBe(4);
    expect(wrapper.html()).toBe('<div><div>lily2,lily23</div></div>');
    data.setState({ age: 3 });
    expect(render.mock.calls.length).toBe(4);
    expect(wrapper.html()).toBe('<div><div>lily2,lily23</div></div>');
    data2.setState({ age: 4 });
    expect(render.mock.calls.length).toBe(5);
    expect(wrapper.html()).toBe('<div><div>lily3,lily24</div></div>');
  });

  test('Use multiple state', async () => {
    class Data extends State {
      constructor(name, age) {
        super();
        this.state = {
          name,
          age,
        };
      }
    }

    const data = new Data('lily', 1);
    const data2 = new Data('lily2', 2);

    class App extends React.Component {
      state = {}

      render() {
        return (
          <div>
            <Use state={[data, data2]}>
              {
                // eslint-disable-next-line
                () => <div>{data.state.name}{data.state.age},{data2.state.name}{data2.state.age}</div>
              }
            </Use>
          </div>
        );
      }
    }
    const wrapper = mount(<App />);
    expect(wrapper.html()).toBe('<div><div>lily1,lily22</div></div>');
    data.setState({ age: 2 });
    expect(wrapper.html()).toBe('<div><div>lily2,lily22</div></div>');
    data2.setState({ age: 3 });
    expect(wrapper.html()).toBe('<div><div>lily2,lily23</div></div>');
  });
});
