import { Character } from '..';
import { ClassFeature } from '../Class';
import {
    Requirement,
    and as allOf,
    or as either,
    CharacterLevelRequirement,
    characterStatsRequirement,
    MinStatsRequirement,
    ClassFeatureRequirement,
    CasterLevelRequirement,
    AttackBonusRequirement,
} from '../Requirements';
import { CharacterFeatRequirement } from '../Requirements/FeatRequirement';
import { StatKey } from '../Stats';
import { Feat } from './Feat';
import { FeatSpec } from './FeatSpec';
import { FeatFlag } from './FeatFlag';
import {
    ExoticWeaponProficiency,
    MartialWeaponProficiency,
    SimpleWeaponProficiency,
} from '../../Item/Gear/Weapon/Proficiency';
import { capitalizeFirstLetter } from '../../../utils';

const raw: { [key in Feat]?: FeatSpec } = {};

type Req = Requirement<Character>;
type Reqs = Requirement<Character>[];
type Flags = Iterable<FeatFlag>;

const req = {
    none: allOf() as Req,
    level: {
        global: (level: number): Req => new CharacterLevelRequirement(level),
        caster: (level: number): Req => new CasterLevelRequirement(level),
        bab: (level: number): Req => new AttackBonusRequirement(level),
    },
    stat: (stat: StatKey, min: number): Req =>
        characterStatsRequirement(new MinStatsRequirement({ [stat]: min })),
    feats: (...feats: Feat[]): Reqs =>
        feats.map(f => new CharacterFeatRequirement(f)),
    features: (...features: ClassFeature[]): Reqs =>
        features.map(f => new ClassFeatureRequirement(f)),
};

function checkNoDuplicate(key: string): void {
    if (Object.keys(raw).includes(key)) {
        throw new Error(`Duplicate feat key: ${key}`);
    }
}
const allFeatKeys = Object.keys(Feat);
function checkFeatKey(key: string): asserts key is Feat {
    if (!allFeatKeys.includes(key)) {
        throw new Error(`Invalid feat key: ${key}`);
    }
}

function feat(key: Feat, reqs?: Req, flags?: Flags): FeatSpec {
    checkNoDuplicate(key);
    return (raw[key] = new FeatSpec({
        label: key,
        requirements: reqs,
        flags,
    }));
}

const build = {
    basic: (key: Feat, ...reqs: Reqs): FeatSpec => feat(key, allOf(...reqs)),
    save: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.saves]),
    feature: (key: Feat, feature: ClassFeature, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs, ...req.features(feature)), [FeatFlag.class]),
    channelEnh: (key: Feat, ...reqs: Reqs): FeatSpec =>
        // TODO Include sub-feature for granted channel abilities
        feat(
            key,
            allOf(...reqs, either(...req.features(ClassFeature.channel))),
            [FeatFlag.class, FeatFlag.channel]
        ),
    channelType: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs, ...req.features(ClassFeature.channel)), [
            FeatFlag.class,
            FeatFlag.channel,
        ]),
    magic: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.magic]),
    item: (key: Feat, clevel: number): FeatSpec =>
        feat(key, req.level.caster(clevel), [
            FeatFlag.magic,
            FeatFlag.itemCreation,
        ]),
    focus: (key: Feat, prev?: Feat): FeatSpec =>
        feat(key, prev ? allOf(...req.feats(prev)) : prev, [
            FeatFlag.magic,
            FeatFlag.spellFocus,
        ]),
    meta: (key: Feat): FeatSpec =>
        feat(key, req.none, [
            FeatFlag.magic,
            FeatFlag.metaMagic,
            FeatFlag.multiple,
        ]),
    metaSingle: (key: Feat): FeatSpec =>
        feat(key, req.none, [FeatFlag.magic, FeatFlag.metaMagic]),
    combat: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.combat]),
    expertise: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.combat, FeatFlag.expertise]),
};

