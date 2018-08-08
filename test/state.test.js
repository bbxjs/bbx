import { State } from '../src';

describe('state', () => {
  test('base', async () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: '',
        };
      }
      willUpdate(nextState) {
        expect(nextState).toEqual({
          name: 'lily',
          age: '1'
        });
      }
      async getUser() {
        await new Promise(r => setTimeout(r, 10));
        this.setState({
          name: 'lily',
          age: '1'
        });
      }
      shouldUpdate(nextState) {
        expect(nextState).toEqual({
          name: 'lily',
          age: '1'
        });
        return true;
      }
      didUpdate(prevState) {
        expect(prevState).toEqual({
          name: '',
          age: ''
        });
      }
    }
    const data = new Data();
    expect(data.state).toEqual({
      name: '',
      age: '',
    });
    await data.getUser();
  });


  test('shouldUpdate', () => {
    class Data extends State {
      constructor() {
        super();
        this.state = {
          name: '',
          age: ''
        }
      }
      willUpdate(nextState) {
        expect(nextState).toEqual({
          age: '1'
        });
      }
      getUser() {
        this.setState({
          age: '1'
        });
      }
      shouldUpdate(nextState) {
        expect(nextState).toEqual({
          age: '1'
        });
        return false;
      }
      didUpdate(prevState) {
        throw new Error('will not be called')
      }
    } 
    const data = new Data();
    data.getUser();
  });
});
