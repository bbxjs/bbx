const bind = (state) => {
  let bbxState = state.didStateUpdate.bbxState;
  if (!bbxState) {
    bbxState = {
      array: [],
      add(didStateUpdate) {
        this.array.push(didStateUpdate);
        return this;
      },
      remove(didStateUpdate) {
        const index = this.array.indexOf(didStateUpdate);
        this.array.splice(index, 1);
      },
    };
    const didStateUpdate = state.didStateUpdate.bind(state);
    state.didStateUpdate = (...args) => {
      didStateUpdate(...args);
      bbxState.array.forEach(item => item());
    };
    state.didStateUpdate.bbxState = bbxState;
  }
  return bbxState;
};

export default bind;