const feats: { [key in Feat]: FeatSpec } = {
    ...{
        // General feats:
        endurance: build.basic(Feat.endurance),
        diehard: build.basic(Feat.diehard, ...req.feats(Feat.endurance)),
        fleet: build.basic(Feat.fleet),
        leadership: build.basic(Feat.leadership, req.level.global(7)),
        nimbleMoves: build.basic(Feat.nimbleMoves, req.stat(StatKey.DEX, 13)),
        acrobaticSteps: build.basic(
            Feat.acrobaticSteps,
            ...req.feats(Feat.nimbleMoves),
            req.stat(StatKey.DEX, 15)
        ),
        run: build.basic(Feat.run),
    },
    ...{
        // Save feats:
        greatFortitude: build.save(Feat.greatFortitude),
        improvedGreatFortitude: build.save(
            Feat.improvedGreatFortitude,
            ...req.feats(Feat.greatFortitude)
        ),
        ironWill: build.save(Feat.ironWill),
        improvedIronWill: build.save(
            Feat.improvedIronWill,
            ...req.feats(Feat.ironWill)
        ),
        lightningReflexes: build.save(Feat.lightningReflexes),
        improvedLightningReflexes: build.save(
            Feat.improvedLightningReflexes,
            ...req.feats(Feat.lightningReflexes)
        ),
    },
    ...{
        // Class features (+ channel)
        // TODO Include class feature requirements!
        extraKi: build.feature(Feat.extraKi, ClassFeature.kiPool),
        extraRage: build.feature(Feat.extraRage, ClassFeature.rage),
        channelAlignment: build.channelType(Feat.channelAlignment),
        commandUndead: build.channelType(Feat.commandUndead), // TODO negative energy as req
        elementalChannel: build.channelType(Feat.elementalChannel),
        extraChannel: build.channelEnh(Feat.extraChannel),
        improvedChannel: build.channelEnh(Feat.improvedChannel),
        selectiveChannel: build.channelEnh(
            Feat.selectiveChannel,
            req.stat(StatKey.CHA, 13)
        ),
        turnUndead: build.channelType(Feat.turnUndead), // TODO positive energy as req
        channelSmite: feat(
            Feat.channelSmite,
            allOf(...req.features(ClassFeature.channel)),
            [FeatFlag.class, FeatFlag.channel, FeatFlag.combat]
        ),
    },
    ...{
        // Magic feats
        combatCasting: build.magic(Feat.combatCasting),
        eschewMaterials: build.magic(Feat.eschewMaterials),
        improvedCounterspell: build.magic(Feat.improvedCounterspell),
        ...{
            // Item creation
            scribeScroll: build.item(Feat.scribeScroll, 1),
            brewPotion: build.item(Feat.brewPotion, 3),
            craftWondrousItem: build.item(Feat.craftWondrousItem, 3),
            craftArmsArmor: build.item(Feat.craftArmsArmor, 5),
            craftWand: build.item(Feat.craftWand, 5),
            craftRing: build.item(Feat.craftRing, 7),
            craftRod: build.item(Feat.craftRod, 9),
            craftStaff: build.item(Feat.craftStaff, 11),
        },
        ...{
            // Spell focus
            spellFocusAbjuration: build.focus(Feat.spellFocusAbjuration),
            greaterSpellFocusAbjuration: build.focus(
                Feat.greaterSpellFocusAbjuration,
                Feat.spellFocusAbjuration
            ),
            spellFocusConjuration: build.focus(Feat.spellFocusConjuration),
            greaterSpellFocusConjuration: build.focus(
                Feat.greaterSpellFocusConjuration,
                Feat.spellFocusConjuration
            ),
            augmentSummoning: build.magic(
                Feat.augmentSummoning,
                allOf(...req.feats(Feat.spellFocusConjuration))
            ),
            spellFocusDivination: build.focus(Feat.spellFocusDivination),
            greaterSpellFocusDivination: build.focus(
                Feat.greaterSpellFocusDivination,
                Feat.spellFocusDivination
            ),
            spellFocusEnchantment: build.focus(Feat.spellFocusEnchantment),
            greaterSpellFocusEnchantment: build.focus(
                Feat.greaterSpellFocusEnchantment,
                Feat.spellFocusEnchantment
            ),
            spellFocusEvocation: build.focus(Feat.spellFocusEvocation),
            greaterSpellFocusEvocation: build.focus(
                Feat.greaterSpellFocusEvocation,
                Feat.spellFocusEvocation
            ),
            spellFocusIllusion: build.focus(Feat.spellFocusIllusion),
            greaterSpellFocusIllusion: build.focus(
                Feat.greaterSpellFocusIllusion,
                Feat.spellFocusIllusion
            ),
            spellFocusNecromancy: build.focus(Feat.spellFocusNecromancy),
            greaterSpellFocusNecromancy: build.focus(
                Feat.greaterSpellFocusNecromancy,
                Feat.spellFocusNecromancy
            ),
            spellFocusTransmutation: build.focus(Feat.spellFocusTransmutation),
            greaterSpellFocusTransmutation: build.focus(
                Feat.greaterSpellFocusTransmutation,
                Feat.spellFocusTransmutation
            ),
        },
        ...{
            // Metamagic feats
            empowerSpell: build.meta(Feat.empowerSpell),
            enlargeSpell: build.meta(Feat.enlargeSpell),
            extendSpell: build.meta(Feat.extendSpell),
            heightenSpell: build.meta(Feat.heightenSpell),
            maximizeSpell: build.metaSingle(Feat.maximizeSpell),
            quickenSpell: build.metaSingle(Feat.quickenSpell),
            silentSpell: build.metaSingle(Feat.silentSpell),
            stillSpell: build.metaSingle(Feat.stillSpell),
            widenSpell: build.meta(Feat.widenSpell),
        },
    },
    ...{
        // Combat feats
        ...{
            // General combat feats
            agileManeuvers: build.combat(Feat.agileManeuvers),
            arcaneArmorTraining: feat(
                Feat.arcaneArmorTraining,
                allOf(req.level.caster(3)), // TODO Add requirement: Proficiency w/ light armor
                [FeatFlag.combat, FeatFlag.magic]
            ),
            arcaneArmorMastery: feat(
                Feat.arcaneArmorMastery,
                allOf(
                    ...req.feats(Feat.arcaneArmorTraining),
                    req.level.caster(7)
                ), // TODO medium armor
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
        },
        ...{
            // Combat expertise feats
            // TODO
        },
        ...{
            // Critical feats
            // TODO
        },
        ...{
            // Combat mobility feats
            dodge: build.combat(Feat.dodge, req.stat(StatKey.DEX, 13)),
            // TODO: mobility, spring attack, wind stance, lightning stance
        },
        ...{
            // Unarmed combat feats
            // TODO
        },
        ...{
            // Shooting feats
            // TODO
        },
        ...{
            // Power attack feats
            powerAttack: build.combat(Feat.powerAttack, req.stat(StatKey.STR, 13), req.level.bab(1)),
            cleave: build.combat(Feat.cleave, ...req.feats('powerAttack')),
            greatCleave: build.combat(Feat.greatCleave, ...req.feats('cleave'), req.level.bab(4)),
            // TODO: Imp. Bull Rush, Greater Bull Rush, Imp. Overrun, Greater Overrun, Imp. Sunder, Greater Sunder
        },
        ...{
            // Mounted combat feats
            // TODO
        },
        ...{
            // Shield feats
            proficiencyShield: build.combat(Feat.proficiencyShield),
            // TODO: improved shield bash, shield slam, shield master
            weaponFocusShield: build.combat(
                Feat.weaponFocusShield,
                ...req.feats('proficiencyShield'),
                req.level.bab(1)
            ),
            greaterWeaponFocusShield: build.combat(
                Feat.greaterWeaponFocusShield,
                ...req.feats('weaponFocusShield'),
                req.level.bab(8), // TODO: change to effective level (fighter)
            ),
        },
        ...{
            // Dual wielding feats
            twoWeaponFighting: build.combat(Feat.twoWeaponFighting, req.stat(StatKey.DEX, 15)),
            doubleSlice: build.combat(Feat.doubleSlice, ...req.feats('twoWeaponFighting')),
            improvedTwoWeaponFighting: build.combat(
                Feat.improvedTwoWeaponFighting,
                ...req.feats('twoWeaponFighting'),
                req.level.bab(6),
                req.stat(StatKey.DEX, 17),
            ),
            twoWeaponRend: build.combat(
                Feat.twoWeaponRend,
                ...req.feats('improvedTwoWeaponFighting', 'doubleSlice'),
                req.level.bab(11),
            ),
            greaterTwoWeaponFighting: build.combat(
                Feat.greaterTwoWeaponFighting,
                ...req.feats('improvedTwoWeaponFighting'),
                req.level.bab(11),
                req.stat(StatKey.DEX, 19),
            ),
            twoWeaponDefense: build.combat(Feat.twoWeaponDefense, ...req.feats('twoWeaponFighting')),
        },
        ...{
            // Vital strike feats
            vitalStrike: build.combat(Feat.vitalStrike, req.level.bab(1)),
            improvedVitalStrike: build.combat(
                Feat.improvedVitalStrike,
                ...req.feats('vitalStrike'),
                req.level.bab(11)),
            greaterVitalStrike: build.combat(
                Feat.greaterVitalStrike,
                ...req.feats('improvedVitalStrike'),
                req.level.bab(16)),
        },
    },
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
