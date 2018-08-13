import { State, loading } from '../src';

describe('bbx loading', () => {
  test('loading', (done) => {
    class Data extends State {
      @loading
      async getUser() {
        await new Promise(r => setTimeout(r, 20));
        this.setState();
      }
    }
    const data = new Data();
    data.getUser().then(() => {
      expect(data.state.getUserLoading).toBe(false);
      done();
    });
    expect(data.state.getUserLoading).toBe(true);
  });
});
