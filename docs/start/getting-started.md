# 快速上手

#### 安装
```bash
$ npm install bbx
```

#### 使用

1. 定义一个状态类
```jsx
import { State } from 'bbx';

class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
}
```

2. 实例化这个类

```jsx
const hello = new Hello();
```

3. 连接这个实例到 React 组件
```jsx
import { connect } from 'bbx';

@connect(hello)
class App extends React.Component {
  render() {
    return <div>
      {hello.state.say}
      <button onClick={() => hello.hi()}>hi</button>
    </div>
  }
}
```

[在线查看可运行的代码](https://stackblitz.com/edit/bbx-example-hello)

# 说明

- **State**: 状态类要继承于这个 State

```jsx
import { State} from 'bbx';
```

- **this.state**: 定义默认的状态

```jsx
class User extends State {
  // 定义默认的 state
  state = { say: 'hello 👶' }
}
```

- **this.setState**: 修改 state

```jsx
class User extends State {
  state = { say: 'hello 👶' }
  
  // 定义一个方法，使用 this.setState 修改 state
  hi() { this.setState({ say: 'hi !' }) }
}
```


- **connect**: 状态实例通过 connect 方法连接到 React 组件

```jsx
import { connect} from 'bbx';
```

示例只 connect 了一个实例，实际上，你可根据需求 connect 多个实例：

```jsx
@connect(hello, user, custom)
```

