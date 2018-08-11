---
home: true
actionText: 开始使用
actionLink: /start/
features:
- title: 超简单 👶
  details: 了解 api 几乎没成本，会用 React 即会用 bbx，或许你已经会用了
- title: 清晰 🌞
  details: 状态管理清清楚楚，方法调用也直观明了。
- title: 扩展性 🐣
  details: bbx 内置了许多项目开发中常用的方法，当然你也能很方便的开发更多的方法
footer: MIT Licensed | Copyright © 2018-present
---

### 使用就是那么简单

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