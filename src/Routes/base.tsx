import { FullData } from '../@types/FullData';
import { RouteObject, useLocation } from 'react-router-dom';
import { reportWiP } from '../utils/debug';
import { TranslationProvider } from '../i18n';

type RouteProvider = (data: FullData) => RouteObject[];

type CustomTitle = string | null;

type TitleProvider = {
    match: RegExp;
    title: (fragments: RegExpMatchArray | null) => CustomTitle;
};

type TitlesProvider = (t: TranslationProvider, data: FullData) => TitleProvider[];

function WiP (): JSX.Element {
    const location = useLocation();
    reportWiP({route: location.pathname});
    return <div>Work in progress</div>;
}

export { WiP };

export type { RouteProvider, CustomTitle, TitleProvider, TitlesProvider };
