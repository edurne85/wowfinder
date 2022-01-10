import React from 'react';
import { nextScore, reputationByScoreNullable, threshholds } from '../../@types/Faction';

type CommonValue = number | string;

interface CellArgs<T> {
    id: string,
    value?: T,
    hideZero?: boolean,
    classes?: string[],
}

interface CellArgsStrict<T> {
    id: string,
    value: T,
    hideZero?: boolean,
    classes?: string[],
}

function mkClassName(...classes: string[]): { className?: string } {
    return classes.length > 0 ? { className: classes.join(' ') } : {};
}

function InputH({id, value, hideZero = false, classes = []}: CellArgs<CommonValue>): JSX.Element {
    const val = value != null ? value || (hideZero ? '' : 0) : '';
    const className = mkClassName(...classes);
    return (<th {...className}>
        <input id={id} value={val} readOnly={true} />
    </th>);
}

function InputCell({id, value, hideZero = false, classes = []}: CellArgs<CommonValue>): JSX.Element {
    const val = value != null ? value || (hideZero ? '' : 0) : '';
    const className = mkClassName(...classes);
    return (<td {...className}>
        <input id={id} value={val} readOnly={true} />
    </td>);
}

function ReputationCell({value, classes = []}: CellArgsStrict<number>): JSX.Element {
    const className = mkClassName(...classes);
    const tier = reputationByScoreNullable(value);
    let bottom = '';
    if (tier) {
        const threshhold = threshholds[tier] || 0;
        const current = value - threshhold;
        const next = nextScore(value) - threshhold;
        bottom = `${current}/${next}`;
    }
    return (<td {...className} title={`total: ${value}`}>
        <p>{tier || 'unknown'}</p>
        <p>{bottom}</p>
    </td>);
}

function CheckCell({id, value, classes = []}: CellArgs<boolean>): JSX.Element {
    const className = [...classes, 'check-box'].join(' ');
    return (<td className={className}>
        <input type="checkbox" id={id} checked={value} readOnly={true} />
    </td>);
}

function InputSuffixedCell({id, value, suffix }: {id: string, value: number | string, suffix: string}): JSX.Element {
    return(<td>
        <input id={id} value={value} readOnly={true}/>
        <span className="suffix">{suffix}</span>
    </td>);
}

export {
    InputH,
    InputCell,
    CheckCell,
    ReputationCell,
    InputSuffixedCell,
};