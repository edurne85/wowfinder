type jsonAble = Record<string, unknown> | [];

function jClone(obj: jsonAble): jsonAble {
    return JSON.parse(JSON.stringify(obj));
}

function sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
}

export {
    jClone,
    sum,
};