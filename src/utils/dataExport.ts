import { AssetJsonBundle, AssetType } from '../types/Assets';
import type { AssetBundle } from '../types/Assets';
import { FullData } from '../types/FullData';
import { Rewards } from '../types/Rewards';
import { JsonValue } from './json';
import { CharacterExport } from '../types/Character/builder';
import { AdventureExport } from '../types/Adventure';

function exportByChars(source: FullData, ...charKeys: string[]): AssetBundle {
    const chars: { [k: string]: CharacterExport } = {};
    for (const k of charKeys) {
        if (source.chars[k]) {
            chars[k] = source.chars[k].export();
        }
    }
    const adventures: { [k: string]: AdventureExport } = {};
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
        assets: {
            [AssetType.Characters]: chars,
            [AssetType.Adventures]: adventures,
        },
    };
}

function prettyJson(raw: JsonValue): string {
    return JSON.stringify(raw, null, 4);
}

function exportByCharsAsJsonAssets(
    source: FullData,
    ...charKeys: string[]
): AssetJsonBundle {
    const raw = exportByChars(source, ...charKeys);
    const result: AssetJsonBundle = {
        assets: {
            [AssetType.Characters]: {},
            [AssetType.Adventures]: {},
        },
    };
    for (const k of Object.keys(raw.assets[AssetType.Characters])) {
        result.assets[AssetType.Characters][k] = prettyJson(
            raw.assets[AssetType.Characters][k]
        );
    }
    for (const k of Object.keys(raw.assets[AssetType.Adventures])) {
        result.assets[AssetType.Adventures][k] = prettyJson(
            raw.assets[AssetType.Adventures][k]
        );
    }
    return result;
}

export { exportByChars, exportByCharsAsJsonAssets };
