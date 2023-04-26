import { Character } from '../../../Character';
import { ClassFeature } from '../../Class';
import {
    and as allOf,
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterFeatRequirement,
    CharacterLevelRequirement,
    characterStatsRequirement,
    ClassFeatureRequirement,
    MinStatsRequirement,
    or as either,
    Requirement,
} from '../../Requirements';
import { StatKey } from '../../Stats';
import { Feat, WeaponFeat, weaponFeats } from '../Feat';
import { FeatFlag } from '../FeatFlag';
import { FeatSpec } from '../FeatSpec';

const raw: { [key in Feat]?: FeatSpec } = {};

type Req = Requirement<Character>;
type Reqs = Requirement<Character>[];
type Flags = Iterable<FeatFlag>;

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
const build = {
    basic: (key: Feat, ...reqs: Reqs): FeatSpec => feat(key, allOf(...reqs)),
    save: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.saves]),
    combat: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.combat]),
    expertise: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.combat, FeatFlag.expertise]),
};

const allFeatKeys = Object.keys(Feat);
function checkFeatKey(key: string): asserts key is Feat {
    if (!allFeatKeys.includes(key)) {
        throw new Error(`Invalid feat key: ${key}`);
    }
}

const allWeaponFeatKeys = Object.keys(weaponFeats);
function checkWeaponFeatKey(key: string): asserts key is WeaponFeat {
    if (!allWeaponFeatKeys) {
        throw new Error(`Invalid weapon feat key: ${key}`);
    }
}

export {
    raw,
    req,
    build,
    feat,
    allOf,
    either,
    checkFeatKey,
    checkWeaponFeatKey,
};
export type { Req, Reqs, Flags };
