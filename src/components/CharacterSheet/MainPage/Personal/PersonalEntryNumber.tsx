import styled from "styled-components";
import { fThousands } from "../../../../utils";
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
