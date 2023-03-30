import { TranslationProvider } from '../i18n';
import { RouteObject } from 'react-router-dom';
import { FullData } from '../types/FullData';
import { WithNavigation } from '../components/Navigation/Navigation';
import { TitleProvider } from './base';
import { characterNames, characterRoutes } from './Character';
import { classNames, classRoutes } from './Class';
import { factionRoutes } from './Faction';
import { homeRoutes } from './Home';
import { itemRoutes } from './Item';
import { raceNames, raceRoutes } from './Race';
import { spellRoutes } from './Spell';
import { ExportByCharacterSelection } from '../components/DataExporter';

function addNavigation(...routes: RouteObject[]): RouteObject[] {
    return routes.map(route => {
        if (route.element) {
            return {
                ...route,
                element: <WithNavigation>{route.element}</WithNavigation>,
            };
        }
        return route;
    });
}

function getRoutes(data: FullData): RouteObject[] {
    return [...addNavigation(
        ...homeRoutes(),
        ...factionRoutes(data),
        ...characterRoutes(data),
        ...spellRoutes(data),
        ...classRoutes(data),
        ...raceRoutes(data),
        ...itemRoutes(data),
    ),
    {
        path: '/export',
        element: <ExportByCharacterSelection data={data} />,
    }
];
}

function customTitles(t: TranslationProvider, data: FullData): TitleProvider[] {
    return [
        ...characterNames(t, data),
        ...classNames(t, data),
        ...raceNames(t, data),
    ];
}

function getCustomTitle(data: FullData) {
    return function (t: TranslationProvider, path: string): string | null {
        for (const title of customTitles(t, data)) {
            const match = path.match(title.match);
            if (match) {
                return title.title(match);
            }
        }
        return null;
    };
}

export { getRoutes, getCustomTitle };
