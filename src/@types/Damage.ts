import { DamageType } from './DamageType';
import Dice from './Dice';

type Damage = { [keys in DamageType]?: Dice };

/* function buildDamage(raw: any): Damage {

} */

export type {
    Damage,
};