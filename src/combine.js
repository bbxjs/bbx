import State from './state';

function combine(...classes) {
  return class CombineState extends State {
    constructor(...args) {
      super();
      this.array = classes.map(item => {
        return new item(...args);
      });
    }
    willUpdate(nextState) {
      this.array.forEach(item => {
        item.willUpdate(nextState);
      });
    }
    shouldUpdate(nextState) {
      for (const item of this.array) {
        if (item.shouldUpdate(nextState)) {
          return false;
        }
      }
      return true;
    }
    didUpdate(prevState) {
      this.array.forEach(item => {
        item.didUpdate(prevState);
      });
    }
  }
}

export default combine;
