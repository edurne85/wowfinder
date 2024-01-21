# Shared value types for asset files

This file defines a number of types that are used in different asset types.

## Basic types

-   _string_: A JSON / JSON5 string. As a convention, single quotes are used in general, and double quotes when it can reduce the need for escaping (ie: the string itself contains single quotes but no double quotes).
-   _key_: a _string_ formed by one or more _chunks_ in `camelCase` notation, separated by the dot (`.`) character.
-   _number_: A JSON / JSON5 number. This may be an integer or a floating point number, in any format supported by JSON5.
-   _ordinal_: A non-negative integer number, expressed in base ten.
-

## Item rarity types

-   _rarity_: A _string_ that matches one of the values in the `Rarity` enum in [Rarity.ts](/src/types/Item/Rarity.ts).

## Time and duration types

-   _action length_: A _string_ that matches one of the values in the `ActionLength` enum in [ActionLength.ts](/src/types/Action/ActionLength.ts).
-   _time_: A stringified `Time` value (see [Time.ts](/src/types/Units/Time.ts)), which is a number, followed by 0 or more whitespace characters, followed by a proper time unit (see the `TimeUnit` enum in the same file). Examples: `'1min'`, `'2 hour'`, `'3  sec'`, `'4turn'`, `'5 day'`, `'6  year'`.
-   _scaling (by level) time_: Very similar to _time_, but with the extact string `/level` appended at the end. Represents time values that scale with a player's level, such as the duration of some spell. Examples: `1t turn/level`, `3 day/level`.

## Length and area types

-   _standard range_: A _string_ that matches one of the values in the `StandardRange` enum in [Range.ts](/src/types/Spell/Range.ts).
-   _length_: A stringified `Length` value (see [Length.ts](/src/types/Units/Length.ts)), which is a number, followed by 0 or more whitespace characters, followed by a proper length unit (see the `LengthUnit` enum in the same file). Examples: `'1ft'`, `'2  m'`, `'3 square'`.

### Area specifications

There are many types of areas for effects such as spells, abilities, and item effects. Also, there will be assets for which an `area` property is optional. In those cases, the default value should always be `null`.

These are the supported types of _area specification_:

-   🚧`null` (not fully implemented in the object model yet). Only allowed when the property is _optional_. Used to represent cases when no area is needed / used.
-   👎`'self'` keyword _(deprecated, use either `null` or `'point'`)_.
-   👎`'point'` keyword \_(deprecated, use `null` whenever possible).
-   _Cone_: A string formed by the `'cone'` keyword, followed by any ammount of whitespace, followed by a _length_ value (representing the cone's radius) within parenthesis. Example: `'cone (30ft)'`.
-   _Cube_: A string formed by the `'cube'` keyword, followed by any ammount of whitespace, followed by a _length_ value (representing the cube's side length) within parenthesis. Example: `'cube (20ft)'`.
-   _Line_: A string formed by the `'line'` keyword, followed by any ammount of whitespace, followed by a _length_ value (representing the line's length) within parenthesis. Example: `'line (60ft)'`.
-   _Sphere_: A string formed by the `'sphere'` keyword, followed by any ammount of whitespace, followed by a _length_ value (representing the sphere's radius) within parenthesis. Example: `'sphere (10ft)'`. _⚠️**Note:** due to early implementations, many spells use the `'sphere.self'` and `'sphere.point'` keywords; these are deprecated, but `'sphere.point'` **MAY** still be used as a fallback where `'sphere'` is not properly supported._
