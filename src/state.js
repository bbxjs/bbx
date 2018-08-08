class State {
  constructor() {
    this.state = {};
  }

  /*
     setState ->
     willUpdate ->
     shouldUpdate -> if (not true) end; if (true) ->
     didUpdate
  */
  setState(nextState) {
    this.willUpdate(nextState);
    // Call shouldUpdate
    const update = this.shouldUpdate(nextState);

    // Only "return true" didUpdate will be called
    if (update === true) {
      const prevState = this.state;
      this.state = {
        ...prevState,
        ...nextState,
      };
      this.didUpdate(prevState);
    }
  }

  willUpdate() {
    /* call willUpdate */
  }

  shouldUpdate() {
    /* default: true */
    return true;
  }

  didUpdate() {
    /* call didUpdate */
  }
}

export default State;
