# 方法流程

可能你已经想到了，在 [状态流程](state-flow.html) 里 `this.setState` 会触发一个流程，这个流程就叫 “状态流程”。

而当调用一个方法，也会触发一个流程，这个流程就是叫 **“方法流程”**。

还是之前的示例：

```jsx
import { State } from 'bbx';

class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }
}
```

当调用这个 `hi()` 方法，能否也像调用 `this.setState` 能有对应的流程呢？

其实，调用方法也会有一个 `方法流程`，每次调用方法都会触发：

- **willMethodCall (methodName, ...args)**: 方法将会调用

- **shouldMethodCall (methodName, ...args)**: 是否进行方法调用，只有返回 `true` 才会进行调用

- **didMethodCall(methodName, ...args)**: 方法调用后（要是 shouldMethodCall 返回的不会 `true` 则不会调用）

比如给示例加上 `willMethodCall`:

```jsx
class Hello extends State {
  state = { say: 'hello 👶' }
  hi() { this.setState({ say: 'hi !' }) }

  willMethodCall(name) {
    console.log('will method call ', name);
  }

  didMethodCall(name) {
    console.log('did method call ', name);
  }
}
```

当调用 `hi()` 方法就会看到 console：

```
will method call hi
did method call 
```

# 说明

“方法流程” 的全部流程为：

```
调用方法 ->
willMethod ->
shouldMethodCall -> if (true) ->
didMethodCall
```

使用继承了 bbx State 的类，都会有这个流程，默认的方法为：

```jsx
...
willMethodCall() {
  /* 空方法 */
}
shouldMethodCall() {
  return true;
}
didMethodCall() {
  /* 空方法 */
}
...
```

除非你想使用，否则你不用给你的状态类加上这几个方法。

更多的示例，利用 [“状态流程”](state.html) 跟 [“方法流程”](method.html) 来监控全部的方法调用和状态变化，以及其他很酷的事情，包括 dev-tool 来更清楚管理 方法和状态，比如 [Time Travel in React Redux apps using the Redux DevTools](https://medium.com/the-web-tub/time-travel-in-react-redux-apps-using-the-redux-devtools-5e94eba5e7c0)

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

  willMethodCall(name) {
    console.log('will method call', name);
  }

  didMethodCall(name) {
    console.log('did method call', name);
  }
}
```