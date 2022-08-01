import {Engine} from "./engine";

export class Group {
    private groupName: string
    private engine: Engine
    constructor(groupName: string, engine: Engine) {
        this.groupName = groupName
        this.engine = engine
    }
}