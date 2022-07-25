/**
 * performance data
 */
import {Context} from "./context/context";

export interface performance {
    duration?: number
}

/*
*  user data
* */
export interface user {

}

/**
 * event is monitor data unit
 * @param {*} type Error | Performance | User
 * @param {*} name the name of event
 * @param {*} data the data of event
 * @param {*} uuid the uuid of event
 * @param {*} timeStamp the timeStamp of event
 * @param {*} browser the browser of event
 * @param {*} platform the platform of event
 * @param {*} sessionId the sessionId of event
 * @param {*} userUuid the userUuid of event
 */
export interface event {
    type: 'Error' | 'Performance' | 'User' | 'Request'
    name: string
    data: performance | user | any // todo: temp
    uuid?: string
    timeStamp?: number
    browser?: string
    platform?: string
    sessionId?: string
    userUuid?: string
}

export interface options {
    max_cache_len?: number
    max_waiting_time?: number
}

export interface handler {
    (ctx: Context): event
}