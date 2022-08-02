import {event, handler, options} from "../env";
import {Context} from "./context";
import {emit} from "../emit";

export const defaultOptions: options = {
    max_waiting_time: 5000,
    max_cache_len: 5,
}

/**
 * @class Engine
 * Engine作为SDK暴露给用户的接口
 */
export class Engine {
    private handlers: handler[] // 每一个功能点相当于一个handler
    private options: options
    private static instance: Engine | null
    /**
     * 1. 初始化设置
     * 2. 加载用户选择的handlers
     * 3. 加载中间件
     * @param options
     */
    constructor(options: options) {
        this.options = {...defaultOptions, ...options}
        this.handlers = []
    }

    static singleton(options: options) {
        if(!this.instance) {
            this.instance = new Engine(options)
        }
        return this.instance;
    }

    register(handler: handler) {
        this.handlers.push(handler)
    }
    run() {
        let ctx = new Context()
        for (const handler of this.handlers) {
            let e: event = handler(ctx)
            // 对emit的所有filter和interceptor在此进行
            emit(e)
        }
    }
}