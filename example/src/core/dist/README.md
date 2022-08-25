该sdk采用Typescript开发

项目仓库地址：

## 使用方法
用户可以自定义配置：

以下都为可选值
- 上报给监控后台的url 
- 请求池大小
- 请求时间间隔
- 请求过滤url
- react错误边界



```js
1、npm i nuhchun-monitor  //安装
2、import { initMonitor,ReactBoundary } from 'nuhchun-monitor'  //导入
3、
initMonitor({//初始化
        setsetEmitUrl: 'http://1.15.77.73:8080/', //发送给监测后台的url地址
        setEmitLen: 5 ,  //请求池的大小
        setEmitTime: 5000 , //请求时间间隔 ms
        setUrlIgnoreList: ['apifox.com'] //请求过滤url，即发送给apifox.com的请求不会对其监控
}
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/err" element={<ReactBoundary> <Err /> <BuggyCounter /> </ReactBoundary>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
```
如要使用react错误边界：

-   导入 ReactBoundary ，自定义用ReactBoundary组件包裹即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b418b3f26927421dbc44773876e5ce21~tplv-k3u1fbpfcp-zoom-1.image)

由<BuggyCounter />组件抛出的错误会被错误边界捕获到

## 功能模块

1. #### SDK

- 用户行为数据：**pv**，**uv**
- 异常监控：**JS异常**，**HTTP异常**，**资源异常**，**Promise异常**
- 性能数据监控：**fp**，**fcp**，**DOMready**, **DNS**,...
- HTTP请求监控：**成功率**，**请求过滤**，**请求监控**

`监控sdk`部分将其包装成`插件形式`来使用

2. #### 监控应用

- 展示监控数据图表的后台系统
- 后端服务器：保存历史数据


地址：[td.nuhchun](url)





**发送方式：**

将以上监控数据带上时间缓存在`队列`里，分批发送给后端，一个个发送太耗费通信资源。  
为了不影响页面性能，将发送数据这个动作放在`requestIdleCallback`函数里，这个函数是趁着页面刷新间隙执行的，这段时间浏览器是空闲的。



**数据上报：**

-   上报采用`requestIdleCallback`（帧的空闲发送）和`Navigator.sendBeacon`

<!---->

-   负责维护一个缓存`队列`，按照一定的队列长度和缓存时间间隔来聚合上报数据，会开放一些方法自定义缓存队列长度和缓存间隔时间

<!---->

-   用户自定义配置项：用户可自定义缓存队列长度、缓存间隔时间、请求过滤url地址

**性能监控：**

-   `DNS`、`Dom Ready`、`Load` 性能参数根据 `Navigation timing` 获取。`window.performance.getEntriesByType("navigation")`，`Navigation timing`时间精度可以达毫秒的小数点好几位，精度比`performance.timing`高，但兼容性差。

<!---->

-   FP 和 FCP 通过`new PerformanceObserver`(性能监视器)方法获取。`entryTypes`(入口类型)为 paint 的元素渲染。

**用户监控：**

-   PV：用户每次进入页面时上报即可，需要注意`SPA单页面`应用要结合路由跳转

<!---->

-   UV：服务端根据`cookie`判断PV的第一次上报即为一次UV

**异常监控：**

异常错误的上报用`Set`去重

-   js异常： `window.onerror`采集js异常并上报

<!---->

-   资源异常：`window.addEventListener`监听`error`事件，`window.onerror`和`addeventlistener``('``error``', handler, true)`都会监控到js异常，所以资源异常监控要判断是否存在src/image属性过滤

<!---->

-   promise异常：监听`unhandledrejection`事件

<!---->

-   console异常：对`console.error`重写，保存原方法并通过call调用

<!---->

-   react错误边界：通过`ErrorBoundary`组件包裹（用户自定义），可监听里面的子组件的渲染异常，并展示兜底ui组件替换崩溃的组件树

    -   错误边界是包含下面任意一个或两个方法的class组件：
    -   `static getDerivedStateFromError()` ：可捕获子组件的错误，渲染备用 UI，做降级处理
    -   `componentDidCatch()` ：打印上报错误信息

**请求监控：**

-   http请求异常：对xhr的`open`和`send`方法，`window.fetch`的重写实现，实现了请求url过滤（用户可自定义过滤url），在过滤列表内的url地址不会对其监听。手动`new Error().stack`抛出错误堆栈

<!---->

-   劫持是怎么实现的？ 劫持send方法，通过`this.add``E``ventlistener`监听xml实例的`readystatechange`事件，在事件监听 的回调判断状态码中对数据处理（比如发送的延时、持续时间、状态码、请求的类型、响应内容）并发送到到后台监测系统。

**Rollup打包：**

-   Rollup打包后上传npm包


## 功能测试

###  SDK

-   请求监控、用户自定义配置、请求过滤url功能✔️

<!---->

-   js异常、promise异常、资源加载异常捕获✔️

<!---->

-   console异常、react错误边界捕获✔️

<!---->

-   用户pv、uv等监控功能✔️

<!---->

-   性能数据、路由切换监控✔️
