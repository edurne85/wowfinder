interface SensesBuilder {
    darkVision?: number;
    lowLightVision?: boolean;
    smell?: boolean;
}

export default class Senses {
    private _darkVision: number;
    private _lowLightVision: boolean;
    private _smell: boolean;

    constructor({
        darkVision = 0,
        lowLightVision = false,
        smell = false,
    }: SensesBuilder) {
        this._darkVision = darkVision;
        this._lowLightVision = lowLightVision;
        this._smell = smell;
    }

    get darkVision(): number { return this._darkVision; }

    get lowLightVision(): boolean { return this._lowLightVision; }

    get smell(): boolean { return this._smell; }

    static get defaults(): Senses { return new Senses({}); }

    static combine(...args: Senses[]): Senses {
        return new Senses({
            darkVision: args.reduce((prev, curr): number => Math.max(prev, curr._darkVision), 0),
            lowLightVision: args.some(s => s._lowLightVision),
            smell: args.some(s => s._smell),
        });
    }

    static build(raw: any = {}): Senses {
        return new Senses(Object.assign({
            darkVision: 0,
            lowLightVision: false,
            smell: false,
        }, raw));
    }
}