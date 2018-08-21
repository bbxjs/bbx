## bbx

[![npm](https://img.shields.io/npm/v/bbx.svg)](https://www.npmjs.com/package/bbx)
[![travis](https://img.shields.io/travis/bbxjs/bbx.svg)](https://travis-ci.org/bbxjs/bbx)
[![Coverage Status](https://coveralls.io/repos/github/bbxjs/bbx/badge.svg)](https://coveralls.io/github/bbxjs/bbx)
![David](https://img.shields.io/david/bbxjs/bbx.svg)





𝕓𝕓𝕩 是一个极其简单高效的 React 状态管理方式

开始使用：[https://bbxjs.github.io/start/](https://bbxjs.github.io/start/)

### 特点

- **超简单:baby:**: 了解 api 几乎没成本，会用 React 即会用 bbx，或许你已经会用了
- **清晰:sun_with_face:**: 状态管理清清楚楚，方法调用也直观明了
- **扩展性:hatching_chick:**: bbx 内置了许多项目开发中常用的方法，当然你也能很方便的开发更多的方法


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