import {
    DamageType,
    buildFullDamageTypes,
    makeFullDamageTypes,
} from '../DamageType';
import { mockDamageTypes } from './utils';
describe('DamageType', () => {
    describe('makeFullDamageTypes', () => {
        it('should build a full damage type', () => {
            const types = makeFullDamageTypes(
                DamageType.bludgeoning,
                DamageType.fire,
            );
            expect(types.bludgeoning).toBe(true);
            expect(types.fire).toBe(true);
            expect(types.cold).toBe(false);
        });
    });
    describe('buildFullDamageTypes', () => {
        it('should build a full damage type', () => {
            const types = buildFullDamageTypes({
                bludgeoning: true,
                fire: true,
                cold: false,
                shadow: false,
                psychic: true,
            });
            expect(types.bludgeoning).toBe(true);
            expect(types.fire).toBe(true);
            expect(types.cold).toBe(false);
            expect(types).toEqual(mockDamageTypes);
        });
    });
});
