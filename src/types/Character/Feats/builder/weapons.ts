import { capitalizeFirstLetter } from '../../../../utils';
import {
    ExoticWeaponProficiency,
    MartialWeaponProficiency,
    SimpleWeaponProficiency,
} from '../../../Item/Gear/Weapon/Proficiency';
import {
    SimpleWeaponKey,
    WeaponFeat,
    WeaponKey,
} from '../Feat';
import { FeatFlag } from '../FeatFlag';
import { FeatSpec } from '../FeatSpec';
import { allOf, checkWeaponFeatKey, feat, req } from './helpers';

function mkKey(prefix: string, weapon: string): WeaponFeat {
    const w = capitalizeFirstLetter(weapon);
    const key = `${prefix}${w}`;
    checkWeaponFeatKey(key);
    return key;
}
function focusKey(weapon: string): WeaponFeat {
    return mkKey('weaponFocus', weapon);
}

type WeaponFeatSpecs = { [key in WeaponFeat]: FeatSpec };

const partialWeaponFeats: Partial<WeaponFeatSpecs> = {};

const weaponFocusFlags = [FeatFlag.byWeapon, FeatFlag.weaponFocus];
const weaponProficiencyFlags = [FeatFlag.byWeapon, FeatFlag.proficiency];

const simpleWeapons = Object.keys(SimpleWeaponProficiency) as SimpleWeaponKey[];
const nonSimpleWeapons = ([] as string[]).concat(
    Object.keys(MartialWeaponProficiency),
    Object.keys(ExoticWeaponProficiency)
) as WeaponKey[];
const allWeapons = ([] as string[]).concat(simpleWeapons, nonSimpleWeapons);

for (const w of simpleWeapons) {
    const focus = focusKey(w);
    partialWeaponFeats[focus] = feat(focus, allOf(req.level.bab(1)), weaponFocusFlags);
}
for (const w of nonSimpleWeapons) {
    const proficiency = mkKey('proficiency', w);
    partialWeaponFeats[proficiency] = feat(
        proficiency,
        undefined,
        weaponProficiencyFlags
    );
    const focus = focusKey(w);
    partialWeaponFeats[focus] = feat(
        focus,
        allOf(...req.feats(proficiency), req.level.bab(1)),
        weaponProficiencyFlags
    );
}
for (const w of allWeapons) {
    const focus = focusKey(w);
    const gfocus = mkKey('greaterWeaponFocus', w);
    partialWeaponFeats[gfocus] = feat(
        gfocus,
        allOf(...req.feats(focus), req.level.bab(8)),
        weaponFocusFlags
    );
    const specialization = mkKey('weaponSpecialization', w);
    partialWeaponFeats[specialization] = feat(
        specialization,
        allOf(...req.feats(focus), req.level.bab(4)),
        weaponFocusFlags
    );
    const gSpecialization = mkKey('greaterWeaponSpecialization', w);
    partialWeaponFeats[gSpecialization] = feat(
        gSpecialization,
        allOf(...req.feats(specialization), req.level.bab(12)),
        weaponFocusFlags
    );
}

Object.freeze(partialWeaponFeats);

// TODO Add unit test to ensure completeness
const weaponFeats = partialWeaponFeats as WeaponFeatSpecs;

export { weaponFeats };
