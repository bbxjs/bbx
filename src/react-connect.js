import React from 'react';

const connect = (...list) => A => class extends React.Component {
  constructor(props) {
    super(props);
    list.forEach((obj) => {
      const didStateUpdate = obj.didStateUpdate.bind(obj);
      obj.didStateUpdate = (...args) => {
        didStateUpdate(...args);
        this.setState({});
      };
    });
    this.state = {};
  }

  render() {
    return <A {...this.props} />;
  }
};

export default connect;
