const debug = true;
const debugStyle = 'background-color: #cfc;';

type debugFunction = (title: string, style?: string, data?: any) => any;

function debugCall({func, title, style = debugStyle, data}: {func: debugFunction, title: string, style?: string, data?: any}): void {
    if (debug) {
        func(`%c${title}`, style, data);
    }
}

function debugOutput(title: string, data?: any): void {
    debugCall({func: console.log, title, data});
}
function debugTrace(title: string, data?: any): void {
    debugCall({func: console.trace, title, data});
}

export {
    debug,
    debugOutput,
    debugTrace,
};