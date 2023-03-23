import { RouteProvider, WiP } from './base';

const raceRoutes: RouteProvider = () => {
    return [
        {
            path: '/races',
            element: <WiP />,
        },
        {
            path: '/races/:race',
            element: <WiP />,
        }
    ];
};

export { raceRoutes };