import { State, loading, latest } from '../src';

describe('bbx latest', () => {
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

  test('latest loading', (done) => {
    class Data extends State {
      state = {
        count: 'default',
      }

      @latest
      @loading
      async getUser(count, timer) {
        await new Promise(r => setTimeout(r, timer));
        this.setState({ count });
      }
    }
    const data = new Data();
    data.getUser(0, 10).then(() => {
      expect(data.state.getUserLoading).toBe(true);
    });
    data.getUser(1, 200).then(() => {
      expect(data.state.getUserLoading).toBe(false);
      done();
    });
    expect(data.state.getUserLoading).toBe(true);
  });

  test('loading latest', (done) => {
    class Data extends State {
      state = {
        count: 'default',
      }

      @loading
      @latest
      async getUser(count, timer) {
        await new Promise(r => setTimeout(r, timer));
        this.setState({ count });
      }
    }
    const data = new Data();
    data.getUser(0, 10).then(() => {
      expect(data.state.getUserLoading).toBe(false);
    });
    data.getUser(1, 200).then(() => {
      expect(data.state.getUserLoading).toBe(false);
      done();
    });
    expect(data.state.getUserLoading).toBe(true);
  });
});
