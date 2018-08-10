import { State, latest } from '../src';

describe.only('bbx latest', () => {
  test('latest', (done) => {
    class Data extends State {
      state = {
        count: 'default',
      }

      @latest
      async getUser(count) {
        await new Promise(r => setTimeout(r, 0));
        this.setState({ count });
      }
    }
    const data = new Data();
    data.getUser(0);
    data.getUser(1);
    setTimeout(() => {
      expect(data.state.count).toBe(1);
      done();
    }, 20);
  });
});
