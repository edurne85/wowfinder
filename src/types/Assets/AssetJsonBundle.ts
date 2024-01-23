import { AssetType } from './AssetType';

type AssetJsonBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: string };
        [AssetType.Characters]: { [k: string]: string };
    };
};

export type { AssetJsonBundle };
