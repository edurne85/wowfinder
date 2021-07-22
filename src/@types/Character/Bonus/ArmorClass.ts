import { sum } from '../../../utils';

type ArmorClassBonusBuilder = {
    armor?: number,
    shield?: number,
    complement?: number,
    enhancement?: number,
    deflection?: number,
    dodge?: number,
    natural?: number,
    temporal?: number,
};

export default class ArmorClassBonus {
    private _armor: number;
    private _shield: number;
    private _complement: number;
    private _enhancement: number;
    private _deflection: number;
    private _dodge: number;
    private _natural: number;
    private _temporal: number;

    constructor({
        armor = 0,
        shield = 0,
        complement = 0,
        enhancement = 0,
        deflection = 0,
        dodge = 0,
        natural = 0,
        temporal = 0,
    }: ArmorClassBonusBuilder) {
        this._armor = armor;
        this._shield = shield;
        this._complement = complement;
        this._enhancement = enhancement;
        this._deflection = deflection;
        this._dodge = dodge;
        this._natural = natural;
        this._temporal = temporal;
    }

    get armor(): number { return this._armor; }
    
    get shield(): number { return this._shield; }
    
    get complement(): number { return this._complement; }
    
    get enhancement(): number { return this._enhancement; }
    
    get deflection(): number { return this._deflection; }
    
    get dodge(): number { return this._dodge; }
    
    get natural(): number { return this._natural; }
    
    get temporal(): number { return this._temporal; }

    static get zero(): ArmorClassBonus { return new ArmorClassBonus({}); }

    static combine(...args: ArmorClassBonus[]): ArmorClassBonus {
        return new ArmorClassBonus({
            armor: Math.max(...args.map(a => a._armor || 0)),
            shield: Math.max(...args.map(a => a._shield || 0)),
            complement: sum(...args.map(a => a._complement || 0)),
            enhancement: Math.max(...args.map(a => a._enhancement || 0)),
            deflection: Math.max(...args.map(a => a._deflection || 0)),
            dodge: sum(...args.map(a => a._dodge || 0)),
            natural: Math.max(...args.map(a => a._natural || 0)),
            temporal: sum(...args.map(a => a._temporal || 0)),
        });
    }
}
