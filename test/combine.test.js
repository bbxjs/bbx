import { State, combine } from '../src';

describe('bbx combine', () => {
  test('combine', async () => {
    const array = [];
    class Data1 extends State {
      willStateUpdate() {
        array.push(1);
      }
    }
    class Data2 extends State {
      willStateUpdate() {
        array.push(2);
      }
    }
    class Data extends combine(Data1, Data2) {}
    const data = new Data();
    data.setState({});
    expect(array).toEqual([1, 2]);
  });
});
