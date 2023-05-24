import type { Rewards } from '../../types/Rewards';
import { Character } from '../../types/Character';
import { Faction } from '../../types/Faction';
import { RewardsTableWrapper } from './styles';
import { RewardRow } from './RewardRow';

interface RewardsTableArgs {
    chars: { [key: string]: Character };
    factions: Faction[];
    data: Rewards;
}

export function RewardsTable({
    chars,
    factions,
    data,
}: RewardsTableArgs): React.JSX.Element {
    const factionLabels = factions.map(f => f.label);
    return (
        <RewardsTableWrapper>
            <thead>
                <tr>
                    <th></th>
                    {factions.map(f => (
                        <th>{f.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(chars).map(k =>
                    RewardRow(
                        chars[k].fullName,
                        chars[k].active,
                        factionLabels,
                        data[k] || {},
                    ),
                )}
            </tbody>
        </RewardsTableWrapper>
    );
}
