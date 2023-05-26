import { RewardsTable } from '../components';
import { FullData } from '../types/FullData';
import { RouteProvider } from './base';

function RewTable({ data }: { data: FullData }): React.JSX.Element {
    return (
        <RewardsTable
            chars={data.chars}
            factions={Object.values(data.factions.byKey)}
            data={data.rewardsByFaction}
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
