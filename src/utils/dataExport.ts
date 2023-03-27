import { FullData } from '../types/FullData';
import { Rewards } from '../types/Rewards';
import { JsonValue } from './json';

function exportByChars(
    source: FullData,
    ...charKeys: string[]
): { [k: string]: JsonValue } {
    const chars: { [k: string]: JsonValue } = {};
    for (const k of charKeys) {
        if (source.chars[k]) {
            chars[k] = source.chars[k].export();
        }
    }
    const adventures: { [k: string]: JsonValue } = {};
    // for (const a of source.adventures) {
    for (const k of Object.keys(source.adventures)) {
        const adventure = source.adventures[k].export();
        const rewardsFiltered: Rewards = {};
        for (const char of charKeys) {
            if (adventure.rewards[char]) {
                rewardsFiltered[char] = adventure.rewards[char];
            }
        }
        if (Object.keys(rewardsFiltered).length) {
            adventure.rewards = rewardsFiltered;
            adventures[k] = adventure;
        }
    }
    return {
        Characters: chars,
        Adventures: adventures,
    };
}

export { exportByChars };
