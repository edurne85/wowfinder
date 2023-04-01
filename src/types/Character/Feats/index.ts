import { capitalizeFirstLetter } from '../../../utils';
import {
    ExoticWeaponProficiency,
    MartialWeaponProficiency,
    SimpleWeaponProficiency,
} from '../../Item/Gear/Weapon/Proficiency';
import {
    allOf,
    baseFeats,
    classFeatureFeats,
    combatFeats,
    feat,
    magicFeats,
    req,
} from './builder';
import { checkFeatKey } from './builder/helpers';
import { Feat } from './Feat';
import { FeatFlag } from './FeatFlag';
import { FeatSpec } from './FeatSpec';

const feats: { [key in Feat]?: FeatSpec } = {
    // TODO Make type exhaustive once weapon feats are included
    ...baseFeats,
    ...classFeatureFeats,
    ...magicFeats,
    ...combatFeats,
};

function mkKey(prefix: string, weapon: string): Feat {
    const w = capitalizeFirstLetter(weapon);
    const key = `${prefix}${w}`;
    checkFeatKey(key);
    return key;
}
function focusKey(weapon: string): Feat {
    return mkKey('weaponFocus', weapon);
}

const weaponFocusFlags = [FeatFlag.byWeapon, FeatFlag.weaponFocus];
const weaponProficiencyFlags = [FeatFlag.byWeapon, FeatFlag.proficiency];

const simpleWeapons = Object.keys(SimpleWeaponProficiency);
const nonSimpleWeapons = ([] as string[]).concat(
    Object.keys(MartialWeaponProficiency),
    Object.keys(ExoticWeaponProficiency)
);
const allWeapons = ([] as string[]).concat(simpleWeapons, nonSimpleWeapons);

for (const w of simpleWeapons) {
    const focus = focusKey(w);
    feats[focus] = feat(focus, allOf(req.level.bab(1)), weaponFocusFlags);
}
for (const w of nonSimpleWeapons) {
    const proficiency = mkKey('proficiency', w);
    feats[proficiency] = feat(proficiency, undefined, weaponProficiencyFlags);
    const focus = focusKey(w);
    feats[focus] = feat(
        focus,
        allOf(...req.feats(proficiency), req.level.bab(1)),
        weaponProficiencyFlags
    );
}
for (const w of allWeapons) {
    const focus = focusKey(w);
    const gfocus = mkKey('greaterWeaponFocus', w);
    feats[gfocus] = feat(
        gfocus,
        allOf(...req.feats(focus), req.level.bab(8)),
        weaponFocusFlags
    );
    const specialization = mkKey('weaponSpecialization', w);
    feats[specialization] = feat(
        specialization,
        allOf(...req.feats(focus), req.level.bab(4)),
        weaponFocusFlags
    );
    const gSpecialization = mkKey('greaterWeaponSpecialization', w);
    feats[gSpecialization] = feat(
        gSpecialization,
        allOf(...req.feats(specialization), req.level.bab(12)),
        weaponFocusFlags
    );
}

Object.freeze(feats);

export { Feat, FeatFlag, FeatSpec, feats };
