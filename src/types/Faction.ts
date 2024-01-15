import { forceDataLoadKeyLabel } from '../utils';

enum Reputation {
    hated = 'hated',
    hostile = 'hostile',
    unfriendly = 'undfriendly',
    neutral = 'neutral',
    friendly = 'friendly',
    honored = 'honored',
    revered = 'revered',
    exalted = 'exalted',
}

type Rep = Reputation;

const initialHatedScore = -42000;

const threshholds: { [key in Rep]: number } = {
    hated: -42000,
    hostile: -6000,
    undfriendly: -3000,
    neutral: 0,
    friendly: 3000,
    honored: 9000,
    revered: 21000,
    exalted: 42000,
};
Object.freeze(threshholds);

const sortedDownTiers = ([...Object.keys(threshholds)] as Rep[]).sort(
    (a: Rep, b: Rep): number => threshholds[b] - threshholds[a],
);
const lastRep = sortedDownTiers[sortedDownTiers.length - 1];

const sortedUpScores = [...Object.values(threshholds)].sort((a, b) => a - b);

function reputationByScoreNullable(score: number): Rep | null {
    for (const k of sortedDownTiers) {
        if (score >= threshholds[k]) {
            return k;
        }
    }
    return null;
}
function reputationByScore(score: number): Rep {
    return reputationByScoreNullable(score) || lastRep;
}

function nextScore(current: number): number {
    for (const score of sortedUpScores) {
        if (score > current) {
            return score;
        }
    }
    return NaN;
}

type Factions = {
    byKey: { [key: number]: Faction };
    byLabel: { [label: string]: Faction };
};

class Faction {
    private _key: number;
    private _label: string;
    private _name: string;

    constructor({
        key,
        label,
        name,
    }: {
        key: number;
        label: string;
        name: string;
    }) {
        this._key = key;
        this._label = label;
        this._name = name;
        Object.freeze(this);
    }

    get key(): number {
        return this._key;
    }

    get label(): string {
        return this._label;
    }

    get name(): string {
        return this._name;
    }

    toString(): string {
        return this.name;
    }

    static build(raw: any): Faction {
        return new Faction({
            key: parseInt(raw.key) || 0,
            label: (raw.label || '') + '',
            name: (raw.name || '') + '',
        });
    }

    static #loaded: Factions | null = null;

    static load(): Factions {
        return (this.#loaded ||= forceDataLoadKeyLabel<Faction>(
            window.Main.asset('Factions'),
            this.build,
        ));
    }
}

export type { Factions };
export {
    Faction,
    Reputation,
    reputationByScore,
    reputationByScoreNullable,
    nextScore,
    initialHatedScore,
    threshholds,
};
