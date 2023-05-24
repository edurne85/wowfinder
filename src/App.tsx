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
import { assertNonNull } from './utils';
import { LoadingStages, SplashWrapper } from './components/Splash';
import {
    debugTime,
    debugTimeEnd,
    debugTimeLog,
    skipAssetDump,
} from './utils/debug';

initTranslations();

type SetStage = (stage: LoadingStages) => void;

let loadStarted = false;
function preLoad(context: GlobalContextType, setStage: SetStage): void {
    if (loadStarted) return;
    loadStarted = true;
    setTimeout(() => {
        debugTime('preLoad');
        debugTimeLog('preLoad', 'preLoad started');
        if (skipAssetDump) {
            debugTimeLog('preLoad', 'preLoad assetDump skipped');
        } else {
            setStage(LoadingStages.assetDump);
            window.Files.assetDump();
            console.timeLog('preLoad', 'preLoad assetDump done');
        }
        setStage(LoadingStages.loading);
        context.data = FullData.load();
        debugTimeLog('preLoad', 'preLoad data loaded');
        context.routes = getRoutes(context.data);
        context.router = createHashRouter(context.routes);
        debugTimeLog('preLoad', 'preLoad router created');
        setStage(LoadingStages.done);
        debugTimeEnd('preLoad');
    }, 0);
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
