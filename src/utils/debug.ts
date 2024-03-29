const debug = false;
const debugStyleColors = {
    log: '#cfc',
    warn: '#ffc',
    error: '#fcc',
    group: '#ccc',
    trace: '#cff',
    wip: '#fa4',
} as const;

const skipAssetDump = false;

type debugFunction = (title: string, style?: string, data?: any) => any;

function unreachable(value?: never): never {
    throw new Error(`Unreachable code reached: ${value}`);
}

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

function debugTrace(title: string, data?: any): void {
    debugCall({
        func: console.trace,
        title,
        data,
        color: debugStyleColors.trace,
    });
}

function debugBreakpoint(): void {
    if (debug) {
        // eslint-disable-next-line no-debugger
        debugger;
    }
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
    debugTrace,
    debugBreakpoint,
    reportWiP,
    reportNotImplemented,
    tryOrFallback,
    unreachable,
};
