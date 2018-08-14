# loading 修饰器

为了简化判断一个异步方法是否执行完成，可采用 loading [修饰器](http://es6.ruanyifeng.com/#docs/decorator)。

在 [“开始使用 - 异步方法”](async.html)，发起了一个请求用户的异步方法：

```jsx
...
async requestUser() {
  const { name, age } = await request('/api/user.json');

  this.setState({
    name,
    age,
  });
}
...
```

因为 requestUser 是一个异步方法，那在请求返回前，想要在界面上加一个 loading 告诉用户正在请求，这个要怎么做呢？

一个方式是修改 requestUser 方法，在请求前加一个属性表示正在请求，之后再修改这个属性表示请求完成。

```jsx
...
async requestUser() {
  // 添加一个 requestUserLoading 用来表示是否在 loading
  this.setState({
    requestUserLoading: true;
  });

  const { name, age } = await request('/api/user.json');
  this.setState({
    name,
    age,
  });

  // 请求完成，requestUserLoading 改为 false
  this.setState({
    requestUserLoading: false;
  });
}
...
```

之后在 App 里就能使用了：

```jsx
import { connect } from 'bbx';

@connect(user)
class App extends React.Component {
  componentDidMount() {
    user.requestUser();
  }
  render() {
    return user.state.requestUserLoading ?
      <div>
        loading...
      </div>
      :
      <div>
        <p>{user.state.name}</p>
        <p>{user.state.age}</p>
      </div>;
  }
}
```

但是，要是有不少异步方法都要去改？

bbx 内置了 “loading 修饰器” 来简化，只用给这个异步方法使用 “@loading” 即可：[查看在线可运行](https://stackblitz.com/edit/bbx-example-loading)


```jsx
...
import { loading } from 'bbx'

@loading
async requestUser() {
  const { name, age } = await request('/api/user.json');

  this.setState({
    name,
    age,
  });
}
...
```

给异步方法使用 @loading，即可在 state 里添加一个 `$方法名}Loading` 的属性用来表示异步方法是否执行完成。对于 async requestUser 就会添加一个 requestUserLoading 的属性用来判断是否完成了异步方法。


# 说明

- **loading 修饰器**

采用 @loading 作用于一个异步方法，让 state 里添加一个 `${方法名}Loading` 的属性

- **作用于非 async function**

对于非 async function，要使用 “loading 修饰器”，这个异步方法要返回一个 Promise。比如:

```jsx
@loading
fetchUser() {
  // 因为 fetchUser 不是 async function，就要 return 一个 Promise
  return request('/api/user.json').then(json => {
    const { name, age } = json;
    this.setState({
      name,
      age,
    });
  });
}
```

