import React from 'react';

import styled from 'styled-components';
import { smallText } from '../../../helpers/mixins';

interface PersonalItemProps<T> {
    id: string;
    label: string;
    width: number;
    value?: T | null;
}

const Below = styled.span`
    display: block;
    ${smallText}
    max-width: 100%;
`;

abstract class PersonalEntry<T> extends React.Component<PersonalItemProps<T>> {
    render(): JSX.Element {
        const Label = styled.label`
            display: inline-block;
            width: ${this.props.width}mm;
            margin: 0 1mm;
        `;
        return (
            <Label id={`lbl${this.props.id}`}>
                {this.subRender(this.props)}
                <Below>{this.props.label}</Below>
            </Label>
        );
    }

    abstract subRender(props: PersonalItemProps<T>): JSX.Element;
}

export { PersonalItemProps, PersonalEntry };
