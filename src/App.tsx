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
import { initTranslations } from './i18n';
import { getRoutes } from './Routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { debug, debugOutput, exportByCharsAsJsonAssets } from './utils';

initTranslations();

const data = FullData.load();

function RewTable(): React.JSX.Element {
    return (
        <RewardsTable
            chars={data.chars}
            factions={Object.values(data.factions.byKey)}
            data={data.rewards}
        />
    );
}
function CharList(): React.JSX.Element {
    return <CharacterList chars={data.chars} /* rewards={data.rewards} */ />;
}
function TestCharSheet({ charName }: { charName: string }): React.JSX.Element {
    return (
        <CharacterSheet
            char={data.chars[charName]}
            xp={data.rewards[charName]?.XP || 0}
        />
    );
}

function TestSpell({ spellKey }: { spellKey: string }): React.JSX.Element {
    return <Spell spell={data.spells[spellKey]} />;
}

function PrintCharSheet(): React.JSX.Element {
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
        naia: exportByCharsAsJsonAssets(data, 'garet', 'benel'),
        andrea: exportByCharsAsJsonAssets(data, 'keina'),
        estanis: exportByCharsAsJsonAssets(data, 'mythea'),
        alex: exportByCharsAsJsonAssets(data, 'dael'),
        txema: exportByCharsAsJsonAssets(data, 'bhuldirm'),
        joana: exportByCharsAsJsonAssets(data, 'arianna', 'kaliri'),
    });
}

const routes = getRoutes(data);
const router = createHashRouter(routes);

export function App(): React.JSX.Element {
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
