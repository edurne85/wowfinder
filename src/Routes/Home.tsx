import { RouteObject } from 'react-router-dom';
import { Home } from '../components/Home';

function homeRoutes(): RouteObject[] {
    return [
        {
            path: '/',
            element: <Home />,
        },
    ];
}

export { homeRoutes };
