[项目参考](https://github.com/M-cheng-web/web-tracing)  
## 功能模块

1. #### SDK

- 用户行为数据：**pv**，**uv**，自定义行为埋点，页面停留时间，用户热点页面
- 异常监控：**JS异常**，**资源异常**，**Promise异常**
- 性能数据监控：**fp**，**fcp**，DOMready, DNS
- HTTP请求监控：**请求链路**，**异常监控**，**成功率**，返回信息

`监控sdk`部分我们需要将其包装成`插件形式`来使用

2. #### 监控应用

- 展示监控数据图表的后台系统
- 后端服务器：保存历史数据

3. #### 被监控应用

- 被监控的前端应用
- 后端服务器：正常返回的api，发生错误的api，慢返回的api

## 用户行为数据
#### PV
用户每次进入页面时上报即可，需要注意`SPA单页面`应用要结合路由跳转
#### UV
服务端根据`cookie`判断PV的第一次上报即为一次UV
## 异常监控
重复异常不应上报，所以要生成`uuid`  
解析`Error对象`里的`错误堆栈`  
需要得到错误代码的行数，如果是打包后的文件因为是混淆的源码，还需要存储着代码混淆前后的位置对应信息`Sourcemap`文件。  
#### JS异常
`window.onerror`捕获全局的JS异常，`addEventListener('error')`不仅可以捕获全局的JS异常，还可以捕获静态资源加载异常  
JS异常带有错误类型参数，例如`SyntaxError`、`TypeError`、`ReferenceError`等  
#### Promise异常
Promise异常会触发`unhandledrejection`事件  
#### React错误捕获
错误边界`ErrorBoundary`里的`componentDidCatch`钩子函数会暴露出异常，这种也需要单独考虑，不知道这种会不会被JS异常暴露出来。然后Vue也有错误捕获，就暂时不考虑了。
## 性能数据监控
`window.performance`获取，`W3C level2`扩充该属性并增加了`PerformanceObserver`  
Google基于此开源了`web-vitals`插件

## HTTP请求监控

请求链路，成功率，返回信息，参考https://help.aliyun.com/document_detail/91587.html
#### HTTP异常
至少需要捕获`具体接口`，`状态码`,`请求参数`。  
`Promise.catch`得不到这些信息，还是需要劫持`XHR`或`Fetch`。
劫持`XHR`或`Fetch`，计算耗时

## 发送方式
将以上监控数据带上时间缓存在`队列`里，分批发送给后端，一个个发送太耗费通信资源。  
为了不影响页面性能，将发送数据这个动作放在`requestIdleCallback`函数里，这个函数是趁着页面刷新间隙执行的，这段时间浏览器是空闲的。
