import { RouteProvider, WiP } from './base';

const itemRoutes: RouteProvider = () => {
    return [
        {
            path: '/items',
            element: <WiP />,
        }
        // TODO: Add hierarchical item routes
    ];
};

export { itemRoutes };