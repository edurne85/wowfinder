import { useContext, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { FullData } from './types/FullData';
import {
    CharacterList,
    CharacterSheet,
    Reputations,
    RewardsTable,
} from './components';
import {
    GlobalContext,
    GlobalContextType,
} from './components/helpers/GlobalContext';
import { Spell } from './components/Spells';
import { initTranslations } from './i18n';
import { getRoutes } from './Routes';
import { GlobalStyle } from './styles/GlobalStyle';
import {
    assertDefined,
    assertNonNull,
    debug,
    debugOutput,
    exportByCharsAsJsonAssets,
} from './utils';
import { LoadingStages, SplashWrapper } from './components/Splash';

debugOutput('App', { debug, NODE_ENV: process.env.NODE_ENV });

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

debugOutput('Imported data', data);
debugOutput('Test components', {
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

type SetStage = (stage: LoadingStages) => void;

let loadStarted = false;
function preLoad(context: GlobalContextType, setStage: SetStage): void {
    if (loadStarted) return;
    loadStarted = true;
    setTimeout(() => {
        setStage(LoadingStages.loading);
        context.data = FullData.load();
        assertDefined(context.data);
        context.routes = getRoutes(context.data);
        context.router = createHashRouter(context.routes);
        setStage(LoadingStages.done);
    }, 0);
}

export function App(): React.JSX.Element {
    const context = useContext(GlobalContext);
    const [stage, setStage] = useState<LoadingStages | null>(null);
    preLoad(context, setStage);
    // context.routes = routes;
    return (
        <>
            <GlobalStyle />
            <SplashWrapper
                stage={stage}
                finalStage={LoadingStages.done}
                FollowUp={() => {
                    assertNonNull(context.router);
                    return (
                        <>
                            {/* <TestSpell spellKey='enlargePerson' /> */}
                            <RouterProvider router={context.router} />
                        </>
                    );
                }}
            />
        </>
    );
}
