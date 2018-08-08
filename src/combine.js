import State from './state';

function combine(...classes) {
  return class CombineState extends State {
    constructor(...args) {
      super();
      this.array = classes.map(Class => new Class(...args));
    }

    willUpdate(nextState) {
      this.array.forEach(item => item.willUpdate(nextState));
    }

    shouldUpdate(nextState) {
      for (let i = 0; i < this.array.length; i += 1) {
        const item = this.array[i];
        if (item.shouldUpdate(nextState)) {
          return false;
        }
      }
      return true;
    }

    didUpdate(prevState) {
      this.array.forEach(item => item.didUpdate(prevState));
    }
  };
}

export default combine;
