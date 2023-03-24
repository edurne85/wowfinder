import { WithNavigation } from '../components/Navigation/Navigation';
import { RouteObject } from 'react-router-dom';
import { FullData } from '../@types/FullData';
import { characterRoutes } from './Character';
import { classRoutes } from './Class';
import { factionRoutes } from './Faction';
import { homeRoutes } from './Home';
import { itemRoutes } from './Item';
import { raceRoutes } from './Race';
import { spellRoutes } from './Spell';

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

function routes(data: FullData): RouteObject[] {
    return addNavigation(
        ...homeRoutes(data),
        ...factionRoutes(data),
        ...characterRoutes(data),
        ...spellRoutes(data),
        ...classRoutes(data),
        ...raceRoutes(data),
        ...itemRoutes(data),
    );
}

export { routes };
