import { Bonus } from '../../Bonus';
import { defineTrait, complain, makeRacialBonus, QualityGroup } from './base';

defineTrait({key: 'normalSpeed', rp: 0, qualityGroup: QualityGroup.speed, processor: (spec): Bonus => {
    complain('Not implemented', spec);
    return makeRacialBonus({
        // TODO: Base speed bonuses
    });
}});

defineTrait({key: 'slowSpeed', rp: -1, qualityGroup: QualityGroup.speed, processor: (): Bonus => {
    return makeRacialBonus({
        // TODO: Base speed bonuses
    });
}});

