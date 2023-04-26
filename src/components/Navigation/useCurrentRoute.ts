import { GlobalContext } from '../helpers/GlobalContext';
import { useContext } from 'react';
import { RouteObject, useMatch } from 'react-router-dom';

function useCurrentRoute(): RouteObject | null {
    const routes = useContext(GlobalContext).routes;

    // Even if we only want the first match, we must keep the number of calls to useMatch consistent between renders
    const matches = routes.filter(route => useMatch(route.path || ''));
    return matches ? matches[0] || null : null;
}

export { useCurrentRoute };
