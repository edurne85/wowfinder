import { JsonValue } from '../../utils';
import { Class } from './Class';
import { Feat } from './Feats';
import Race from './Race';

const defaultRace = 'human.cha';
const Races = Race.import();
function checkRace(raceName: string): Race {
    const r = Races[raceName || defaultRace];
    if (!r) {
        throw new Error(`Unknown race key: ${raceName}`);
    }
    return r;
}

const Classes = Class.import();
function checkClass(className: string): Class {
    const c = Classes[className];
    if (!c) {
        throw new Error(`Unknown class key: ${className}`);
    }
    return c;
}

interface FeatChoice {
    feat: Feat;
    class?: Class;
    level: number;
}

interface FeatChoiceExport {
    [key: string]: JsonValue;
    feat: string;
    class: string;
    level: number;
}

function parseFeatChoice(raw: any): FeatChoice | null {
    const res = { ...raw };
    if (res.class) {
        if (!(res.class instanceof Class)) {
            const k = res.class;
            res.class = Classes[k];
            if (!res.class) {
                console.warn(`Unknown class key: ${k}`);
                return null;
            }
        }
    }
    if (!Object.keys(Feat).includes(res.feat)) {
        console.warn(`Unknown feat key: ${res.feat}`);
        return null;
    }
    return res;
}

function parseFeatChoices(raw: any[]): FeatChoice[] {
    const res: FeatChoice[] = [];
    for (const f of raw.map(parseFeatChoice)) {
        if (f !== null) {
            res.push(f);
        }
    }
    return res;
}

function exportFeatchChoices(...raw: FeatChoice[]): FeatChoiceExport[] {
    return raw.map(f => ({
        feat: f.feat,
        class: f.class?.key || '',
        level: f.level,
    }));
}

export type { FeatChoice, FeatChoiceExport };
export { checkRace, checkClass, parseFeatChoices, exportFeatchChoices };
