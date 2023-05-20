import { RouteProvider, WiP } from './base';

const itemRoutes: RouteProvider = () => {
    return [
        {
            path: '/items',
            element: <WiP />,
        },
        // TODO #462: Add hierarchical item routes
    ];
};

export { itemRoutes };
