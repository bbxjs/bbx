# 快速上手

#### 安装
```bash
$ npm install bbx
```

#### 使用

#### 1. 定义一个状态类
```jsx
import { State } from 'bbx';

class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
}
```

#### 2. 实例化这个类

```jsx
const hello = new Hello();
```

#### 3. 在 React 中使用这个实例

在 React 中你可有 “两个方式” 来使用这个实例：

- **[connect 修饰器](connect.html)**
- **[Use 组件](Use.html)**

1. connect 修饰器

你可通过 `connect 修饰器` 来连接 state 跟 React 组件。当 state 更新，React 组件也会更新。

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

2. Use 组件

你还可通过 `Use 组件` 来使用 state。当 state 更新了，组件也会更新。


```jsx
import { Use } from 'bbx';


class App extends React.Component {
  render() {
    return <div> 
      <Use state={hello}>
        {() =>
          <div>
            {hello.state.say}
          </div>
        }
      </Use>
      <button onClick={() => hello.hi()}>hi</button>
    </div>
  }
}
```

[在线查看可运行的代码](https://stackblitz.com/edit/bbx-example-hello-use)
