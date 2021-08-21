import Character from '../../@types/Character';
import { MainPage } from './MainPage';
import { SkillsPage } from './SkillsPage';

export function CharacterSheet({char, xp = 0}: {char: Character, xp: number}) {
    return (<>
        <MainPage char={char} xp={xp} />
        <SkillsPage char={char} />
        { /* TODO: Gear page(s) */}
    </>);
}