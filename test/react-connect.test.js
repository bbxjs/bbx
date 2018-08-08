import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { State, connect } from '../src';

Enzyme.configure({ adapter: new Adapter() });


describe.only('bbx connect', () => {
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
          age: '1'
        });
      }
    }
    const data = new Data();

    @connect(data)
    class App extends React.Component {
      render() {
        return <div>{data.state.name} {data.state.age}</div>
      }
    }

    expect(shallow(<App />).html()).toEqual('<div> </div>');
    
    data.getUser();
    
    expect(shallow(<App />).html()).toEqual('<div>lily 1</div>')
  });

});
