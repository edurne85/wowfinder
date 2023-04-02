import { Bonus } from '../../Bonus';

type AuraBonus = (rank: number) => Bonus;

enum Aura {
    commanding = 'commanding',
    arcane = 'arcane',
    wild = 'wild',
    bear = 'bear',
    cat = 'cat',
    moon = 'moon',
    root = 'root',
    mysterious = 'mysterious',
    fortitude = 'fortitude',
}

export type { AuraBonus };
export { Aura };
