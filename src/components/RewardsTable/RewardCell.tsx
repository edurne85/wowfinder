import { ReputationCell } from '../helpers/InputCell';

interface RewardCellArgs {
    char: string;
    faction: string;
    value: number;
}

function RewardCell({
    char,
    faction,
    value,
}: RewardCellArgs): React.JSX.Element {
    const id = `rep-${char}-${faction}`;
    return faction === 'XP' ? (
        <td>{value || ''}</td>
    ) : (
        <ReputationCell id={id} value={value} />
    );
}

export { RewardCell };
