# 展示监控数据图表的后台系统
建议使用yarn v3进行管理

## get start
```js
yarn 
yarn dev
```
## 命令解释
```js
//调试模式，每一次路由跳转都将从头渲染页面
yarn dev 
//生产模式，缓存页面内容进行ssr渲染
yarn build && yarn start
//如果需要修改端口直接使用 -p ${port}，如
yarn dev -p 3030
```