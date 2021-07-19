type jsonAble = object | [];

function jClone(obj: jsonAble): jsonAble {
    return JSON.parse(JSON.stringify(obj));
}

export {
    jsonAble,
    jClone,
}