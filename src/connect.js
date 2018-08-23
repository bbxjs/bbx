import React from 'react';
import bind from './bind';

const connect = (...list) => {
  const array = list.map(obj => bind(obj));

  return (A) => {
    if (React.PureComponent && A.prototype instanceof React.PureComponent) {
      throw new Error('bbx found that you are using "connect" and the PureComponent is passed, don\'t connect a PureComponent.');
    }
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.didStateUpdate = () => this.setState({});
        array.forEach(item => item.add(this.didStateUpdate));
        this.state = {};
      }

      componentWillUnmount() {
        array.forEach(item => item.remove(this.didStateUpdate));
      }

      render() {
        return <A {...this.props} />;
      }
    };
  };
};

export default connect;
