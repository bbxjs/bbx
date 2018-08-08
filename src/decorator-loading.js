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
  const asyncFunction = async function () {
    this.setState({
      [`${name}Loading`]: true,
    });
    const result = await method.apply(this, arguments);
    this.setState({
      [`${name}Loading`]: false,
    });
    return result;
  };
  descriptor.value = asyncFunction;
}

export default loading;
