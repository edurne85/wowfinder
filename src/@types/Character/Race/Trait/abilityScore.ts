import { Bonus, StatsBonus } from '../../Bonus';
import { StatGroup, inGroup, StatKey, PartialStatSet } from '../../Stats';
import { defineTrait, complain, makeRacialBonus, QualityGroup } from './base';

defineTrait({key: 'advanced', rp: 4, qualityGroup: QualityGroup.stat, processor: (spec): Bonus => {
    if(spec.group as StatGroup) {
        const group = spec.group as StatGroup;
        if (spec.bonus as StatKey && spec.penalty as StatKey) {
            const bonus = spec.bonus as StatKey;
            const penalty = spec.penalty as StatKey;
            if (!inGroup(bonus, group) && !inGroup(penalty, group)) {
                const stats: PartialStatSet = {
                    [bonus]: 4,
                    [penalty]: -2,
                };
                for (const s of Object.keys(StatKey).filter(k => inGroup(k as StatKey, group))) {
                    stats[s as StatKey] = 2;
                }
                return makeRacialBonus({
                    stats: new StatsBonus(stats),
                });
            } else {
                throw complain('bonus and penalty must not be in the StatGroup group', spec);
            }
        } else {
            throw complain('bonus and penalty should be StatKey', spec);
        }
    } else {
        throw complain('group should be a StatGroup', spec);
    }
}});

// TODO ability score racial qualities

defineTrait({key: 'advSTR', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.STR]: 2}),
    });
}});

defineTrait({key: 'advDEX', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.DEX]: 2}),
    });
}});

defineTrait({key: 'advCON', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.CON]: 2}),
    });
}});

defineTrait({key: 'advINT', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.INT]: 2}),
    });
}});

defineTrait({key: 'advWIS', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.WIS]: 2}),
    });
}});

defineTrait({key: 'advCHA', rp: 4, processor: (): Bonus => {
    return makeRacialBonus({
        stats: new StatsBonus({ [StatKey.CHA]: 2}),
    });
}});
