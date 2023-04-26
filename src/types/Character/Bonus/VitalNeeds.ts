interface VitalNeedsBuilder {
    breathe?: boolean;
    eat?: boolean;
    sleep?: boolean;
}
export default class VitalNeeds {
    private _breathe: boolean;
    private _eat: boolean;
    private _sleep: boolean;

    constructor({
        breathe = true,
        eat = true,
        sleep = true,
    }: VitalNeedsBuilder) {
        this._breathe = breathe;
        this._eat = eat;
        this._sleep = sleep;
    }

    get breathe(): boolean {
        return this._breathe;
    }

    get eat(): boolean {
        return this._eat;
    }

    get sleep(): boolean {
        return this._sleep;
    }

    static get defaults(): VitalNeeds {
        return new VitalNeeds({});
    }

    static combine(...args: VitalNeeds[]): VitalNeeds {
        return new VitalNeeds({
            breathe: args.every(a => a._breathe),
            eat: args.every(a => a._eat),
            sleep: args.every(a => a._sleep),
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
