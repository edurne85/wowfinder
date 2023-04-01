import { StatKey } from '../../../Stats';
import { CombatDualWieldFeat } from '../../core/combat/dual';
import { Feat } from '../../Feat';
import { FeatSpec } from '../../FeatSpec';
import { build, req } from '../helpers';

const combatDualWieldFeats: { [key in CombatDualWieldFeat]: FeatSpec } = {
    twoWeaponFighting: build.combat(
        Feat.twoWeaponFighting,
        req.stat(StatKey.DEX, 15)
    ),
    doubleSlice: build.combat(
        Feat.doubleSlice,
        ...req.feats('twoWeaponFighting')
    ),
    improvedTwoWeaponFighting: build.combat(
        Feat.improvedTwoWeaponFighting,
        ...req.feats('twoWeaponFighting'),
        req.level.bab(6),
        req.stat(StatKey.DEX, 17)
    ),
    twoWeaponRend: build.combat(
        Feat.twoWeaponRend,
        ...req.feats('improvedTwoWeaponFighting', 'doubleSlice'),
        req.level.bab(11)
    ),
    greaterTwoWeaponFighting: build.combat(
        Feat.greaterTwoWeaponFighting,
        ...req.feats('improvedTwoWeaponFighting'),
        req.level.bab(11),
        req.stat(StatKey.DEX, 19)
    ),
    twoWeaponDefense: build.combat(
        Feat.twoWeaponDefense,
        ...req.feats('twoWeaponFighting')
    ),
};

export { combatDualWieldFeats };
