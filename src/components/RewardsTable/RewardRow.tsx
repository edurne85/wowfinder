/* eslint-disable deprecation/deprecation */
import { Character } from '../../types/Character';
import type { RewardByCharacter } from '../../types/Rewards';
import { RewardCell } from './RewardCell';

interface RewardRowArgs {
    factionLabel: string;
    chars: Character[];
    data: RewardByCharacter;
}

function RewardRow({
    factionLabel,
    chars,
    data,
}: RewardRowArgs): React.JSX.Element {
    const cells = [
        <th key="">{factionLabel}</th>,
        ...chars.map(c => (
            <RewardCell
                char={c.fullName}
                faction={factionLabel}
                value={data[c.key]}
                key={c.key}
            />
        )),
    ];
    return <tr>{cells}</tr>;
}

function RewardRowConditional({
    factionLabel,
    chars,
    data,
}: RewardRowArgs): React.JSX.Element {
    return Object.values(data).some(v => !!v) ? (
        <RewardRow factionLabel={factionLabel} chars={chars} data={data} />
    ) : (
        <></>
    );
}

export { RewardRow, RewardRowConditional };
