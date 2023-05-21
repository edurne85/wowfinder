import { CategorizedResistancesBuilder } from './CategorizedResistances';
import { ResistanceBreakdownImpl } from './ResistanceBreakdown';
import { ResistancesByCategory } from './ResistancesByCategory';
import { ResistancesBuilder, ResistancesExport } from './helpers';

class Resistances extends ResistancesByCategory {
    static fromCategorized(source: CategorizedResistancesBuilder): Resistances {
        return new Resistances(ResistancesByCategory.fromCategorized(source));
    }

    static get zero(): Resistances {
        return new Resistances({
            bludgeoning: ResistanceBreakdownImpl.zero,
            slashing: ResistanceBreakdownImpl.zero,
            piercing: ResistanceBreakdownImpl.zero,
            arcane: ResistanceBreakdownImpl.zero,
            fire: ResistanceBreakdownImpl.zero,
            cold: ResistanceBreakdownImpl.zero,
            nature: ResistanceBreakdownImpl.zero,
            shadow: ResistanceBreakdownImpl.zero,
            holy: ResistanceBreakdownImpl.zero,
        });
    }

    updatedByType(data: ResistancesBuilder): Resistances {
        return new Resistances(
            Object.assign({}, this, data) as ResistancesBuilder,
        );
    }

    updatedByCategory(data: CategorizedResistancesBuilder): Resistances {
        const { enhance, gear, misc, temp } = this.categorized;
        const curated = Object.assign({}, { enhance, gear, misc, temp }, data);
        return Resistances.fromCategorized(
            curated as CategorizedResistancesBuilder,
        );
    }

    export(): ResistancesExport {
        return {
            bludgeoning: this.bludgeoning,
            slashing: this.slashing,
            piercing: this.piercing,
            arcane: this.arcane,
            fire: this.fire,
            cold: this.cold,
            nature: this.nature,
            shadow: this.shadow,
            holy: this.holy,
        };
    }
}

export { Resistances };
