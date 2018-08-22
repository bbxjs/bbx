import React from 'react';
import shallowEqual from './shallowEqual';


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
