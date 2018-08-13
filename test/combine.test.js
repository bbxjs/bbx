import { State, combine } from '../src';

describe('bbx combine', () => {
  test('combine', () => {
    const willMethodCall = jest.fn();
    @combine({
      willMethodCall(name) {
        willMethodCall();
        expect(name).toBe('testMethod');
      },
    })
    class Data extends State {
      testMethod() {}
    }

    const data = new Data();
    data.testMethod();
    expect(willMethodCall.mock.calls.length).toBe(1);
  });
});
