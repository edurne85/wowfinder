import { DamageType } from './DamageType';
import Dice from '../Dice';

type Damage = { [keys in DamageType]?: Dice };

function buildDamage(raw: any): Damage {
    const result: Damage = {};
    for (const k of Object.keys(raw)
        .map(k => k as DamageType)
        .filter(k => k)) {
        result[k] = Dice.build(raw[k]);
    }
    return result;
}

export type { Damage };
export { buildDamage };
