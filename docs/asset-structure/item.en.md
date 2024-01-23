# Structure and format for Item asset files

Like all assets, item files use JSON5 notation. Each file **MUST** describe **a single item**. The filename **MUST** be the item's internal key, with the `.json5` extension.

At all levels (game rules, TS object model, and asset descriptions), the concept of "item" is broken down into several subtypes (identified by the `$type` property). This document describes the common properties used by all item types, and lists the main subtypes with links to their own documentation.

## Common value types

The descriptions below use a few types to describe what kind of value is expected for each property. Many of the types are shared with other asset types, and are defined in [types.en.md](/docs/asset-structure/types.en.md).

## Main file structure

All item files **MUST** consist of a root object with at least all the non-optional properties listed here. In addition, different item types have additional optional and/or required properties.

### `$type` property

🚧⚠️ Descriptions in this section need to be moved out to their specific files.

**Note**: this property name doesn't match current naming conventions due to early development decisions. It **MUST** be renamed to `type` in the future.

The type of the item. This is used to determine which subtype of item is being described. It **MUST** be a string, and it **MUST** be one of the following values:

-   Gear types: these types describe items that are _worn_ by creatures, and have several shared properties in addition to those specific to each subtype. 🚧

    -   `Weapon`: these items are usually held in one or more hands, and are mainly used to perform attack actions. 🚧
    -   `Armor`: these items are worn on the body, and usually provide some form of protection on top of any generic bonuses. 🚧
    -   `Accessory`: these items are also worn on the body, but don't provide any intrinsic protection. At the moment, these don't have any subtype-specific properties.

-   Goods: items within these types are mainly used as the base materials for crafting, although they may also be bartered with. The subtypes are used to group these items by how they are usually acquired, or their primary uses, but most of them share the same properties and they are all documented in the same file. 🚧

    -   `Ore`: raw metallic materials usualy obtained from mining. In their raw form, they can be broken down to possibly extract gems from them, or smelt into bars.
    -   `Metal`: refined metal bars, suitable for blacksmithing, jewelcrafting, and sometimes other crafts.
    -   `Stone`: non-metallic mineral materials, also obtained from mining. Often used in conjunction with metals for different crafts.
    -   `Cloth`: fabrics and fibers, found from a variety of sources, used mainly for tailoring and sparingly in many other crafts.
    -   `Leather`: animal hides and skins, typically ackquired through skinning, used mainly for leatherworking.
    -   `Wood`: lumber and other wood products, obtained from trees and other sources, used mainly for woodworking.
    -   `Gem`: precious and semi-precious stones, obtained from mining or from breaking down ores, used mainly for jewelcrafting.
    -   `Herb`: plants and plant parts, obtained from gathering, used mainly for alchemy or milled for pigments.
    -   `Pigment`: colored powders, often obtained from milling herbs, used mainly for inscription.
    -   `Enchanting`: magical materials, such as dusts, essences, and shards, obtained from disenchanting magical items, used mainly for enchanting.
    -   `Common`: easily found materials, usually provided by NPCs (at a price), used as complementary materials for many crafts.

-   Consumables: these items are used to provide temporary effects to creatures, and are usually consumed in the process. ⚠️ _**Note**: this category is pending a significant overhaul and refactor._\*\_ 🚧

    -   `SpellPotion`: liquids directly imbued with a spell, and can be drunk to trigger the spell on the imbiber. 🚧
    -   `SpellScroll`: scrolls directly imbued with a spell, which can be used to cast it without spending slots or other resources (at the cost of consuming the scroll). Spellbook users (primarily mages) may also attempt to study the spell and copy it to their spellbook. 🚧
    -   `SpellWand`: wands that can be used to cast a spell without spending slots or other resources (at the cost of consuming charges). ⚠️ **\*Note**: this type needs to be reworked: wands share many properties with [`SpellContainer`](/src/types/Item/Consumable/SpellContainer/base.ts) items, but at the same time they are weapons. 🚧
    -   `Potion`: alchemic concoctions that provide immediate restorative effects or short-tem benefits when consumed. 🚧
    -   `Elixir`: alchemic concoctions that provide long-term benefits when consumed. 🚧
    -   `SharpeningStone`: items that can be used to sharpen weapons, providing a temporary bonus to their slashing and/or piercing damage. 🚧
    -   `WeightStone`: items that can be used to add weight to weapons, providing a temporary bonus to their bludgeoning damage. 🚧
    -   `WeaponOil`: oils that can be applied to weapons, providing a temporary bonus to their energy damage (if they have it) and to the wearer's spell power. 🚧
    -   `GearEnchant`: magical items (usually scrolls) that can contain a permanent gear enchantment. 🚧
    -   `Food`: items that can be consumed to provide sustenance and/or hydration to creatures, and are used during short rests to speed up recovery. 🚧

### `key` property

⚠️ **\*Note (1)**: due to early (obsolete) development decisions, some items (mainly gear) use `label` instead of `key`. This needs to be refactored out.\*🚧

⚠️ **\*Note (2)**: the use of "qualified" keys comes from an early development decision and needs to be refactored out. Parser and builder functions must be able to define the fully qualified key string for any object based on directory structure alone. Once this is addressed, the description of this propery will be substantially simplified.\*🚧

Currently, this is a _key_ value, with the final _chunk_ matching the basename of the file and the rest matching subdirectories in the file's path (the exact base used for the key varies between item types).

### `ilevel` property

_Optional_. The overal power level of the item. This is used by many indirect calculations, and is mostly a tool for the GM. It can also be used by players to get a rough gauge of the item's potential. It **MUST** be a non-negative integer _number_.

⚠️ _**Note**: this property should be required, but there are many existing assets that don't provide it yet._

⚠️ _**Note**: it needs to be decided whether to rename this property to `itemLevel`, as per existing naming conventions in the project. It could be argued that "ilevel" has evolved, in the context of the Warcraft franchise, into its own concept rather than a combination of words._

### `rarity` property

A general gauge of how difficult it is to obtain the item. It **MUST** be a _rarity_ value.

### `value` property

The monetary value of the item, in copper coins. It **MUST** be a non-negative integer _number_. Note that, while it is not required in the asset file itself, all item objects have a `value` property. For some item types, the proper value can be computed from some properties (such as `ilevel`, `rarity`, and the `$type` itself), for others it is redefined as required in the asset file. Note that vendors are not required to use this exact amount in their transactions; but this is a baseline gauge for both players and the GM (as a rule of thumb, vendors should try to pay less than the real value and sell for more than such value, as their means of living depends on making a profit from these transactions).

### `weight` property

_Optional_. The weight of the item, in pounds. It **MUST** be a _number_ value. Note that, while it is not required in the asset file itself, all item objects have a `weight` property. For some item types, common defaults are used, and for others the property is redefined as required.
