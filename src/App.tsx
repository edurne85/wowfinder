import './i18n';

import { debug } from './utils';
import { FullData } from './FullData';
import { GlobalStyle } from './styles/GlobalStyle';
import { RewardsTable, CharacterList, CharacterSheet, Reputations } from './components';
import { useContext } from 'react';
import { GlobalContext } from './components/helpers/GlobalContext';

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
function PrintCharSheet(): JSX.Element {
    const context = useContext(GlobalContext);
    context.forceBlank = true;
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
    });
}

export function App(): JSX.Element {
    const context = useContext(GlobalContext);
    return (
        <GlobalContext.Provider value={context}>
            <GlobalStyle />
            <PrintCharSheet />
        </GlobalContext.Provider>
    );
}
