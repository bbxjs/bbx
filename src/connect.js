import React from 'react';

const connect = (...list) => {
  const array = [];
  list.forEach((obj) => {
    const didStateUpdate = obj.didStateUpdate.bind(obj);
    obj.didStateUpdate = (...args) => {
      didStateUpdate(...args);
      array.forEach(item => item());
    };
  });

  return A => class extends React.Component {
    constructor(props) {
      super(props);
      this.index = array.push(() => this.setState({})) - 1;
      this.state = {};
    }

    componentWillUnmount() {
      array.splice(this.index, 1);
    }

    render() {
      return <A {...this.props} />;
    }
  };
};

export default connect;
