import { Bonus } from '../../Bonus';

type AuraBonus = (rank: number) => Bonus;

enum Aura {
    commanding = 'commanding',
    arcane = 'arcane',
    wild = 'wild',
    mysterious = 'mysterious',
    fortitude = 'fortitude',
    furious = 'furious',
}

export type { AuraBonus };
export { Aura };
