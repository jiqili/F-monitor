import {event, handler, options} from "../env";
import {Context} from "./context";
import {emit} from "../emit";

export const defaultOptions: options = {
    max_waiting_time: 5000,
    max_cache_len: 5,
}

export class engine {
    private handlers: handler[]
    constructor(options: options) {
        //todo: load options
        this.handlers = []
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