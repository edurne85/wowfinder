import { DamageType } from '../../Damage';
import {
    CategorizedResistances,
    CategorizedResistancesBuilder,
} from './CategorizedResistances';
import { ResistanceCategory } from './ResistanceCategory';
import { ResistanceSet, ResistanceSetImpl } from './ResistanceSet';

import { TypedResistances } from './TypedResistances';
import { ResistancesBuilder } from './helpers';

abstract class ResistancesByCategory extends TypedResistances {
    byCategory(category: ResistanceCategory): ResistanceSet {
        return new ResistanceSetImpl({
            bludgeoning: this.bludgeoning[category],
            slashing: this.slashing[category],
            piercing: this.piercing[category],
            arcane: this.arcane[category],
            fire: this.fire[category],
            cold: this.cold[category],
            nature: this.nature[category],
            shadow: this.shadow[category],
            holy: this.holy[category],
            psychic: this.psychic[category],
        });
    }

    get categorized(): CategorizedResistances {
        return new CategorizedResistances({
            enhance: this.byCategory(ResistanceCategory.enhance),
            gear: this.byCategory(ResistanceCategory.gear),
            misc: this.byCategory(ResistanceCategory.misc),
            temp: this.byCategory(ResistanceCategory.temp),
        });
    }

    static fromCategorized(
        source: CategorizedResistancesBuilder,
    ): ResistancesBuilder {
        const curated = new CategorizedResistances(source);
        return {
            bludgeoning: curated.byType(DamageType.bludgeoning),
            slashing: curated.byType(DamageType.slashing),
            piercing: curated.byType(DamageType.piercing),
            arcane: curated.byType(DamageType.arcane),
            fire: curated.byType(DamageType.fire),
            cold: curated.byType(DamageType.cold),
            nature: curated.byType(DamageType.nature),
            shadow: curated.byType(DamageType.shadow),
            holy: curated.byType(DamageType.holy),
            psychic: curated.byType(DamageType.psychic),
        };
    }
}

export { ResistancesByCategory };
