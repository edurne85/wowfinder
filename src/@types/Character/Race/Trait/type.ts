import Senses from '../../Bonus/Senses';
import VitalNeeds from '../../Bonus/VitalNeeds';
import Size from '../../Size';
import { complain, defineTrait, makeRacialBonus, QualityGroup } from './base';

defineTrait({key: 'aberration', rp: 3, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
        senses: new Senses({
            darkVision: 60,
        }),
    });
}});

defineTrait({key: 'construct', rp: 20, qualityGroup: QualityGroup.type, processor: (spec) => {
    if (spec.size as Size) {
        const size = spec.size as Size;
        let hp = 0;
        if (size >= Size.large) {
            hp = 30;
        } else if (size === Size.medium) {
            hp = 20;
        } else if (size === Size.small) {
            hp = 10;
        }
        return makeRacialBonus({
            /* TODO
             * ** no Constitution score
             * ** immune to all mind-affecting effects
             * ** not subject to ability damage, ability drain, fatigue, exhaustion, energy drain, or nonlethal damage
             * ** immune to any effect that requires a Fortitude save
             */
            hp,
            vitalNeeds: new VitalNeeds({
                breathe: false,
                eat: false,
                sleep: false,
            }),
            senses: new Senses({
                darkVision: 60,
                lowLightVision: true,
            }),
        });
    } else {
        throw complain('size should be a Size', spec);
    }
}});

defineTrait({key: 'dragon', rp: 10, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
        senses: new Senses({
            darkVision: 60,
        }),
    });
}});

defineTrait({key: 'fey', rp: 2, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
        senses: new Senses({
            lowLightVision: true,
        }),
    });
}});

defineTrait({key: 'humanoid', rp: 0, qualityGroup: QualityGroup.type, processor: () => makeRacialBonus({})});

defineTrait({key: 'monstrousH', rp: 3, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
        senses: new Senses({
            darkVision: 60,
        }),
    });
}});

defineTrait({key: 'outsider', rp: 3, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
        senses: new Senses({
            darkVision: 60,
        }),
    });
}});

defineTrait({key: 'plant', rp: 10, qualityGroup: QualityGroup.type, processor: () => {
    return makeRacialBonus({
            /* TODO
             * ** immune to all mind-affecting effects
             * ** immune to paralysis, poison, polymorph, sleep effects, and stunning
             */
            senses: new Senses({
            lowLightVision: true,
        }),
        vitalNeeds: new VitalNeeds({
            sleep: false,
        })
    });
}});

// TODO: Undead
// TODO: Half-construct
// TODO: Half-undead