import State from './state';

function combine(...classes) {
  return class CombineState extends State {
    constructor(...args) {
      super();
      this.array = classes.map(Class => new Class(...args));
    }

    willStateUpdate(nextState) {
      this.array.forEach(item => item.willStateUpdate(nextState));
    }

    shouldStateUpdate(nextState) {
      for (let i = 0; i < this.array.length; i += 1) {
        const item = this.array[i];
        if (item.shouldStateUpdate(nextState)) {
          return false;
        }
      }
      return true;
    }

    didStateUpdate(prevState) {
      this.array.forEach(item => item.didStateUpdate(prevState));
    }
  };
}

export default combine;
