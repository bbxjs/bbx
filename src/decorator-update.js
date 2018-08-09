import React from 'react';

const hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null
    || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i])
      || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}


const update = fn => A => class extends React.Component {
  constructor(props) {
    super(props);
    this.list = fn();
  }

  shouldComponentUpdate(nextProps) {
    let isUpate = false;
    const list = fn();

    for (let i = 0; i < list.length; i += 1) {
      if (this.list[i] !== list[i]) {
        isUpate = true;
        break;
      }
    }
    this.list = list;
    if (isUpate) {
      return true;
    }
    return !shallowEqual(this.props, nextProps);
  }

  render() {
    return <A {...this.props} />;
  }
};

export default update;
