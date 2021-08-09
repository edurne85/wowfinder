// See http://legacy.aonprd.com/advancedRaceGuide/raceBuilder/racialQualities.html
// and http://legacy.aonprd.com/advancedRaceGuide/raceBuilder/racialTraits.html
import { QualityGroup, RaceTrait, RaceTraitInstance, traits } from './base';

import './abilityScore';
import './defensive';
import './speed';
import './type';

const qs: {[key in QualityGroup]? : RaceTrait[]} = {};
const tValues = Object.values(traits);

for (const q of Object.keys(QualityGroup)) {
    qs[q as QualityGroup] = tValues.filter(t => t.qualityGroup === q as QualityGroup);
}
const qualities = qs as {[key in QualityGroup] : RaceTrait[]};

export default traits;

export {
    RaceTraitInstance,
    traits,
    qualities,
};