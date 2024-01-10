import type { AdventureExport } from '../Adventure';
import { CharacterExport } from '../Character';
import { AssetType } from './AssetType';

type AssetBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: AdventureExport };
        [AssetType.Characters]: { [k: string]: CharacterExport };
    };
};

export type { AssetBundle };
