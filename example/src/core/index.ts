import './src/performance/index'
import {Context} from "./src/context/context";
import {performanceHandler} from "./src/performance";
import {engine, defaultOptions} from "./src/context/engine";

const e = new engine(defaultOptions) // 唯一的一次new engine
e.register(performanceHandler)
e.run()


console.log('monitor plugin installed')

console.log(performance.getEntriesByType('paint'))