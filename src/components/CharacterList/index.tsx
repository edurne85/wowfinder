import Character from '../../@types/Character';
import { Reward, Rewards } from '../../@types/Rewards';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;
`;
const ListPanel = styled.div`
    width: 20em;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #213;
`;
const CharacterSheet = styled.div``;

const CharacterPickerP = styled.p`
    font-size: 14pt;
    font-weight: bold;
    padding: 0.25em 1em;
    cursor: pointer;
    &:hover {
        background: #426;
    }
`;

function selectCharacter(char: Character) {
    // TODO
    console.log('selectCharacter', char);
}

function CharacterPicker({char, rewards}: {char: Character, rewards: Reward}) {
    return (<CharacterPickerP onClick={() => selectCharacter(char)}>
        {char.fullName}
    </CharacterPickerP>);
}

export function CharacterList({chars, rewards}: {chars: {[key:string]: Character}, rewards: Rewards}) {
    const activeCharKeys = Object.keys(chars).filter(k => chars[k].active).sort();
    return (<Container>
        <ListPanel>
            {activeCharKeys.map(k => CharacterPicker({char: chars[k], rewards: rewards[k]}))}
        </ListPanel>
        <CharacterSheet />
    </Container>);
}