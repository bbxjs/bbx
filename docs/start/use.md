# Use 组件

### 说明

`connect 修饰器` 是用于连接一个 “状态实例” 与 “React 组件”。

而 `Use 组件` 是一个 React 组件，可连接 “状态实例” 跟 “React 元素”。

```jsx
import { Use } from 'bbx';

// 状态实例
const user = new User();

class App extends React.Component{
  render () {
    return <div>

      <Use state={user}>
        {
          () => <div>
            {user.state.name}
            {user.state.age}
          </div>
        }
      </Use>

    </div>
  }
}
```

Use props:

- state

这个 “state” 为一个 “状态实例” 或 “状态实例的数组”。

- children

children 为一个方法，返回的是 React 元素。当 state 更新后，对应的 React 元素也会更新。

### 更多

为什么有了 `connect 修饰器` 还需要 `Use 组件` 呢？

因为前者是连接的一个 React Component，而后者是连接的一个 React Element。

比如当使用 `connect 修饰器` 连接一个 React 组件：

```jsx
import user from './states/user';

@connect(user)
class App extends React.Component{}
```

但是要是 user 这个 “状态实例” 是动态的呢？那就用 `Use 组件` 会很方便：

```jsx

class App extends React.Component{
  constrcutor(props) {
    super(props);
    this.user = new User();
  }
  render() {
    return <Use state={user.state.name}>
      {() =>
        <div>
          {user.state.name}
        </div>
      }
    </Use>
  }
}
```

另外，对于一个复杂的组件，使用 `Use 组件` 的方式也可很方便使用 “状态实例”。