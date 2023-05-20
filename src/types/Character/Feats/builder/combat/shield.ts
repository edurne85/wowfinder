import { CombatShieldFeat } from '../../core/combat/shield';
import { Feat } from '../../Feat';
import { FeatSpec } from '../../FeatSpec';
import { build, req } from '../helpers';

const combatShieldFeats: { [key in CombatShieldFeat]: FeatSpec } = {
    proficiencyShield: build.combat(Feat.proficiencyShield),
    // TODO #443: improved shield bash, shield slam, shield master
    weaponFocusShield: build.combat(
        Feat.weaponFocusShield,
        ...req.feats('proficiencyShield'),
        req.level.bab(1),
    ),
    greaterWeaponFocusShield: build.combat(
        Feat.greaterWeaponFocusShield,
        ...req.feats('weaponFocusShield'),
        req.level.bab(8),
    ),
};

export { combatShieldFeats };
