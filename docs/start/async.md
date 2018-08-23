# 异步方法

在 [快速上手](getting-started.html) 中调用的方法是同步的。实际项目中，很多方法都是异步的，比如调用一个请求，那在 bbx 中是怎么做的呢？

这里会用一个请求用户信息的示例来说明。

1. 定义一个类
```jsx
import { State } from 'bbx';

class User extends State {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
    };
  }

  // 定义了一个异步方法
  async requestUser() {
    // 这里的是一个示例，项目中你改用你喜欢的方法，比如 fetch，axios 等
    const { name, age } = await request('/api/user.json');

    this.setState({
      name,
      age,
    });
  }
}
```

2. 实例化这个类

```jsx
const user = new User();
```

3. 连接这个实例到 React 组件

```jsx
import { connect } from 'bbx';

@connect(user)
class App extends React.Component {
  componentDidMount() {
    user.requestUser();
  }

  render() {
    return <div>
      <p>{user.state.name}</p>
      <p>{user.state.age}</p>
    </div>;
  }
}
```

[在线查看可运行的代码](https://stackblitz.com/edit/bbx-example-async)

# 说明

实例可以看出，当要使用异步方法，可使用 [async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

实际上，你还能使用其他方式，比如：

```jsx
...
requestUser() {
  request('/api/user.json').then(json => {
    const { name, age } = json;
    this.setState({
      name,
      age,
    });
  });
}
...
```