import { RouteProvider, WiP } from './base';

const classRoutes: RouteProvider = () => {
    return [
        {
            path: '/classes',
            element: <WiP />,
        },
        {
            path: '/classes/:class',
            element: <WiP />,
        }
    ];
};

export { classRoutes };