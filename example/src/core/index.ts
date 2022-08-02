import './src/performance/index'
import {Context} from "./src/context/context";
import {performanceHandler} from "./src/performance";
import {Engine} from "./src/context/engine";

let myOptions = {}
const e = Engine.singleton(myOptions)
// 注册自定义Handler
e.register(performanceHandler)
e.run()


console.log('monitor plugin installed')

// for debug
// console.log(performance.getEntriesByType('paint'))