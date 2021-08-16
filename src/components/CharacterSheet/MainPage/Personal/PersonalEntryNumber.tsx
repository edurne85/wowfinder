import styled from "styled-components";
import { borderless, bottomLine } from "../../../helpers/mixins";
import { PersonalEntry, PersonalItemProps } from "./base";

const StyledInput = styled.input`
    display: block;
    ${borderless}
    ${bottomLine}
    max-width: 100%;
    text-align: right;
`;

class PersonalEntryNumber extends PersonalEntry<number> {
    subRender({
        id,
        value = 0,
    }: PersonalItemProps<number>) {
        return (<StyledInput id={`txt${id}`} value={value} readOnly={true} />);
    }
}

// TODO: Migrate to utils

const factor = 1000;
function fThousands (value: number, sep: string = ' '): string {
    if (value < 0) {
        return '-' + fThousands(-value, sep);
    }
    const blocks = [];
    do {
        blocks.push(value % factor);
        value = Math.floor(value / factor);
    } while (value > 0);
    return blocks.reverse().map(num => num.toString().padStart(3, '0')).join(sep).replace(/^0+/, '');
}

const suffixes = [
    '', 'k', 'M', 'G',
]

class PersonalEntryBigNumber extends PersonalEntry<number> {
    subRender({
        id,
        value = 0,
    }: PersonalItemProps<number>) {
        const maxS = suffixes.length;
        let v = value;
        let s = 0;

        while (v % 1000 === 0 && s < maxS - 1) {
            v /= 1000;
            s += 1;
        }

        return (<StyledInput id={`txt${id}`} value={`${fThousands(v)}${suffixes[s]}`} readOnly={true} />);
    }
}

export default PersonalEntryNumber

export {
    PersonalEntryNumber,
    PersonalEntryBigNumber
}
