import { Dice } from '../Dice';

describe('Dice', () => {
    describe('constructor', () => {
        it('should build a dice', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.sides).toBe(6);
            expect(dice.qtty).toBe(1);
            expect(dice.fixedMod).toBe(0);
        });
    });
    describe('toString', () => {
        it('should return a string representation of the dice', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.toString()).toBe('1d6');
        });
        it('should return a string representation of the dice with modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.toString()).toBe('1d6 + 2');
        });
        it('should return a string representation of the dice with negative modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: -2,
            });
            expect(dice.toString()).toBe('1d6 - 2');
        });
    });
    describe('roll', () => {
        it('should roll the dice', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            const roll = dice.roll();
            expect(roll).toBeGreaterThanOrEqual(1);
            expect(roll).toBeLessThanOrEqual(6);
        });
        it('should roll the dice with modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            const roll = dice.roll();
            expect(roll).toBeGreaterThanOrEqual(3);
            expect(roll).toBeLessThanOrEqual(8);
        });
    });
    describe('average', () => {
        it('should return the average roll', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.average).toBe(3.5);
        });
        it('should return the average roll with modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.average).toBe(5.5);
        });
        it('should return the average roll for a 1-sided die', () => {
            const dice = new Dice({
                sides: 1,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.average).toBe(1);
        });
    });
    describe('max', () => {
        it('should return the max roll', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.max).toBe(6);
        });
        it('should return the max roll with modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.max).toBe(8);
        });
        it('should return the max roll for a 1-sided die', () => {
            const dice = new Dice({
                sides: 1,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.max).toBe(1);
        });
    });
    describe('min', () => {
        it('should return the min roll', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.min).toBe(1);
        });
        it('should return the min roll with modifier', () => {
            const dice = new Dice({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.min).toBe(3);
        });
        it('should return the min roll for a 1-sided die', () => {
            const dice = new Dice({
                sides: 1,
                qtty: 1,
                fixedMod: 0,
            });
            expect(dice.min).toBe(1);
        });
    });
    describe('build', () => {
        it('should build a set of dice', () => {
            const dice = Dice.build({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.sides).toBe(6);
            expect(dice.qtty).toBe(1);
            expect(dice.fixedMod).toBe(2);
        });
        it('should build a set of dice with default values', () => {
            const dice = Dice.build({});
            expect(dice.sides).toBe(6);
            expect(dice.qtty).toBe(1);
            expect(dice.fixedMod).toBe(0);
        });
    });
    describe('make', () => {
        it('should build a set of dice', () => {
            const dice = Dice.make({
                sides: 6,
                qtty: 1,
                fixedMod: 2,
            });
            expect(dice.sides).toBe(6);
            expect(dice.qtty).toBe(1);
            expect(dice.fixedMod).toBe(2);
        });
        it('should build a set of dice with default values', () => {
            const dice = Dice.make({
                sides: 6,
            });
            expect(dice.sides).toBe(6);
            expect(dice.qtty).toBe(1);
            expect(dice.fixedMod).toBe(0);
        });
        it('should build a set of dice from a number', () => {
            const dice = Dice.make(6);
            expect(dice.sides).toBe(0);
            expect(dice.qtty).toBe(0);
            expect(dice.fixedMod).toBe(6);
        });
    });
});
