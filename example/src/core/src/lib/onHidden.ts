import {OnHiddenCallback} from "../env";

export const onHidden = (cb: OnHiddenCallback, once?: boolean) => {
    const onHiddenOrPageHide = (event: Event) => {
        if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
            cb(event)
            if (once) {
                document.removeEventListener('visibilitychange', onHiddenOrPageHide, true)
                document.removeEventListener('pagehide', onHiddenOrPageHide, true)
            }
        }
    }
    document.addEventListener('visibilitychange', onHiddenOrPageHide, true)
    // Some browsers have buggy implementations of visibilitychange,
    // so we use pagehide in addition, just to be safe.
    document.addEventListener('pagehide', onHiddenOrPageHide, true)
}