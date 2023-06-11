interface SensesBuilder {
    darkVision?: number;
    lowLightVision?: boolean;
    smell?: boolean;
}

export default class Senses {
    #darkVision: number;
    #lowLightVision: boolean;
    #smell: boolean;

    constructor({
        darkVision = 0,
        lowLightVision = false,
        smell = false,
    }: SensesBuilder) {
        this.#darkVision = darkVision;
        this.#lowLightVision = lowLightVision;
        this.#smell = smell;
    }

    get darkVision(): number {
        return this.#darkVision;
    }

    get lowLightVision(): boolean {
        return this.#lowLightVision;
    }

    get smell(): boolean {
        return this.#smell;
    }

    static get defaults(): Senses {
        return new Senses({});
    }

    static combine(...args: Senses[]): Senses {
        return new Senses({
            darkVision: args.reduce(
                (prev, curr): number => Math.max(prev, curr.#darkVision),
                0,
            ),
            lowLightVision: args.some(s => s.#lowLightVision),
            smell: args.some(s => s.#smell),
        });
    }

    static build(raw: any = {}): Senses {
        return new Senses(
            Object.assign(
                {
                    darkVision: 0,
                    lowLightVision: false,
                    smell: false,
                },
                raw,
            ),
        );
    }
}
