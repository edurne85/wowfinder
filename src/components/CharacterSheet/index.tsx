import Character from '../../@types/Character';
import { MainPage } from './MainPage';

export function CharacterSheet({char}: {char: Character}) {
    return (<>
        <MainPage char={char} />
    </>);
}