import { DamageType } from '../../Damage';
import {
    ResistanceBreakdown,
    ResistanceBreakdownImpl,
} from './ResistanceBreakdown';
import { FullResistances, ResistancesBuilder } from './helpers';

const zero = (): ResistanceBreakdownImpl => ResistanceBreakdownImpl.zero;

abstract class TypedResistances implements FullResistances, ResistancesBuilder {
    #data: FullResistances;
    constructor(data: ResistancesBuilder) {
        this.#data = {
            [DamageType.bludgeoning]: data.bludgeoning || zero(),
            [DamageType.slashing]: data.slashing || zero(),
            [DamageType.piercing]: data.piercing || zero(),
            [DamageType.arcane]: data.arcane || zero(),
            [DamageType.fire]: data.fire || zero(),
            [DamageType.cold]: data.cold || zero(),
            [DamageType.nature]: data.nature || zero(),
            [DamageType.shadow]: data.shadow || zero(),
            [DamageType.holy]: data.holy || zero(),
            [DamageType.psychic]: data.psychic || zero(),
        };
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdownImpl(this.#data[type]);
    }

    get bludgeoning(): ResistanceBreakdown {
        return this.byType(DamageType.bludgeoning);
    }

    get slashing(): ResistanceBreakdown {
        return this.byType(DamageType.slashing);
    }

    get piercing(): ResistanceBreakdown {
        return this.byType(DamageType.piercing);
    }

    get arcane(): ResistanceBreakdown {
        return this.byType(DamageType.arcane);
    }

    get fire(): ResistanceBreakdown {
        return this.byType(DamageType.fire);
    }

    get cold(): ResistanceBreakdown {
        return this.byType(DamageType.cold);
    }

    get nature(): ResistanceBreakdown {
        return this.byType(DamageType.nature);
    }

    get shadow(): ResistanceBreakdown {
        return this.byType(DamageType.shadow);
    }

    get holy(): ResistanceBreakdown {
        return this.byType(DamageType.holy);
    }

    get psychic(): ResistanceBreakdown {
        return this.byType(DamageType.psychic);
    }
}

export { TypedResistances };
