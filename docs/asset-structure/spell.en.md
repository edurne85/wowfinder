# Structure and format for Spell asset files

Like all assets, spell files use JSON5 notation. Each file **MUST** describe **a single spell** with all its ranks. The filename **MUST** be the spell's internal key, with the `.json5` extension.

_**Note:** it's still undecided how spell variations (such as the four variants for "Protection from alignment") will be handled. Ideally, we want to have a single spell asset file for something that would match a single entry in a mage's spellbook, but at the moment the data model doesn't fully support this kind of variation._

## Common value types

The descriptions below use a few types to describe what kind of value is expected for each property. Many of the types are shared with other asset types, and are defined in [types.en.md](/docs/asset-structure/types.en.md).

## Main file structure

All spell files **MUST** consist of a root object with at least the `key` and `ranks` properties. The remaining spell properties listed here may be given _either_ for the spell as a whole, or separately for each rank. There are a few properties that are _optional_ and may be fully omitted, but most of them are strictly required.

### `key` property

This is the internal identifier for the spell (used to reference it from places like spell list assets, chracter's spellbooks, other spells, and so on). It **MUST** be a string; it **MUST** be unique across all spell assets; and it must be a `camelCase` version of the spell's name.

### `ranks` property and _rank_ objects

The `ranks` property is an array of one or more _rank_ objects. Each _rank_ object **MUST** have the following properties:

-   `rank`: _ordinal_, usually starting at 1 and increasing by 1 for each rank. Even if no additional data is needed for a rank, it **MUST** be included in the `ranks` array. _**Note:** some spells have a "rank 0" entry, but it isn't used consistently yet. In the near future, a consistent criteria needs to be defined and applied to all spells._
-   Any required spell properties that are not given in the root spell object.

## Spell properties

These properties apply to each variation of a spell. They can be given for the whole spell, when they are the same for all ranks; or for each rank, when they vary between ranks.

A few of these properties are explicitly marked as _optional_; all others are strictly required (either on the spell root object or in **all** ranks).

### `area` property

_Optional_. If given, it must be an _area specification_.

### `castingTime` property

This describes the spell's casting time, which is often given as an action type (such as "standard action" or "full-round action") or as a standarized time measure. The value **MUST** be a string, and it **MUST** be parseable as an `ActionTime` value (see [ActionTime.ts](/src/types/Action/ActionTime.ts)). To fulfill this requirement, the string must be one of the following:

-   An _action time_ value.
-   A _time_ value.
-   The `'special'` keyword, as a fallback for spells with a casting time that can't be normalized.

### `components` property

This describes the spell's components. It must be an array (possibly empty) of strings, each of which **MUST** be one of these:

-   A value from the `SpellComponent` enum in [Components.ts](/src/types/Spell/Components.ts). Note that the `M` entry can refer to simple material components as well as to a focus component.
-   🚧 A material description. This isn't used yet, and a proper format needs to be fully defined. Will probably be a fully qualified key for an item asset.

### `duration` property

This describes the spell's duration, which can be given as a fixed amount of time, as a scaling (by level) amount of time, or as a special value. The value **MUST** be a string, and it **MUST** be parseable as a `SpellDuration` value (see [Duration.ts](/src/types/Spell/Duration.ts)). To fulfill this requirement, the string must be one of the following:

-   A _time_ value.
-   A _scaling (by level) time_ value.
-   The `'concentration'` keyword, for spells that require concentration to maintain but have no other limit to their duration.
-   The `'permanent'` keyword, for spells that last indefinitely or until dispelled.
-   The `'instantaneous'` keyword, for spells that have an instantaneous effect and then end.
-   The `'special'` keyword, as a fallback for spells with a duration that can't be normalized.

### `flags` property

_Optional_. This describes the spell's flags. If provided, it **MUST** be an array (possibly empty) of strings, each of which **MUST** be a value from the `SpellFlag` enum in [Flags.ts](/src/types/Magic/Spell/Flags.ts). The default value is the empty array.

### `range` property

This describes the spell's range, which is often given as a fixed distance, as a standard range (which in herently scales with the caster's level). The value **MUST** be a string, and it **MUST** be parseable as a `SpellRange` value (see [Range.ts](/src/types/Spell/Range.ts)). To fulfill this requirement, the string must be one of the following:

-   A _standard range_ value.
-   A _length_ value.
-   The `'special'` keyword, as a fallback for spells with a range that can't be normalized.

### `save` property

_Optional_. 🚧 The final format for this field hasn't been decided yet. At the moment, spells provide a description of the saving throw as a free-form _string_ or a more structured object detailing the type of save and the effect of a successful save. See [`nightwind` spell asset](/assets/Spells/nightwind.json5) for the most up to date example of the likely final format.

### `sch` property

This describes the spell's school (or subschool). It **MUST** be a _string_ that matches one of the values in either the `School` or `SubSchool` enums in [Schools.ts](/src/types/Magic/School.ts).

_**Note:** the use of an abbreviated name for this property goes against the general rule of using full names for all properties, and is likely to be renamed to `school` in the future._
