# connect 修饰器

### 说明
`connect` 是一个方法，用于连接一个 “状态实例” 与 “React 组件”

```jsx
import { connect } from 'bbx';

// 状态实例
const user = new User();

// React 组件
class App extends React.Component{}

// 连接 user 跟 App，返回一个 React 组件(HOC)
App = connect(user)(App)

```

为了方便，更多情况下，可使用 [修饰器](http://es6.ruanyifeng.com/#docs/decorator) 的方式：

```jsx
@connect(user)
class App extends React.Component {}
```

使用 `connect` 连接 “状态实例” 与 “React 组件” 后，当 “状态实例” 调用 `this.setState` 更新状态后，对应的 “React 组件” 也会更新。


### 更多

- 示例只 connect 了一个实例，实际上，你可根据需求 connect 多个实例：

```jsx
@connect(hello, user, custom)
```

- 注意，不要使用 `connect` 去连接一个 `React.PureComponent`。

