# 状态流程

以下是 [快速上手](getting-started.html) 的示例：

```jsx
import { State } from 'bbx';

class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
}
```

当调用 `this.setState({ say: 'hi !' })` 后 state 变为了 `{ say: 'hi !' }`，React 组件刷新。那是否能监听到 state 将要变化？

其实你只需使用 `willStateUpdate` 即可：

```jsx
class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
  willStateUpdate(nextState) {
    console.log(nextState);
  }
}
```

# 说明

事实上，bbx 对状态改变提供了 3 个 hook function，每次调用 `this.setState` 会触发：

- **willStateUpdate (nextState)**: 状态将要改变

- **shouldStateUpdate (nextState)**: 是否要让状态改变，只有返回 `true` 才会改变状态

- **didStateUpdate (prevState)**: 状态改变后（要是 shouldStateUpdate 返回的不会 `true` 则不会调用）

所以，由 `this.setState` 触发的流程就称为 **“状态流程”**。

全部流程为：
```
setState ->
willStateUpdate ->
shouldStateUpdate -> if (true) ->
didStateUpdate
```

使用继承了 bbx State 的类，都会有这个流程，默认的方法为：

```jsx
...
willStateUpdate() {
  /* 空方法 */
}
shouldStateUpdate() {
  return true;
}
didStateUpdate() {
  /* 空方法 */
}
...
```

除非你想使用，否则你不用给你的状态类加上这几个方法。


更多的示例，利用状态流程来监控全部的状态变化。

```jsx
class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
  willStateUpdate(nextState) {
    console.log('will state update');
    console.log('current state', this.state);
    console.log('next state', nextState);
  }
  didStateUpdate(prevState) {
    console.log('did state update');
    console.log('current state', this.state);
    console.log('prev state', prevState);
  }
}
```