import styled from 'styled-components';
import { borderless, bottomLine } from '../../../helpers/mixins';
import { PersonalEntry, PersonalItemProps } from './base';

const sharedStyle = `
    display: block;
    ${borderless}
    ${bottomLine}
    max-width: 100%;
`;

const StyledInput = styled.input`
    ${sharedStyle}
`;

const StyledInputCentered = styled.input`
    ${sharedStyle}
    text-align: center;
`;

class PersonalEntryText extends PersonalEntry<string> {
    subRender({
        id,
        value,
    }: PersonalItemProps<string>): JSX.Element {
        return (<StyledInput id={`txt${id}`} value={value || ''} readOnly={true} />);
    }
}

class PersonalEntryTextCentered extends PersonalEntry<string> {
    subRender({
        id,
        value,
    }: PersonalItemProps<string>): JSX.Element {
        return (<StyledInputCentered id={`txt${id}`} value={value || ''} readOnly={true} />);
    }
}

export default PersonalEntryText;

export {
    PersonalEntryText,
    PersonalEntryTextCentered,
};
