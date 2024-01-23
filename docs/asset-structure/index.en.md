# Asset file structure

The `assets` folder at the root of this repository contains files with the definitions for essential game and campaign elements, such as spells, items, classes, races, etc.

As a rule of thumb, these files use JSON5 notation.
This section of the documentation describes the structure of this folder and its contents.

## Asset visibility

Some assets are considered _public_, which means they are included in the repository and can be viewed by anyone.

Others are _private_, which means that the GM should share the files only with the players for which they are relevant (the import and export feature of the app make this much easier).

Also, there may be some _secret_ assets, which are only visible to the GM. Anybody contributing to the development needs to be aware that these may exist, but players don't need to know anything about them.

## Folder structure

-   `Adventures`: This directory contains base information for the adventures played so far, including a descriptive title, a date (for sorting purposes), and a list of rewars (reputation and experience) earned by each character involved. Files for past adventures are considered _private_, while those for upcoming adventures are _secret_.
-   `Characters`: This directory contains the core information for each character, including base stats, skill rank and feat selection, class levels, and other character choices. Race and classes are mentioned by reference, as well as any items on the character's inventory. The app will combine the information from all the relevant assets when displaying the character sheet. These files are generally _private_.
-   `Classes`: This directory contains essnetial starting and progression information for each class, including class skills, hit dice, save and BaB progression, and class features. These files are _public_, and should become the SoA for the campaign's rules regarding classes.
-   `Factions`: This directory is essentially a list of in-game factions, and a mapping between their names and their internal numeric IDs. At some point, the names need to be moved out to the `translations` section so they can be internationalized, and the code should use the short text labels instead of the numeric IDs. These files are _public_.
-   `Items`: This directory is split in several subdirectories, but all the files within it represent some kind of item that can be worn, carried, and/or consumed by characters. Most of these have _public_ visibility, but some may be _private_ or even _secret_. For any folder / subfolder not listed here, assume it is _secret_; those that are _private_ are explicitly marked; and any other folder is _public_.
    -   `gear`: This folder contains any item that can be worn by players or other creatures, such as armor, weapons, and other equipment. It is further split into a few subfolders:
        -   `common`: Gear listed in the core rulebook (chapter 6) and other official sources, possibly adapted to the campaign's setting. This is further split into `armour` and `weapon` subfolders.
        -   `craft`: Gear that can be crafted by characters with the appropriate skills. There is a subfolder for each skill, and those are likely to be split further into the different crafting tiers (such as `apprentice`, `journeyman`, etc) in the near future. Some folders with the `-old` suffix contain items that are no longer available for crafting, but may still be referenced by characters that already have them.
        -   `unique`: Gear that is unique in the campaign, and may be awarded as a reward for completing a quest or defeating a powerful enemy. All items in this folder are either _private_ (if a player has it) or _secret_ (if nobody has it yet). Subfolders here group items by their source / origin:
            -   `elwynn`: Items found while adventuring in the Elwynn Forest, up to (and including) the Hogger camp.
            -   `hinterlands`: Items found while adventuring in the Hinterlands, up to (and including) the Jintha'Alor temple.
            -   `shadowfang`: Items found during the assault to Shadowfang Keep.
            -   `westfall`: Items found while adventuring in Westfall, up to (and including) the Deadmines.
    -   `goods`: Items that are typically used for crafting, and sometimes also as an alternative currency. It contains several subfolders for different types of goods.
        -   `cloth`: Usually looted from humanoid enemies, cloth pieces are used mainly in tailoring, but also in other crafting skills.
        -   `common`: Various crafting ingredients easily available from NPCs. The inclusion of these items in crafting recipes is meant to set up a minimum monetary cost for the craft (ie: the base price of the item at the vendor). Looting and gathering skills should be, at most, an uncommon source for these items.
        -   `enchanting`: Reagents extracted mainly from magical items and extraplanar or magical creatures, and primarily used in enchanting.
        -   `fish`: Fish and other aquatic creatures, found from fishing; primarily used in cooking.
        -   `gem`: Gems and other precious stones, found from mining and from ore prospection; primarily used in jewelcrafting.
        -   `herb`: Herbs and other plants, found from herbalism and from gathering; primarily used in alchemy and inscription (via milling), and to some degree in cooking.
        -   `leather`: Leather and other animal parts, found from skinning; primarily used in leatherworking.
        -   `meat`: Meat and other animal parts, found from butchery; primarily used in cooking.
        -   `metal`: Metal bars and other processed minerals, often smelted by either miners or blacksmiths; primarily used in blacksmithing.
        -   `ore`: Raw minerals, found from mining; primarily used in blacksmithing and jewelcrafting. Most of them can (and must) be smelted into metal bars or other processed forms before they can be used to craft gear.
        -   `pigment`: Pigments extracted from plants, found from milling; primarily used in inscription.
        -   `stone`: A byproduct of mining (besides ores and gems), used in blacksmighing and jewelcrafting.
        -   `wood`: Wood and other plant parts, found from lumbering, primarily used in woodworking.
-   `Races`: Core definitions for each playable race, including information such as modifiers (for stats, skills, etc), initial and available languages, common alignments, and base speed(s). _**Note:** due to the precarious structure of the project at the earliest stages, this folder still includes `.md` files that should be moved to the `docs` and `translations` folders._
-   `SpellLists`: This folder contains both the core spell lists (used by one or more base classes) and other lists used on narrower contexts. The core spell lists are _public_, while the others may be _private_ or _secret_. At the moment of writing, these lists are public: `arcane`, `arts`, `celestial`, `divine`, and `primal`. Note that `celestial` is not considered a core list; and that `arts` is currently unused, and may be removed if the `bard` class is finally dropped.
-   [`Spells`](spell.en.md): this folder should contain all the spells available in the campaign. _**Note:** this will need to be split into subfolders at some point (the number of spells is getting rather unwieldly), but we don't have any consistent criteria for this yet, and the structure change may require updating some translations keys._
