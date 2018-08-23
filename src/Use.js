import React from 'react';
import bind from './bind';
import shallowEqual from './shallowEqual';

class Use extends React.Component {
  constructor(props) {
    super(props);
    this.didStateUpdate = () => this.setState({});
    this.bindUpdate(props);
    this.state = {};
  }

  // compatible
  componentWillReceiveProps(nextProps) {
    const equal = shallowEqual(nextProps.state, this.props.state);
    if (!equal) {
      this.removeUpdate();
      this.bindUpdate(nextProps);
    }
  }

  componentWillUnmount() {
    this.removeUpdate();
  }

  removeUpdate() {
    this.list.forEach(item => item.remove(this.didStateUpdate));
  }

  bindUpdate(props) {
    const { state, children } = props;
    if (typeof children !== 'function') {
      throw new Error('The children of Use Component should be a function.');
    }
    const array = Array.isArray(state) ? state : [state];
    this.list = array.map(item => bind(item).add(this.didStateUpdate));
  }

  render() {
    return this.props.children();
  }
}

export default Use;
