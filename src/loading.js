/*
  example:

  class Data extends State{
    constructor() {
      this.state = {
        name: '',
        age: '',
      },
    }

    @loading
    async getUser() {
      const { name, age } = await request('/api/user.json');
      this.setState({
        name,
        age,
      });
    }
  }

  @connect(user)
  class App extends React.Component {
    render() {
      if (user.getUserLoading) {
        return <div>loading</div>
      }
      return <div>
        {user.name} {user.age}
      </div>;
    }
  }

*/
function loading(target, name, descriptor) {
  const method = descriptor.value;
  function asyncFunction(...args) {
    this.setState({
      [`${name}Loading`]: true,
    });
    const result = method.apply(this, args);
    if (result && typeof result.then === 'function') {
      result.then(() => {
        this.setState({
          [`${name}Loading`]: false,
        });
      });
    }
    return result;
  }
  return {
    ...descriptor,
    value: asyncFunction,
  };
}

export default loading;
