# update 修饰器

update 修饰器可用来让一个 React 组件只在有 state 或 props 变化才进行刷新。

比如以下的示例：

```jsx
@connect(user)
class User extends React.Component {
  render() {
    console.log('User render');
    return <div>{user.state.name}</div>
  }
}

class App extends React.Component {
  render() {
    console.log('App render');
    return <User />;
  }
}
```

当 App 刷新后，User 也会刷新，可看到 console 为：

```
App render
User render
// 刷新 App
App render
User render
```

要是想让 User 只有在 name 改变再刷新，则可修改为：

```jsx
@connect(user)
@update(() => [ user.state.name ])
class User extends React.Component {
  render() {
    console.log('User render');
    return <div>{user.state.name}</div>
  }
}
```

当 App 刷新，只要 `user.state.name` 没有变化则不会刷新，console 为：

```
App render
User render
// 刷新 App
App render
```

[查看在线可运行](https://stackblitz.com/edit/bbx-example-update)

# 说明

**@update** 接收一个 function，这个 function 返回一个数组，数组里为检测是否有变化的值，要是有一个变化则会刷新组件。

更多例子：

```jsx
// 当 user.state.name, user.state.age 有一个不同则刷新
@update(() => [
  user.state.name,
  user.state.age,
])

// 当 num.state.a + num.state.b 有变化才刷新，也就是说要是 1 + 1，2 + 0 等，只要 num.state.a + num.state.b 没有变化则不会刷新
@update(() => [
  num.state.a + num.state.b
])
```


在 [设计原则](principles.html) 中有 bbx 的设计思路，“除非你需要，否则不用”。也就是说，除非你的 React 组件很复杂，需要用 update 修饰器来解决性能问题，都不需要使用。