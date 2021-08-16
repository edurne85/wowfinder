import Character from '../../@types/Character';
import { MainPage } from './MainPage';

export function CharacterSheet({char, xp = 0}: {char: Character, xp: number}) {
    return (<>
        <MainPage char={char} xp={xp}/>
    </>);
}