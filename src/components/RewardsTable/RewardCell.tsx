import { ReputationCell } from '../helpers/InputCell';

function RewardCell(
    char: string,
    faction: string,
    value: number,
): React.JSX.Element {
    const id = `rep-${char}-${faction}`;
    return faction === 'XP' ? (
        <td>{value || ''}</td>
    ) : (
        <ReputationCell id={id} value={value} />
    );
}

export { RewardCell };
