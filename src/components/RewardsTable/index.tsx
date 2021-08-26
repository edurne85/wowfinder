import type {Reward, Rewards } from '../../@types/Rewards';
import Character from '../../@types/Character';
import Faction from '../../@types/Faction';

function RewardRow(char: string, active: boolean, factionLabels: string[], data: Reward): JSX.Element {
    const cells = [
        <th>{char}</th>,
        ...(factionLabels.map(k => <td>{data[k] || ''}</td>)),
    ];
    return <tr className={active ? '' : 'inactive'}>{cells}</tr>;
}

interface RewardsTableArgs {
    chars: {[key:string]: Character};
    factions: Faction[];
    data: Rewards;
}

export function RewardsTable({chars, factions, data}: RewardsTableArgs): JSX.Element {
    const factionLabels = factions.map(f => f.label);
    return (
        <table className="rewards-table">
            <thead>
                <tr>
                    <th></th>
                    {factions.map(f => <th>{f.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {Object.keys(chars).map(k => RewardRow(chars[k].fullName, chars[k].active, factionLabels, data[k] || {}))}
            </tbody>
        </table>
    );
}