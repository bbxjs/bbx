# 自定义状态类

在了解了 [“状态流程”](state-flow.html) 跟 [“方法流程”](method-flow.html) 后，对于一个 State 的状态变化及方法调用都能很方便监控。

但是项目中，可能有不少状态类，比如：

Hello.js
```jsx
import { State } from 'bbx';

class Hello extends State {}
```

User.js
```jsx
import { State } from 'bbx';

class User extends State {}
```

为了对项目的状态进行全部的监控，那需要在每个状态类中都加上 `willStateUpdate` 等方法？那不是很麻烦？

bbx 推荐的做法是，状态类不要直接继承于 bbx 给的 State，而是继承于自定义的文件，哪怕这个文件什么都没有做，只是返回了 bbx 的 State。

CustomState.js
```jsx
import { State } from 'bbx';

export default State;
```

Hello.js
```jsx
import { State } from './CustomState';

class Hello extends State {}
```

User.js
```jsx
import { State } from './CustomState';

class User extends State {}
```

看起来是相同的，但是通过继承于自定义的状态类，就能很方便全局使用 “状态流程” 及 “方法流程”。

比如，修改 CustomState.js：

```jsx
import { State } from 'bbx';

class CustomState extends State {
  willStateUpdate(nextState) {
    console.log('will state update', nextState);
  }
}
export default CustomState;
```

只要继承于 CustomState 的状态类在状态改变前都会先运行这个 `willStateUpdate`，而不用去改 Hello.js 以及 User.js。当然，[“状态流程”](state-flow.html) 跟 [“方法流程”](method-flow.html) 中的方法都能在自定义类中使用。

这就是自定义状态类的作用，更方便的扩展状态类的能力。