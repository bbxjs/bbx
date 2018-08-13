class State {
  constructor() {
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
    /* call willUpdate */
  }

  shouldStateUpdate() {
    /* default: true */
    return true;
  }

  didStateUpdate() {
    /* call didUpdate */
  }
}

export default State;
