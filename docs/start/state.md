# State 类

### 说明

`State 类` 是 bbx 的核心。

```jsx
import { State } from 'bbx';
```

继承于这个类的类，称为 “状态类”。比如：


```jsx
class User extends State {}
```

`User` 就是一个 “状态类”。而 “状态带” 的实例，称为 “状态实例”，比如：

```jsx
const user = new User();
```

`user` 就是一个 “状态实例”。


`State 类` 有个成员属性 `state`，以及一个成员方法 `setState`。

- **this.state**: 定义默认的状态

```jsx
class User extends State {
  // 定义默认的 state
  state = { say: 'hello 👶' }
}
```

更多示例：
```jsx
class User extends State {
  constructor(say) {
    super();
    // 定义默认的 state
    this.state = { say }
  }
}

const user = new User('hi');
```

- **this.setState**: 修改 state

```jsx
class User extends State {
  state = { say: 'hello 👶' }
  
  // 定义一个方法，使用 this.setState 修改 state
  hi() { this.setState({ say: 'hi !' }) }
}
```