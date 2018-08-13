function latest(target, name, descriptor) {
  const method = descriptor.value;
  const setState = target.setState;
  let latestArguments;
  async function asyncFunction(...args) {
    latestArguments = args;
    const result = await method.apply({
      setState: (...setStateArgs) => {
        if (latestArguments === args) {
          setState.apply(this, setStateArgs);
        }
      },
    }, args);
    return result;
  }
  return {
    ...descriptor,
    value: asyncFunction,
  };
}

export default latest;
