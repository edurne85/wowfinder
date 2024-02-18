import { Bonus, BonusType, MultiBonus } from '../../../Character/Bonus';
import { Gear } from '../base';
import ArmorBonusType from './BonusType';
import ArmorFlags from './Flags';
import ArmorType from './Type';
import { ArmorBuilder, armorPreBuild } from './builder';
import { validateArmor } from './validation';

class Armor extends Gear {
    #type: ArmorType;
    #acBonus: number;
    #bonusType: ArmorBonusType;
    #intrinsic: number;
    #maxDex: number;
    #acp: number;
    #asf: number;
    #flags: Set<ArmorFlags>;

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
        this.#type = type;
        this.#acBonus = acBonus;
        this.#bonusType = bonusType;
        this.#intrinsic = intrinsic;
        this.#maxDex = maxDex;
        this.#acp = acp;
        this.#asf = asf;
        this.#flags = new Set(flags);
    }

    get maxDex(): number {
        return this.#maxDex;
    }

    get acp(): number {
        return this.#acp;
    }

    get asf(): number {
        return this.#asf;
    }

    get flags(): Set<ArmorFlags> {
        return new Set(this.#flags);
    }

    get encumbering(): boolean {
        return (
            this.#type === ArmorType.heavy || this.#type === ArmorType.medium
        );
    }

    get fullBonus(): MultiBonus {
        const total = this.#acBonus + this.#intrinsic;
        return new MultiBonus({
            armor: new Bonus({
                type: BonusType.armor,
                armorClass:
                    this.#bonusType === ArmorBonusType.armor ? total : 0,
            }),
            shield: new Bonus({
                type: BonusType.shield,
                armorClass:
                    this.#bonusType === ArmorBonusType.shield ? total : 0,
            }),
            gear: this.bonuses,
        });
    }

    get type(): ArmorType {
        return this.#type;
    }

    get bonusType(): ArmorBonusType {
        return this.#bonusType;
    }

    get acBonus(): number {
        return this.#acBonus;
    }

    get intrinsic(): number {
        return this.#intrinsic;
    }

    get $type(): string {
        return 'Armor';
    }

    validate(): void {
        super.validate();
        validateArmor(this);
    }

    static preBuild(raw: any): ArmorBuilder {
        return armorPreBuild(raw);
    }

    static build(raw: any = {}): Armor {
        return new Armor(Armor.preBuild(raw));
    }
}

export { Armor };
