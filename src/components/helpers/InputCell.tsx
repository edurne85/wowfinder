import React from "react";

type CommonValue = number | string;

interface CellArgs<T> {
    id: string,
    value: T,
    hideZero?: boolean,
    classes?: string[],
}

function InputH({id, value, hideZero = false, classes = []}: CellArgs<CommonValue>) {
    const val = value || (hideZero ? '' : 0);
    const className = classes.length > 0 ? { className: classes.join(' ') } : {};
    return (<th {...className}>
        <input id={id} value={val} readOnly={true} />
    </th>);
}

function InputCell({id, value, hideZero = false, classes = []}: CellArgs<CommonValue>) {
    const val = value || (hideZero ? '' : 0);
    const className = classes.length > 0 ? { className: classes.join(' ') } : {};
    return (<td {...className}>
        <input id={id} value={val} readOnly={true} />
    </td>);
}

function CheckCell({id, value, hideZero = false, classes = []}: CellArgs<boolean>) {
    const className = [...classes, 'check-box'].join(' ');
    return (<td className={className}>
        <input type="checkbox" id={id} checked={value} />
    </td>);
}

function InputSuffixedCell({id, value, suffix }: {id: string, value: number | string, suffix: string}) {
    return(<td>
        <input id={id} value={value} readOnly={true}/>
        <span className="suffix">{suffix}</span>
    </td>);
}

export {
    InputH,
    InputCell,
    CheckCell,
    InputSuffixedCell,
}