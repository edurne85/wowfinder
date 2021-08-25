import { DamageType } from './DamageType';
import Dice from './Dice';

type Damage = { [keys in DamageType]?: Dice };

export type {
    Damage,
};