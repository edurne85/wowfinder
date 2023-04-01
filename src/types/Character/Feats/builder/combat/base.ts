import { StatKey } from '../../../Stats';
import { CombatBaseFeat } from '../../core/combat/base';
import { Feat } from '../../Feat';
import { FeatFlag } from '../../FeatFlag';
import { FeatSpec } from '../../FeatSpec';
import { build, feat, allOf, req, either } from '../helpers';

const combatBaseFeats: { [key in CombatBaseFeat]: FeatSpec } = {
    agileManeuvers: build.combat(Feat.agileManeuvers),
    arcaneArmorTraining: feat(
        Feat.arcaneArmorTraining,
        allOf(req.level.caster(3)), // TODO Add requirement: Proficiency w/ light armor
        [FeatFlag.combat, FeatFlag.magic]
    ),
    arcaneArmorMastery: feat(
        Feat.arcaneArmorMastery,
        allOf(...req.feats(Feat.arcaneArmorTraining), req.level.caster(7)), // TODO medium armor
        [FeatFlag.combat, FeatFlag.magic]
    ),
    // TODO Add requirement: arcane casting
    arcaneStrike: feat(Feat.arcaneStrike, undefined, [
        FeatFlag.combat,
        FeatFlag.magic,
    ]),
    blindCombat: build.combat(Feat.blindCombat),
    catchOffGuard: build.combat(Feat.catchOffGuard),
    combatReflexes: build.combat(Feat.combatReflexes),
    standStill: build.combat(
        Feat.standStill,
        ...req.feats(Feat.combatReflexes)
    ),
    deadlyAim: build.combat(
        Feat.deadlyAim,
        req.stat(StatKey.DEX, 13),
        req.level.bab(1)
    ),
    defensiveCombatTraining: build.combat(Feat.defensiveCombatTraining),
    disruptive: build.combat(Feat.disruptive, req.level.bab(6)),
    spellBreaker: build.combat(Feat.spellBreaker, req.level.bab(10)),
    improvedInitiative: build.combat(Feat.improvedInitiative),
    improvisedWeaponMastery: build.combat(
        Feat.improvisedWeaponMastery,
        either(...req.feats(Feat.catchOffGuard, Feat.throwAnything))
    ),
    lunge: build.combat(Feat.lunge, req.level.bab(6)),
    quickDraw: build.combat(Feat.quickDraw, req.level.bab(1)),
    stepUp: build.combat(Feat.stepUp, req.level.bab(1)),
    strikeBack: build.combat(Feat.strikeBack, req.level.bab(11)),
    throwAnything: build.combat(Feat.throwAnything),
    toughness: build.combat(Feat.toughness),
    weaponFinesse: build.combat(Feat.weaponFinesse),
};

export { combatBaseFeats };