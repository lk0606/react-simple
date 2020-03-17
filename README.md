# react-simple
A simplified version of react

# 参考资料
[B站视频地址](https://www.bilibili.com/video/av84083358?p=2)

# 学习记录
1. jsx and virtual dom
2. 真正明白`react`中事件为什么要`bind`来绑定`this`  
```javascript
/**
* call apply bind 区别
* 传参形式不同 
* call(this, [arg1, arg2, ...args])
* bind/apply (this, arg1, arg2, ...args)     arg1, arg2, ...args === ...[arg1, arg2, ...args]
* 执行时机不同
* call apply 立即执行 只执行一次
* bind 需要主动触发 可以执行多次
* 类似于函数调用 举例说明
*/

```
- 在`virtual dom`中，事件函数会直接被赋值给对应事件，此时相当于执行一次，事件是可以重复触发的，所以需要`bind this`，详情请看目录`./index.js`和`./react-dom/index.js`日志
- 在原生中，`call apply`点击时会立即执行，而`bind`则需要增加`()`在执行一次，详见`./index.html`
- `this`取值严格依赖执行环境，例如原生`./index.html`中，是`div`触发，所以绑定`this`永远指向它本身，而`./index.js`中，真正执行环境需要到`./react-dom/index.js`中去判断，`react`中使用`bind`绑定`this`，此时的`this`正是`React`对象本身  
![调用函数](https://github.com/lk0606/react-simple/blob/master/static/log-img/this/1.jpg)  
![执行环境](https://github.com/lk0606/react-simple/blob/master/static/log-img/this/2.jpg)  
![执行结果对比](https://github.com/lk0606/react-simple/blob/master/static/log-img/this/3.jpg)
