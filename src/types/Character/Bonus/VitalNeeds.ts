interface VitalNeedsBuilder {
    breathe?: boolean;
    eat?: boolean;
    sleep?: boolean;
}
export default class VitalNeeds {
    #breathe: boolean;
    #eat: boolean;
    #sleep: boolean;

    constructor({
        breathe = true,
        eat = true,
        sleep = true,
    }: VitalNeedsBuilder) {
        this.#breathe = breathe;
        this.#eat = eat;
        this.#sleep = sleep;
    }

    get breathe(): boolean {
        return this.#breathe;
    }

    get eat(): boolean {
        return this.#eat;
    }

    get sleep(): boolean {
        return this.#sleep;
    }

    static get defaults(): VitalNeeds {
        return new VitalNeeds({});
    }

    static combine(...args: VitalNeeds[]): VitalNeeds {
        return new VitalNeeds({
            breathe: args.every(a => a.#breathe),
            eat: args.every(a => a.#eat),
            sleep: args.every(a => a.#sleep),
        });
    }

    static build(raw: any = {}): VitalNeeds {
        return new VitalNeeds(
            Object.assign(
                {
                    breathe: true,
                    eat: true,
                    sleep: true,
                },
                raw,
            ),
        );
    }
}
