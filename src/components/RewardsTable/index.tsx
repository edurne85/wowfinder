import type {Reward, Rewards } from '../../@types/Rewards';
import Character from '../../@types/Character';
import Faction from '../../@types/Faction';

function RewardRow(char: string, factionLabels: string[], data: Reward) {
    const cells = [
        <th>{char}</th>,
        ...(factionLabels.map(k => <td>{data[k] || ''}</td>)),
    ];
    return <tr>{cells}</tr>;
}

export function RewardsTable({chars, factions, data}: {chars: {[key:string]: Character}, factions: Faction[], data: Rewards}) {
    const factionLabels = factions.map(f => f.label);
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {factions.map(f => <th>{f.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {Object.keys(chars).map(k => RewardRow(chars[k].fullName, factionLabels, data[k] || {}))}
            </tbody>
        </table>
    )
}