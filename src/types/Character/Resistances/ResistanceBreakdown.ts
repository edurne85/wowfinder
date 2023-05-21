import { ResistanceCategory } from './ResistanceCategory';

type ResistanceBreakdown = { [key in ResistanceCategory]: number } & {
    readonly total: number;
};

type ResistanceBreakdownBuilder = { [key in ResistanceCategory]?: number };

class ResistanceBreakdownImpl
    implements ResistanceBreakdown, ResistanceBreakdownBuilder
{
    private _enh: number;
    private _gear: number;
    private _misc: number;
    private _temp: number;
    constructor({
        enhance = 0,
        gear = 0,
        misc = 0,
        temp = 0,
    }: ResistanceBreakdownBuilder) {
        this._enh = enhance;
        this._gear = gear;
        this._misc = misc;
        this._temp = temp;
    }

    get enhance(): number {
        return this._enh;
    }

    get gear(): number {
        return this._gear;
    }

    get misc(): number {
        return this._misc;
    }

    get temp(): number {
        return this._temp;
    }

    get total(): number {
        return this._enh + this._gear + this._misc + this._temp;
    }

    static get zero(): ResistanceBreakdownImpl {
        return new ResistanceBreakdownImpl({
            enhance: 0,
            gear: 0,
            misc: 0,
            temp: 0,
        });
    }
}

export type { ResistanceBreakdown, ResistanceBreakdownBuilder };
export { ResistanceBreakdownImpl };
