class State {
  constructor() {
    for (const key in this) {
      if (typeof this[key] === 'function' && [
        'constructor',
        'setState',
        'willStateUpdate',
        'shouldStateUpdate',
        'didStateUpdate',
        'willMethodCall',
        'shouldMethodCall',
        'didMethodCall',
      ].indexOf(key) < 0) {
        const method = this[key].bind(this);
        this[key] = (...args) => {
          /*
            call method ->
            willMethodCall ->
            shouldMethodCall -> if (not true) end; if (true) ->
            call method ->
            didMethodCall
          */
          this.willMethodCall(key, ...args);
          const update = this.shouldMethodCall(key, ...args);
          if (update === true) {
            const result = method(...args);
            this.didMethodCall(key, ...args);
            return result;
          }
          return undefined;
        };
      }
    }
    this.state = {};
  }

  /*
     setState ->
     willStateUpdate ->
     shouldStateUpdate -> if (not true) end; if (true) ->
     didStateUpdate
  */
  setState(nextState) {
    this.willStateUpdate(nextState);
    // Call shouldUpdate
    const update = this.shouldStateUpdate(nextState);

    // Only "return true" didStateUpdate will be called
    if (update === true) {
      const prevState = this.state;
      this.state = {
        ...prevState,
        ...nextState,
      };
      this.didStateUpdate(prevState);
    }
  }

  willStateUpdate() {
    /* call willStateUpdate */
  }

  shouldStateUpdate() {
    /* default: true */
    return true;
  }

  didStateUpdate() {
    /* call didStateUpdate */
  }

  willMethodCall() {
    /* call willMethodCall */
  }

  shouldMethodCall() {
    /* default true */
    return true;
  }

  didMethodCall() {
    /* call didMethodCall */
  }
}

export default State;
