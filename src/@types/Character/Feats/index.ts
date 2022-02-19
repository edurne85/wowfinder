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
} from '../Requirements';
import { CharacterFeatRequirement } from '../Requirements/FeatRequirement';
import { StatKey } from '../Stats';
import { Feat } from './Feat';
import { FeatSpec } from './FeatSpec';
import { FeatFlag } from './FeatFlag';

const raw: { [key in Feat]?: FeatSpec } = {};

type Req = Requirement<Character>;
type Reqs = Requirement<Character>[];
type Flags = Iterable<FeatFlag>;

const req = {
    level: {
        global: (level: number): Requirement<Character> =>
            new CharacterLevelRequirement(level),
        caster: (level: number): Requirement<Character> =>
            new CasterLevelRequirement(level),
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
        feat(key, req.level.caster(clevel), [FeatFlag.magic, FeatFlag.itemCreation]),
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
        ... {
            // Item creation
            scribeScroll: build.item(Feat.scribeScroll, 1),
            brewPotion: build.item(Feat.brewPotion, 3),
            craftWondrousItem: build.item(Feat.craftWondrousItem, 3),
            craftArmsArmor: build.item(Feat.craftArmsArmor, 5),
            craftWand: build.item(Feat.craftWand, 5),
            craftRing: build.item(Feat.craftRing, 7),
            craftRod: build.item(Feat.craftRod, 9),
            craftStaff: build.item(Feat.craftStaff, 11),
        }
    },
};

Object.freeze(feats);

export {
    Feat,
    FeatFlag,
    FeatSpec,
    feats,
};