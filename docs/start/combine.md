# combine 修饰器

combine 修饰器是作用在一个状态类上，让这个状态类有更多的方法。

比如在 [“自定义状态类”](custom-state.html) 可自定义一个状态类，作用是在状态改变前、后 console 出 Date:

CustomState.js
```jsx
import { State } from 'bbx';

class CustomState extends State {
  willStateUpdate() {
    console.log('will state update', new Date);
  }
  didStateUpdate() {
    console.log('did state update', new Date);
  }
}

export default CustomState;
```

而另外一个方式，就是使用 `combine 修饰器`:

CustomState.js
```jsx
import { State } from 'bbx';
import ConsoleStateDate from './ConsoleStateDate';

@combine(ConsoleStateDate)
class CustomState extends State {
  ...
}

export default CustomState;
```

ConsoleStateDate.js
```jsx
const ConsoleStateDate = {
  willStateUpdate() {
    console.log('will state update', new Date);
  },
  didStateUpdate() {
    console.log('did state update', new Date);
  },
};

export default ConsoleStateDate;
```

这么做的好处是 `ConsoleStateDate.js` 可单独维护，甚至可发布到 npm，也可使用 npm 上其他的扩展方法。

比如：

```jsx
import { State } from 'bbx';
import State1 from 'State1';
import State2 from 'State2';
import State3 from 'State3';

@combine(State1, State2, State3)
class CustomState extends State {
  ...
}

export default CustomState;
```

# 说明

**@combine** 可接收状态扩展方法，之后会依次调用。

比如：

```jsx
const State1 = {
  willStateUpdate() {
    console.log('State1');
  },
};

const State2 = {
  willStateUpdate() {
    console.log('State2');
  },
};

const State3 = {
  willStateUpdate() {
    console.log('State3');
  },
};

@combine(State1, State2, State)
class CustomState extends State {
  willStateUpdate() {
    console.log('CustomState');
  }
}
```

当 `this.setState` 后，会依次调用调用，console：

```
CustomState
State1
State2
State3
```