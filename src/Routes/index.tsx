import { RouteObject } from 'react-router-dom';
import { FullData } from '../FullData';
import { characterRoutes } from './Character';
import { classRoutes } from './Class';
import { factionRoutes } from './Faction';
import { homeRoutes } from './Home';
import { itemRoutes } from './Item';
import { raceRoutes } from './Race';
import { spellRoutes } from './Spell';

function routes(data: FullData): RouteObject[] {
    return [
        ... homeRoutes(data),
        ... factionRoutes(data),
        ... characterRoutes(data),
        ... spellRoutes(data),
        ... classRoutes(data),
        ... raceRoutes(data),
        ... itemRoutes(data),
    ];
}

export { routes };
