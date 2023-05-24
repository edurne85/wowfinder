const debug = true;
const debugStyleColors = {
    log: '#cfc',
    warn: '#ffc',
    error: '#fcc',
    group: '#ccc',
    trace: '#cff',
    wip: '#fa4',
} as const;

const skipAssetDump = true;

type debugFunction = (title: string, style?: string, data?: any) => any;

function debugCall({
    func,
    title,
    color,
    data,
}: {
    func: debugFunction;
    title: string;
    color: (typeof debugStyleColors)[keyof typeof debugStyleColors];
    data?: any;
}): void {
    if (debug) {
        const style = `font-weight: bold; background-color: ${color}; color: black`;
        func(`%c ${title} `, style, data);
    }
}

function debugOutput(title: string, data?: any): void {
    debugCall({ func: console.log, title, data, color: debugStyleColors.log });
}

function debugError(title: string, data?: any): void {
    debugCall({
        func: console.error,
        title,
        data,
        color: debugStyleColors.error,
    });
}

function debugGroup(title: string, data?: any): void {
    debugCall({
        func: console.groupCollapsed,
        title,
        data,
        color: debugStyleColors.group,
    });
}

function debugGroupEnd(): void {
    debugCall({
        func: console.groupEnd,
        title: '',
        color: debugStyleColors.group,
    });
}

function debugTime(title: string): void {
    if (debug) {
        console.time(title);
    }
}

function debugTimeLog(title: string, ...data: any[]): void {
    console.timeLog(title, ...data);
}

function debugTimeEnd(title: string): void {
    if (debug) {
        console.timeEnd(title);
    }
}

function debugTrace(title: string, data?: any): void {
    debugCall({
        func: console.trace,
        title,
        data,
        color: debugStyleColors.trace,
    });
}

function reportWiP(data?: any): void {
    debugCall({
        func: console.log,
        title: 'WiP',
        data,
        color: debugStyleColors.wip,
    });
}

function reportNotImplemented(key: string): void {
    debugError(`Not implemented: ${key}`);
}

function tryOrFallback<T>(action: () => T, fallback: T): T {
    try {
        return action();
    } catch (ex: any) {
        debugError(`Error: ${ex}`);
        return fallback;
    }
}

export {
    debug,
    skipAssetDump,
    debugOutput,
    debugError,
    debugGroup,
    debugGroupEnd,
    debugTime,
    debugTimeLog,
    debugTimeEnd,
    debugTrace,
    reportWiP,
    reportNotImplemented,
    tryOrFallback,
};
