const bind = (state) => {
  let array = state.didStateUpdate.bbxStateArray;
  if (!array) {
    array = [];
    const didStateUpdate = state.didStateUpdate.bind(state);
    state.didStateUpdate = (...args) => {
      didStateUpdate(...args);
      array.forEach(item => item());
    };
    state.didStateUpdate.bbxStateArray = array;
  }

  return {
    add(didStateUpdate) {
      array.push(didStateUpdate);
      return this;
    },
    remove(didStateUpdate) {
      const index = array.indexOf(didStateUpdate);
      array.splice(index, 1);
    },
  };
};

export default bind;
