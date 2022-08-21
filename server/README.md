李纪奇用node.js起了个后端服务，用来接收前端监控数据  
`npm install`  
`node index.js`  
| 接口说明 | url | 参数 | 方法 |
| ---- | ---- | ---- | ----- |
| 区间时间内异常总数（js异常，promise异常，console.log）| http://localhost:8080/error/getNoneResourceError | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内资源请求错误 | http://localhost:8080/error/getResourceError | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内Http请求错误 | http://localhost:8080/http/getError | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内Http请求成功率 | http://localhost:8080/http/getSuccessRate | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内页面浏览量 | http://localhost:8080/userData/getPV | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内用户浏览量 | http://localhost:8080/userData/getUV | {start: 1660965092649, end: 1660980047881} | POST |
| 使用最多的浏览器 | http://localhost:8080/userData/getPopularBrowser | {start: 1660965092649, end: 1660980047881} | POST |
| 区间时间内性能数据 | http://localhost:8080/performance/getData | {start: 1660965092649, end: 1660980047881} | POST |
