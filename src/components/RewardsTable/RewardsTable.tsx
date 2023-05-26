/* eslint-disable deprecation/deprecation */
import type { RewardsByFaction } from '../../types/Rewards';
import { Character } from '../../types/Character';
import { Faction } from '../../types/Faction';
import { RewardsTableWrapper } from './styles';
import { RewardRowConditional } from './RewardRow';

interface RewardsTableArgs {
    chars: { [key: string]: Character };
    factions: Faction[];
    data: RewardsByFaction;
}

function RewardsTable({
    chars,
    factions,
    data,
}: RewardsTableArgs): React.JSX.Element {
    const charsRaw = Object.values(chars);
    return (
        <RewardsTableWrapper>
            <thead>
                <tr>
                    <th></th>
                    {charsRaw.map(c => (
                        <th key={c.key}>{c.fullName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {factions.map(f => (
                    <RewardRowConditional
                        key={f.key}
                        factionLabel={f.label}
                        chars={charsRaw}
                        data={data[f.label] || {}}
                    />
                ))}
            </tbody>
        </RewardsTableWrapper>
    );
}

export { RewardsTable };
