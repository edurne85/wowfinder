import { useContext } from 'react';
import { CharacterList, CharacterSheet, Reputations, RewardsTable } from './components';
import { GlobalContext } from './components/helpers/GlobalContext';
import { FullData } from './FullData';
import './i18n';
import { GlobalStyle } from './styles/GlobalStyle';
import { debug } from './utils';

import { Spell } from './components/Spells';

const data = FullData.import();

function RewTable(): JSX.Element {
    return (
        <RewardsTable
            chars={data.chars}
            factions={Object.values(data.factions.byKey)}
            data={data.rewards}
        />
    );
}
function CharList(): JSX.Element {
    return <CharacterList chars={data.chars} rewards={data.rewards} />;
}
function TestCharSheet({ charName }: { charName: string }): JSX.Element {
    return (
        <CharacterSheet
            char={data.chars[charName]}
            xp={data.rewards[charName]?.XP || 0}
        />
    );
}

function TestSpell({spellKey}: {spellKey: string}): JSX.Element {
    return <Spell spell={data.spells[spellKey]} />;
}

function PrintCharSheet(): JSX.Element {
    const context = useContext(GlobalContext);
    context.forceBlank = true;
    context.forcePages.magic = true;
    return (
        <GlobalContext.Provider value={context}>
            <CharacterSheet />
        </GlobalContext.Provider>
    );
}

if (debug) {
    console.log('Imported data', data);
    console.log('Test components', {
        Reputations,
        RewTable,
        CharList,
        TestCharSheet,
        PrintCharSheet,
        TestSpell,
    });
}

export function App(): JSX.Element {
    const context = useContext(GlobalContext);
    return (
        <GlobalContext.Provider value={context}>
            <GlobalStyle />
            { /* <TestSpell spellKey='enlargePerson' /> */}
            <TestCharSheet charName="garet" />
        </GlobalContext.Provider>
    );
}
