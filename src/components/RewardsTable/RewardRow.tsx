import type { Reward } from '../../types/Rewards';
import { RewardCell } from './RewardCell';

function RewardRow(
    char: string,
    active: boolean,
    factionLabels: string[],
    data: Reward,
): React.JSX.Element {
    const cells = [
        <th>{char}</th>,
        ...factionLabels.map(k => RewardCell(char, k, data[k])),
        // ...(factionLabels.map(k => <td>{data[k] || ''}</td>)),
    ];
    return <tr className={active ? '' : 'inactive'}>{cells}</tr>;
}

export { RewardRow };
