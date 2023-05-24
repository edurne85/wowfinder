import { Bonus, BonusType, MultiBonus } from '../../../Character/Bonus';
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

class Armor extends Gear {
    private _type: ArmorType;
    private _acBonus: number;
    private _bonusType: ArmorBonusType;
    private _intrinsic: number;
    private _maxDex: number;
    private _acp: number;
    private _asf: number;
    private _flags: Set<ArmorFlags>;

    constructor({
        type = ArmorType.misc,
        acBonus = 0,
        bonusType = ArmorBonusType.armor,
        intrinsic = 0,
        maxDex = Number.POSITIVE_INFINITY,
        acp = 0,
        asf = 0,
        flags = new Set<ArmorFlags>(),
        ...args
    }: ArmorBuilder) {
        super(args);
        this._type = type;
        this._acBonus = acBonus;
        this._bonusType = bonusType;
        this._intrinsic = intrinsic;
        this._maxDex = maxDex;
        this._acp = acp;
        this._asf = asf;
        this._flags = new Set(flags);
    }

    get encumbering(): boolean {
        return (
            this._type === ArmorType.heavy || this._type === ArmorType.medium
        );
    }

    get fullBonus(): MultiBonus {
        const total = this._acBonus + this._intrinsic;
        return new MultiBonus({
            armor: new Bonus({
                type: BonusType.armor,
                armorClass:
                    this._bonusType === ArmorBonusType.armor ? total : 0,
            }),
            shield: new Bonus({
                type: BonusType.shield,
                armorClass:
                    this._bonusType === ArmorBonusType.shield ? total : 0,
            }),
            gear: this.bonuses,
        });
    }

    get $type(): string {
        return 'Armor';
    }

    static preBuild(raw: any): ArmorBuilder {
        return {
            ...Gear.preBuild(raw),
            type: (raw.type as ArmorType) || ArmorType.misc,
            acBonus: (raw.acBonus as number) || 0,
            bonusType:
                (raw.bonusType as ArmorBonusType) || ArmorBonusType.armor,
            intrinsic: (raw.intrinsic as number) || 0,
            maxDex: (raw.maxDex as number) || Number.POSITIVE_INFINITY,
            acp: (raw.acp as number) || 0,
            asf: (raw.asf as number) || 0,
            flags: (raw.flags as Set<ArmorFlags>) || [],
        };
    }

    static build(raw: any = {}): Armor {
        return new Armor(Armor.preBuild(raw));
    }
}

export { Armor };
