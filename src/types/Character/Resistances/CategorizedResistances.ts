import { DamageType } from '../../Damage';
import {
    ResistanceBreakdownImpl,
    ResistanceBreakdown,
} from './ResistanceBreakdown';
import { ResistanceCategory } from './ResistanceCategory';
import {
    ResistanceSetImpl,
    ResistanceSet,
    ResistancePartialSet,
} from './ResistanceSet';

type CategorizedResistancesBase = {
    [key in ResistanceCategory]: ResistanceSet;
};

type CategorizedResistancesBuilder = {
    [key in ResistanceCategory]?: ResistancePartialSet;
};

class CategorizedResistances
    implements CategorizedResistancesBase, CategorizedResistancesBuilder
{
    private _enh: ResistanceSet;
    private _gear: ResistanceSet;
    private _misc: ResistanceSet;
    private _temp: ResistanceSet;

    constructor({ enhance, gear, misc, temp }: CategorizedResistancesBuilder) {
        this._enh = new ResistanceSetImpl(enhance || {});
        this._gear = new ResistanceSetImpl(gear || {});
        this._misc = new ResistanceSetImpl(misc || {});
        this._temp = new ResistanceSetImpl(temp || {});
    }

    get enhance(): ResistanceSet {
        return this._enh;
    }

    get gear(): ResistanceSet {
        return this._gear;
    }

    get misc(): ResistanceSet {
        return this._misc;
    }

    get temp(): ResistanceSet {
        return this._temp;
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdownImpl({
            enhance: this._enh[type],
            gear: this._gear[type],
            misc: this._misc[type],
            temp: this._temp[type],
        });
    }
}

export type { CategorizedResistancesBase, CategorizedResistancesBuilder };
export { CategorizedResistances };
