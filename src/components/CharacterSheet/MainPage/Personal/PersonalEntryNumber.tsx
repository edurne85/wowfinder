import styled from 'styled-components';
import { fThousands } from '../../../../utils';
import { borderless, bottomLine } from '../../../helpers/styles';
import { PersonalEntry, PersonalItemProps } from './base';

const StyledInput = styled.input`
    display: block;
    ${borderless}
    ${bottomLine}
    max-width: 100%;
    text-align: right;
`;

class PersonalEntryNumber extends PersonalEntry<number> {
    subRender({ id, value }: PersonalItemProps<number>): React.JSX.Element {
        const v = value != null ? value : '';
        return <StyledInput id={`txt${id}`} value={v} readOnly={true} />;
    }
}

const suffixes = ['', 'k', 'M', 'G'];

class PersonalEntryBigNumber extends PersonalEntry<number> {
    subRender({ id, value }: PersonalItemProps<number>): React.JSX.Element {
        let val = '';
        if (value != null) {
            const maxS = suffixes.length;
            let v = value;
            let s = 0;

            while (v % 1000 === 0 && s < maxS - 1) {
                v /= 1000;
                s += 1;
            }
            val = `${fThousands(v)}${suffixes[s]}`;
        }

        return <StyledInput id={`txt${id}`} value={val} readOnly={true} />;
    }
}

export default PersonalEntryNumber;

export { PersonalEntryNumber, PersonalEntryBigNumber };
