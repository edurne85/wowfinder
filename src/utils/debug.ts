const debug = true;
const debugStyle = 'background-color: #cfc; color: black; font-weight: bold;';

type debugFunction = (title: string, style?: string, data?: any) => any;

function debugCall({
    func,
    title,
    style = debugStyle,
    data,
}: {
    func: debugFunction;
    title: string;
    style?: string;
    data?: any;
}): void {
    if (debug) {
        func(`%c ${title} `, style, data);
    }
}

function debugOutput(title: string, data?: any): void {
    debugCall({ func: console.log, title, data });
}

function debugError(title: string, data?: any): void {
    debugCall({ func: console.error, title, data });
}

function debugGroup(title: string, data?: any): void {
    debugCall({ func: console.groupCollapsed, title, data });
}

function debugGroupEnd(): void {
    debugCall({ func: console.groupEnd, title: '' });
}

function debugTrace(title: string, data?: any): void {
    debugCall({ func: console.trace, title, data });
}

function reportWiP(data?: any): void {
    console.log(
        '%c WiP ',
        'font-weight: bold; background-color: #fa4; color: black',
        data,
    );
}

function reportNotImplemented(key: string): void {
    debugCall({
        func: console.error,
        title: `Not implemented: ${key}`,
    });
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
    debugOutput,
    debugError,
    debugGroup,
    debugGroupEnd,
    debugTrace,
    reportWiP,
    reportNotImplemented,
    tryOrFallback,
};
