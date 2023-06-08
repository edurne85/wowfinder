import { useContext, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { FullData } from './types/FullData';
import {
    GlobalContext,
    GlobalContextType,
} from './components/helpers/GlobalContext';
import { initTranslations } from './i18n';
import { getRoutes } from './Routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { assertNonNull, DebugTimer, skipAssetDump } from './utils';
import { LoadingStages, SplashWrapper } from './components/Splash';

initTranslations();

type SetStage = (stage: LoadingStages) => void;

let loadStarted = false;
function preLoad(context: GlobalContextType, setStage: SetStage): void {
    if (loadStarted) return;
    loadStarted = true;
    DebugTimer.execute('preLoad', log => {
        log('started');
        if (skipAssetDump) {
            log('assetDump skipped');
        } else {
            setStage(LoadingStages.assetDump);
            window.Files.assetDump();
            log('assetDump done');
        }
        setStage(LoadingStages.loading);
        context.data = FullData.load();
        log('data loaded');
        context.routes = getRoutes(context.data);
        context.router = createHashRouter(context.routes);
        log('router created');
        setStage(LoadingStages.done);
    });
}

export function App(): React.JSX.Element {
    const context = useContext(GlobalContext);
    const [stage, setStage] = useState<LoadingStages | null>(null);
    preLoad(context, setStage);
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
