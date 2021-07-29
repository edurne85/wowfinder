import { Bonus } from '../../Bonus';
import { defineTrait, complain, makeRacialBonus } from './base';

defineTrait({key: 'ancientFoe', rp: 3, processor: (spec): Bonus => {
    // TODO: foe: MonsterType | HumanoidSubtype
    if ('foe' in spec) {
        return makeRacialBonus({});
    } else {
        throw complain('foe must be a monster type or a humanoid subtype', spec);
    }
}});

defineTrait({key: 'battleHardened', rp: 4, processor: (): Bonus => {
    // TODO: Implement: +1 to CMD
    return makeRacialBonus({});
}});

