# bbx 介绍

bbx 是一个极其简单高效的 React 状态管理方式。你可以很方便的使用 bbx 进行状态管理而不用太多的困扰，也就是说，要是你会 React，那就已经会使用 bbx 了。

# bbx 是怎么工作的

可以分为 3 步：

- 定义一个状态类
- 示例化这个类
- 连接这个实例到一个 React 组件

接着 bbx 就能工作了。你可修改这个实例的状态，接着，React 组件也会刷新。没有其他的概念，就这 3 步。


# 为什么不是

### dva

[dva](https://dvajs.com/) 是一个非常好的 framework，可以认为是 redux + saga 的最佳实践，甚至是 redux 开发的最佳实践。因为真的想不到还有比 dva 更好的方式来开发 redux + saga 的项目。所以，要是你想用 redux 开发项目，推荐使用 dva。

而为什么不是 dva，也可以说为什么不是 redux + saga。

因为 bbx 是想要给出一个更简单高效的方式。dva 已经简化了 redux + saga，但底层还是 redux + saga，effects reducer 等概念是少不了的。而在公司内部了解到的真实的项目开发中（超过 300+ Ant Desing Pro 级别项目），发现开发用到的 dva 很少的能力。比如，对于 saga，项目只是调用 call, put，而像 subscriptions 甚至都被不推荐使用。