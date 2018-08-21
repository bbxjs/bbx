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

  return (A) => {
    if (React.PureComponent && A.prototype instanceof React.PureComponent) {
      throw new Error('bbx found that you are using "connect" and the PureComponent is passed, don\'t connect a PureComponent.');
    }
    return class extends React.Component {
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
};

export default connect;
