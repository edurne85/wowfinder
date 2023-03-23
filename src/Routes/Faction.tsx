import { RewardsTable } from '../components';
import { FullData } from '../FullData';
import { RouteProvider } from './base';

function RewTable({ data }: { data: FullData }): JSX.Element {
    return (
        <RewardsTable
            chars={data.chars}
            factions={Object.values(data.factions.byKey)}
            data={data.rewards}
        />
    );
}

const factionRoutes: RouteProvider = data => [
    {
        path: '/factions',
        element: <RewTable data={data} />,
    },
];

export { factionRoutes };
