export { DamageSpec } from './DamageSpec';
export type { DamageSpecBuilder } from './DamageSpec';
export { DamageValue } from './DamageValue';
export type { DamageValueBuilder } from './DamageValue';
export { DamageComponentValue, DamageComponentSpec } from './DamageComponent';
export type {
    DamageComponentValueBuilder,
    DamageComponentSpecBuilder,
} from './DamageComponent';
export type { DamageTypes, FullDamageTypes } from './DamageType';
export {
    DamageType,
    PhysicalDamageType,
    EnergyType,
    SpecialDamageType,
    buildFullDamageTypes,
    makeFullDamageTypes,
} from './DamageType';
// @deperecated
export type { Damage } from './Damage';
// @deprecated
export { buildDamage } from './Damage';
