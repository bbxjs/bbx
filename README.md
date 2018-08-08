## 中文 README.md

𝕓𝕓𝕩 是一个极其简单高效的 React 状态管理方式

### 特点

- **简单**: 了解 api 基本没成本，会用 React 即会用 bbx
- **清晰**: state 全程可监控
- **扩展**: 采用类的继承可扩展更多的功能


### 使用

1. 建立一个状态类，继承于 bbx State

```js
import { State } from 'bbx';

class User extends State {
  // 默认的 state 在构造器里采用 this.state = 默认state 方式
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
    };
  }
}
```

2. 实例化这个类

```js
const user = new User();
```

3. 使用这个实例

```js
import { connect } from 'bbx';

//  连接 user 到 React 组件
@connect(user)
class App extends React.Component {
  render() {
    return <div>
      <p>{user.name}</p>
      <p>{user.age}</p>
    </div>;
  }
}
```

到这里，你已经能定义一个 state，再使用这个 state 了，接下来再看看怎么修改这个 state：

4. 修改下 User 类，添加一个 getUser 的方法

```js
import { State } from 'bbx';

class User extends State {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
    };
  }
  // 这里定义了一个异步方法，当然，也可为同步方法。
  async requestUser() {
    // 这里的 request 方法是一个示例，项目中你改用你喜欢的方法，比如 fetch，axios 等
    const { name, age } = await request('/api/user.json');
    // 采用 this.setState 修改 state
    this.setState({
      name,
      age,
    })
  }
}
```

5. 修改 App 组件

```js
import { connect } from 'bbx';

@connect(user)
class App extends React.Component {
  componentDidMount() {
    // 使用这个方法
    user.requestUser();
  }
  render() {
    return <div>
      <p>{user.name}</p>
      <p>{user.age}</p>
    </div>;
  }
}
```

到这里，你已经了解了：

- State: 定义一个 state，采用 this.setState 修改 state
- connect：连接 state 到 React 组件

### 进阶

在了解了 “使用” 后，已经能上手开发项目了，而以下的内容是进一步了解 bbx 的更多能力

- setState 调用流程

当调用 this.setState，都会有以下方法调用流程

```js
class User extends State {
  // 默认 willUpdate 为空方法
  willUpdate(nextState) {

  }
   // 默认 shouldUpdate 返回 true，只有返回 true 才会调用 didUpdate
  shouldUpdate(nextState) {
    return true;
  }
  // 默认 didUpdate 为空方法
  didUpdate(prevState) {

  }
}
```

- TODO 说明有什么用

- TOTO 说明 loading

### 更多示例

- count https://stackblitz.com/edit/bbx-example-count
- async https://stackblitz.com/edit/bbx-example-async