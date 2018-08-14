# latest 修饰器

前端开发中经典的问题之一：分页请求顺序问题。

在网络请求比较慢的情况下，用户可能点击了几个页面，但是只会用到最后一个页面。比如用户连续点击了第2页、第4页，页面会发起两个请求，要是不做处理，ui 可能会展示到后返回的，也可能会页面闪动。

简单描述就是：顺序执行异步操作（比如一个请求），忽略前面的，只用最后一个的。bbx 提供了 “latest 修饰器” 来方便开发。

比如以下示例，不管是否网络比较慢，用户怎么点击, ui 都会展示最后点击按钮对应的用户。


```jsx
import { latest } from 'bbx';

// State
...
@latest
async getUser(id) {
  const { name, age } = await request(`/api/user.json?id=${id}`);
  this.setState({
    name,
    age,
  });
}
...

// App
...
render() {
  render <div>
    
    用户：
    <h1>{user.state.name} {user.state.age}</h1>
    
    按钮组：
	<button onClick={() => user.getUser(1)}>用户1</button>
	<button onClick={() => user.getUser(2)}>用户2</button>
	<button onClick={() => user.getUser(3)}>用户3</button>
  
  </div>;
}
...
```

[查看在线可运行](https://stackblitz.com/edit/bbx-example-latest)

更简单的示例，不管怎么调用 change 方法，this.state.id 都是最后一次调用的 id。

```jsx
...
@latest
change(id, timer) {
  setTimeout(() => {
    this.setState({
      id,
    })
  }, timer)
}
...

change(1, 1000);
change(2, 100);
```

# 说明

**latest 修饰器**

采用 @latest 作用于一个方法，多次调用只会最后一次修改 state。

**限制**

使用 @latest 的方法，只能有 `this.setState` 方法，而不能再去调用其他方法。

比如以下是错误的：

```jsx
@latest
change() {
  const user = this.getUser(); // 错误的例子
}
```