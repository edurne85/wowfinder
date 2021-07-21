import JSON5 from 'json5';
import Language from '../../Language';
import Alignment from '../Alignment';
import { RacialTrait } from './Traits';

interface RaceBuilder {
    key: string,
    initialLangs: Language[];
    additionalLangs: Language[];
    traits: RacialTrait[];
    commonAligns: Alignment[];
};

export default class Race {
    private key: string;
    private _initial: Language[];
    private _additional: Language[];
    private _traits: RacialTrait[];

    constructor({
        key,
        initialLangs,
        additionalLangs,
        traits,
    }: RaceBuilder) {
        this.key = key;
        Object.freeze(this._initial = [...initialLangs]);
        Object.freeze(this._additional = [...additionalLangs]);
        Object.freeze(this._traits = [...traits]);
        Object.freeze(this);
    }

    get initialLanguages(): Language[] { return [...this._initial]; }

    get additionalLanguages(): Language[] { return [...this._additional]; }

    get traits(): RacialTrait[] { return [...this._traits]; }

    private static _import(json: string): Race {
        const obj = JSON5.parse(json) || {};
        return new Race({...obj});
    }

    static import  (dir: string = 'data/Races'): {[key:string]: Race} {
        const byKey: {[key:string]: Race} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Race._import(window.Files.slurp(file));
                if (byKey[raw.key]) {
                    console.warn(`Duplicate race key ${raw.key} found.`);
                }
                byKey[raw.key] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(byKey);
    }
};