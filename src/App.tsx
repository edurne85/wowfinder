import { useContext } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { FullData } from './types/FullData';
import {
    CharacterList,
    CharacterSheet,
    Reputations,
    RewardsTable,
} from './components';
import { GlobalContext } from './components/helpers/GlobalContext';
import { Spell } from './components/Spells';
import './i18n';
import { getRoutes } from './Routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { debug, debugOutput, exportByChars } from './utils';

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
    return <CharacterList chars={data.chars} /* rewards={data.rewards} */ />;
}
function TestCharSheet({ charName }: { charName: string }): JSX.Element {
    return (
        <CharacterSheet
            char={data.chars[charName]}
            xp={data.rewards[charName]?.XP || 0}
        />
    );
}

function TestSpell({ spellKey }: { spellKey: string }): JSX.Element {
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
    debugOutput('Players', {
        naia: exportByChars(data, 'garet', 'benel'),
        andrea: exportByChars(data, 'keina'),
        estanis: exportByChars(data, 'mythea'),
        alex: exportByChars(data, 'dael'),
        txema: exportByChars(data, 'bhuldirm'),
        joana: exportByChars(data, 'arianna', 'kaliri'),
    });
}

const routes = getRoutes(data);
const router = createHashRouter(routes);

export function App(): JSX.Element {
    const context = useContext(GlobalContext);
    context.routes = routes;
    return (
        <GlobalContext.Provider value={context}>
            <GlobalStyle />
            {/* <TestSpell spellKey='enlargePerson' /> */}
            <RouterProvider router={router} />
        </GlobalContext.Provider>
    );
}
