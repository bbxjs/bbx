import React from 'react';

const connect = (...list) => A => class extends React.Component {
  constructor(props) {
    super(props);
    list.forEach((obj) => {
      const didUpdate = obj.didUpdate.bind(obj);
      obj.didUpdate = (...args) => {
        didUpdate(...args);
        this.setState({});
      };
    });
  }

  render() {
    return <A {...this.props} />;
  }
};

export default connect;
