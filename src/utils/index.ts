type jsonAble = Record<string, unknown> | [];

function jClone(obj: jsonAble): jsonAble {
    return JSON.parse(JSON.stringify(obj));
}

export {
    jClone,
};