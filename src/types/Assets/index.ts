import type { AdventureExport } from '../Adventure';
import { CharacterExport } from '../Character';

enum AssetType {
    Adventures = 'Adventures',
    Characters = 'Characters',
    Classes = 'Classes',
    Factions = 'Factions',
    Items = 'Items',
    Races = 'Races',
    SpellLists = 'SpellLists',
    Spells = 'Spells',
}

type AssetBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: AdventureExport },
        [AssetType.Characters]: { [k: string]: CharacterExport },
    };
};

type AssetJsonBundle = {
    assets: {
        [AssetType.Adventures]: { [k: string]: string },
        [AssetType.Characters]: { [k: string]: string },
    };
};

export { AssetType };

export type { AssetBundle, AssetJsonBundle };
