# WowFinder Companion Roadmap

This document summarizes the short- and mid- term development plans for the app. The most immediate milestones are matched against an expected release number, but the later ones are subject to change.

The project is currently following an alternating pattern during the early alpha stage, with odd versions focused on technical improvmenents and implementing the rules into the app, and even versions providing user-facing features.

**Update**: Due to personal circumstances, progress has been slowed down (almost completely halted) over the last few months. The current version of this roadmap includes updated timeframes taking this into account.

## Latest release

### [Alpha 7: Updates to item modelling](https://github.com/edurne85/wowfinder/milestone/11)

This version is adding a lot of logic to load and manage common items in the game, such as trade goods and consumables.

In addition to that, an issue that was causing delays of more than 20 - 25 seconds when loading the app has been addressed, which should drastically improve app startup times (see [#549](https://github.com/edurne85/wowfinder/issues/549) and [#551](https://github.com/edurne85/wowfinder/pull/551))

[Download Alpha 7](https://github.com/edurne85/wowfinder/releases/tag/v1.0.0-alpha-7)

## Initial Alpha stage

This stage includes releases that offer some kind of useful functionality to players, but are clearly not a complete application.

### [Alpha 8: Gear and item rendering](https://github.com/edurne85/wowfinder/milestone/4)

This release will include more complete rendering of gear and items found in the Character Sheets' inventories, as well as the initial ability to browse through the details of many common items.

Note that, just like it's being done with spells, the actual data files for the items in the game will be added progressively; although at the moment of writing this the files for many trade goods (covering mostly the "classic" or "vanilla" tiers of crafting) are already created.

This is planned to get released ~~between late June and early July 2023~~ around mid October 2023.

### [Alpha 9](https://github.com/edurne85/wowfinder/milestone/13)

This will be another _improvement_ release, focused on technical tasks and rules implementations. The exact contents are still to be decided; and will probably target a date of ~~mid to late July 2023~~ late October to early November 2023.

### [TBD: Mob generation and views](https://github.com/edurne85/wowfinder/milestone/12)

While technically a user-facing feature, this is more aimed to assist the GM than players. Even so, players should be able to browse through information about mobs that have already been encountered in the campaign and partial loot tables (some items, such as Uniques, won't be spoiled and will only be included in the tables once the corresponding mob / boss has been defeated and looted in the campaigh); as well as simulating difficulty ratings and base experience rewards for encounters (note that these values are only a guideline and the actual rewards from any encounter are always up to the GM).

### [TBD: Race detailed view](https://github.com/edurne85/wowfinder/milestone/6)

This feature will allow the players to browse through the playable races (and some npc-only ones) and see detailed bonuses and stats, similarly to how it was done previously for classes.

## Beta stage

Once the app is considered to contain all the features considered essential, it will enter in the Beta stage, with the main focus moving towards refining existing functionality, fixing any bugs or issues, and improving the user experience.

## Previous releases and milestones

For reference, here is a summary of the milestones already achieved / versions already released:

### [Alpha 6: Spell lists view](https://github.com/edurne85/wowfinder/milestone/7)

This version included the ability to browse through the core spell lists, and included the initial batch of spell data files (14 separate spells with a total of 37 rank variations). More spells will be added incrementally until the lists are fully complete.

### [Alpha 5: Purely technical](https://github.com/edurne85/wowfinder/milestone/10)

This version focused completely on technical improvements and fixes. The most significant improvement from the user's perspective is that asset export and import (for character-specific data) should work much more smoothly and reliably starting on this release.

### [Alpha 4: Ready for class](https://github.com/edurne85/wowfinder/milestone/8)

This version added the list of playable base classes as well as a basic view of their bonuses and progression. More detailed information, as well as advanced and prestige classes, will be added incrementally in future releases.

### [Alpha 3: Asset importing](https://github.com/edurne85/wowfinder/milestone/9)

This version added the ability to import asset bundles (ie: character-specific information provided separately to each player), which should be better than manually unpacking zip files in the app directory, but still included some issues until they were addressed in Alpha 5.

### [Alpha 2: The Druidshift](https://github.com/edurne85/wowfinder/milestone/3)

The main feature in this release was the support for handling creature transformations, including many of the druidric shapeshifting forms in the character sheet when relevant.

### [Alpha 1: Initial release](https://github.com/edurne85/wowfinder/milestone/1)

This was the first public release of the app, and included the ability to view character sheets and the factions and reputations table.
