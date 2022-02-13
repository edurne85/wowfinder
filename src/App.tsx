import { GlobalStyle } from './styles/GlobalStyle';

import { CharacterList } from './components/CharacterList';
import { RewardsTable } from './components/RewardsTable';

import Adventure from './@types/Adventure';
import Faction, { Reputation } from './@types/Faction';
import Character from './@types/Character';
import Class from './@types/Character/Class';
import './i18n';
import { useTranslation } from 'react-i18next';
import { CharacterSheet } from './components/CharacterSheet';
import { debug } from './utils';
import { Gear } from './@types/Items/Gear/base';
import { buildGear } from './@types/Items/Gear';

const factions = Faction.import();
const chars = Character.import();
const adventures = Adventure.import();
const rewards = Adventure.combined(adventures);
const classes = Class.import();
const gear = Gear.import(undefined, buildGear);

function Rep(r: string): JSX.Element {
    const { t } = useTranslation();
    return <li>{t(`reputation.${r}`)}</li>;
}
function Reputations(): JSX.Element {
    return <ul>{Object.keys(Reputation).map(Rep)}</ul>;
}

function RewTable(): JSX.Element {
    return (
        <RewardsTable
            chars={chars}
            factions={Object.values(factions.byKey)}
            data={rewards}
        />
    );
}
function CharList(): JSX.Element {
    return <CharacterList chars={chars} rewards={rewards} />;
}
function TestCharSheet({charName}: {charName: string}): JSX.Element {
    return <CharacterSheet char={chars[charName]} xp={rewards[charName]?.XP || 0} />;
}
function PrintCharSheet(): JSX.Element {
    return <CharacterSheet />;
}

if (debug) {
    console.log('Imported data', {
        factions,
        chars,
        adventures,
        rewards,
        classes,
        gear,
    });
    console.log('Test components', {
        Reputations,
        RewTable,
        CharList,
        TestCharSheet,
        PrintCharSheet,
    });
}

export function App(): JSX.Element {
    return (
        <>
            <GlobalStyle />
            <PrintCharSheet />
        </>
    );
}
