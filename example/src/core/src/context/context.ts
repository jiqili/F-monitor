/**
 * @class Context
 * Context中包含用户在访问页面时需要记录的所有数据
 * 每次用户访问页面会产生一个新的Context实例
 */
class Context {
    public navigationEntry: PerformanceNavigationTiming
    // private paintEntry: PerformancePaintTiming;
    constructor() {
        const [perfEntries] = performance.getEntriesByType("navigation");
        this.navigationEntry = perfEntries as PerformanceNavigationTiming

    }
}


export {Context}