import { Gear, GearBuilder } from '../base';
import ArmorBonusType from './BonusType';
import ArmorFlags from './Flags';
import ArmorType from './Type';

interface ArmorBuilder extends GearBuilder {
    type?: ArmorType;
    acBonus?: number;
    bonusType?: ArmorBonusType;
    intrinsic?: number;
    maxDex?: number;
    acp?: number;
    asf?: number; // Normalized [0, 1]
    flags?: Set<ArmorFlags>;
}

function armorPreBuild(raw: any): ArmorBuilder {
    return {
        ...Gear.preBuild(raw),
        type: (raw.type as ArmorType) || ArmorType.misc,
        acBonus: (raw.acBonus as number) || 0,
        bonusType: (raw.bonusType as ArmorBonusType) || ArmorBonusType.armor,
        intrinsic: (raw.intrinsic as number) || 0,
        maxDex: (raw.maxDex as number) || Number.POSITIVE_INFINITY,
        acp: (raw.acp as number) || 0,
        asf: (raw.asf as number) || 0,
        flags: (raw.flags as Set<ArmorFlags>) || [],
    };
}

export { ArmorBuilder, armorPreBuild };
