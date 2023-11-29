import {
    DamageSpec,
    DamageValue,
    DamageComponentValue,
    DamageComponentSpec,
    PhysicalDamageType,
    EnergyType,
    DamageType,
    SpecialDamageType,
    HybridTypes,
    buildFullDamageTypes,
    makeFullDamageTypes,
    SpecialDamageModifier,
    computeModifier,
    SpecialDamageRollMultiplier,
} from '..';

describe('Damage', () => {
    it('should export DamageSpec', () => {
        expect(DamageSpec).toBeDefined();
    });
    it('should export DamageValue', () => {
        expect(DamageValue).toBeDefined();
    });
    it('should export DamageComponentValue', () => {
        expect(DamageComponentValue).toBeDefined();
    });
    it('should export DamageComponentSpec', () => {
        expect(DamageComponentSpec).toBeDefined();
    });
    it('should export PhysicalDamageType', () => {
        expect(PhysicalDamageType).toBeDefined();
    });
    it('should export EnergyType', () => {
        expect(EnergyType).toBeDefined();
    });
    it('should export DamageType', () => {
        expect(DamageType).toBeDefined();
    });
    it('should export SpecialDamageType', () => {
        expect(SpecialDamageType).toBeDefined();
    });
    it('should export HybridTypes', () => {
        expect(HybridTypes).toBeDefined();
    });
    it('should export buildFullDamageTypes', () => {
        expect(buildFullDamageTypes).toBeDefined();
    });
    it('should export makeFullDamageTypes', () => {
        expect(makeFullDamageTypes).toBeDefined();
    });
    it('should export SpecialDamageModifier', () => {
        expect(SpecialDamageModifier).toBeDefined();
    });
    it('should export computeModifier', () => {
        expect(computeModifier).toBeDefined();
    });
    it('should export SpecialDamageRollMultiplier', () => {
        expect(SpecialDamageRollMultiplier).toBeDefined();
    });
});
