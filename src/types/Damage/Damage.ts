/* eslint-disable deprecation/deprecation */
import { DamageType } from './DamageType';
import Dice from '../Dice';

/**
 * @deprecated
 */
type Damage = { [keys in DamageType]?: Dice };

/**
 * @deprecated
 */
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
