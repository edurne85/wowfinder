import { StatKey } from '../../Character/Stats';
import { DamageComponentValue, DamageComponentSpec } from '../DamageComponent';
import {
    damageComponentSpecBuilder,
    maxRoll,
    minRoll,
    mockDamageTypes,
    rollArgsSimple,
    stats,
} from './utils';

describe('DamageComponentValue', () => {
    it('should initialize with the provided damage types and total', () => {
        const damageComponent = new DamageComponentValue({
            types: mockDamageTypes,
            total: 15,
        });

        expect(damageComponent.types).toEqual(mockDamageTypes);
        expect(damageComponent.total).toEqual(15);
    });

    it('should multiply the total by the provided multiplier', () => {
        const damageComponent = new DamageComponentValue({
            types: mockDamageTypes,
            total: 15,
        });

        const multipliedDamageComponent = damageComponent.multiply(2);

        expect(multipliedDamageComponent.total).toEqual(30);
    });
});

describe('DamageComponentSpec', () => {
    it('should initialize with the provided damage types and total', () => {
        const damageComponent = new DamageComponentSpec(
            damageComponentSpecBuilder,
        );

        expect(damageComponent.types).toEqual(mockDamageTypes);
        expect(damageComponent.diceCount).toEqual(2);
        expect(damageComponent.diceSides).toEqual(6);
        expect(damageComponent.fixedMod).toEqual(3);
        expect(damageComponent.mod).toEqual(StatKey.STR);
        expect(damageComponent.dice.qtty).toEqual(2);
        expect(damageComponent.dice.sides).toEqual(6);
        expect(damageComponent.dice.fixedMod).toEqual(3);
    });
    describe('Handling of missing optional arguments', () => {
        const partialDamageComponentSpecBuilder = {
            ...damageComponentSpecBuilder,
            fixedMod: undefined,
            modStat: undefined,
        };

        it('should use the default values optional arguments when not provided', () => {
            const partialDamageComponent = new DamageComponentSpec(
                partialDamageComponentSpecBuilder,
            );
            expect(partialDamageComponent.fixedMod).toEqual(0);
            expect(partialDamageComponent.dice.fixedMod).toEqual(0);
            expect(partialDamageComponent.mod).toBeUndefined();
        });
        it('should use a default value of 0 for the modifier when rolling', () => {
            const partialDamageComponent = new DamageComponentSpec(
                partialDamageComponentSpecBuilder,
            );
            const rolled = partialDamageComponent.roll(rollArgsSimple);
            expect(rolled.total).toBeGreaterThanOrEqual(
                minRoll(partialDamageComponentSpecBuilder, stats),
            );
            expect(rolled.total).toBeLessThanOrEqual(
                maxRoll(partialDamageComponentSpecBuilder, stats),
            );
        });
    });
    it('should always roll within the expected range', () => {
        const numberOfTestRolls = 100;
        const damageComponent = new DamageComponentSpec(
            damageComponentSpecBuilder,
        );
        for (let i = 0; i < numberOfTestRolls; i++) {
            const roll = damageComponent.roll(rollArgsSimple);
            expect(roll.total).toBeGreaterThanOrEqual(
                minRoll(damageComponentSpecBuilder, stats),
            );
            expect(roll.total).toBeLessThanOrEqual(
                maxRoll(damageComponentSpecBuilder, stats),
            );
        }
    });
});
