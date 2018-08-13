import { State, combine } from '../src';

describe('bbx combine', () => {
  test('combine', () => {
    const willMethodCall = jest.fn();
    const shouldMethodCall = jest.fn();
    const didMethodCall = jest.fn();
    const willStateUpdate = jest.fn();
    @combine({
      willStateUpdate(nextState) {
        willStateUpdate();
        expect(nextState).toEqual({ count: 1 });
      },
      willMethodCall(name, count) {
        willMethodCall();
        expect(name).toBe('testMethod');
        expect(count).toBe(1);
      },
      shouldMethodCall(name, count) {
        shouldMethodCall();
        expect(name).toBe('testMethod');
        expect(count).toBe(1);
        return true;
      },
      didMethodCall(name, count) {
        didMethodCall();
        expect(name).toBe('testMethod');
        expect(count).toBe(1);
      },
    })
    class Data extends State {
      willStateUpdate(nextState) {
        willStateUpdate();
        expect(nextState).toEqual({ count: 1 });
      }
      willMethodCall(name, count) {
        willMethodCall();
        expect(name).toBe('testMethod');
        expect(count).toBe(1);
      }
      testMethod() {}
    }

    const data = new Data();
    data.testMethod(1);
    expect(willMethodCall.mock.calls.length).toBe(2);
    expect(shouldMethodCall.mock.calls.length).toBe(1);
    expect(didMethodCall.mock.calls.length).toBe(1);
    
    data.setState({ count: 1 });
    expect(willStateUpdate.mock.calls.length).toBe(2);
  });

  test('shouldMethodCall', () => {
    const didMethodCall = jest.fn();
    @combine({
      shouldMethodCall() {
        return false;
      },
      didMethodCall() {
        didMethodCall();
      },
    })
    class Data extends State {
      didMethodCall() {
        didMethodCall();
      }
      testMethod() { }
    }

    const data = new Data();
    data.testMethod();
    expect(didMethodCall.mock.calls.length).toBe(0);
  });

  test('shouldStateUpdate', () => {
    const didStateUpdate = jest.fn();
    @combine({
      shouldStateUpdate() {
        return false;
      },
      didStateUpdate() {
        didStateUpdate();
      },
    })
    class Data extends State {
      didStateUpdate() {
        didStateUpdate();
      }
    }

    const data = new Data();
    data.setState({});
    expect(didStateUpdate.mock.calls.length).toBe(0);
  });
});
