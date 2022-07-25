class Context {
    public navigationEntry: PerformanceNavigationTiming
    // private paintEntry: PerformancePaintTiming;
    constructor() {
        const [perfEntries] = performance.getEntriesByType("navigation");
        this.navigationEntry = perfEntries as PerformanceNavigationTiming

    }
}


export {Context}