import { RouteObject } from 'react-router-dom';
import { Home } from '../components/Home';
import { FullData } from '../FullData';

function homeRoutes(data: FullData): RouteObject[] {
    return [
        {
            path: '/',
            element: <Home data={data} />,
        },
    ];
}

export { homeRoutes };
