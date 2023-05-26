import { Feat } from '../Character/Feats';
import { StatSet } from '../Character/Stats';

interface DamageRollArguments {
    stats: StatSet;
    casterLevel: number;
    spellPower: number;
    feats?: Feat[];
}

export { DamageRollArguments };
