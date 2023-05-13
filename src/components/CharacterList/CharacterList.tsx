import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Character } from '../../types/Character';

const CharacterPickerP = styled.p`
    font-size: 14pt;
    font-weight: bold;
    padding: 0.25em 1em;
    cursor: pointer;
    &:hover {
        background: #daf;
    }
    a {
        color: black;
        text-decoration: none;
    }
`;

interface CharacterListProps {
    chars: { [key: string]: Character };
}

function CharacterList({ chars }: CharacterListProps): JSX.Element {
    const activeCharKeys = Object.keys(chars)
        .filter(k => chars[k].active)
        .sort();
    return (
        <div>
            {activeCharKeys.map(key => (
                <CharacterPickerP key={key}>
                    <Link to={`/chars/:${key}`}>{chars[key].fullName}</Link>
                </CharacterPickerP>
            ))}
        </div>
    );
}

export { CharacterList };
