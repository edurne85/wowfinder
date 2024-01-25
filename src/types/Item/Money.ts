import { ValidationError } from '@model/Validable';

interface MoneyBreakdown {
    _: number;
    c: number;
    s: number;
    g: number;
}

type CoinType = 'c' | 's' | 'g';

const displayCoinTypes: CoinType[] = ['g', 's', 'c'];

const ratio = 100;
const ratios: MoneyBreakdown = {
    _: 0,
    c: ratio ** 0,
    s: ratio ** 1,
    g: ratio ** 2,
};

export default class Money {
    #raw = 0;
    static explode(raw: number): MoneyBreakdown {
        const g = Math.floor(raw / ratios.g);
        raw %= ratios.g;
        const s = Math.floor(raw / ratios.s);
        raw %= ratios.s;
        const c = Math.floor(raw / ratios.c);
        raw %= ratios.c;
        return {
            _: raw,
            c,
            s,
            g,
        };
    }

    static condense({ _ = 0, c = 0, s = 0, g = 0 }: MoneyBreakdown): number {
        return _ + c * ratios.c + s * ratios.s + g * ratios.g;
    }

    private constructor(raw: number) {
        this.#raw = raw;
    }

    static fromRaw(raw: number): Money {
        return new Money(raw);
    }

    static fromBreakdown(breakdown: MoneyBreakdown): Money {
        return new Money(Money.condense(breakdown));
    }

    static fromMoney(money: Money): Money {
        return new Money(money.raw);
    }

    static get zero(): Money {
        return new Money(0);
    }

    add(args: MoneyBreakdown): void {
        this.#raw += Money.condense(args);
    }

    substract(args: MoneyBreakdown): void {
        this.#raw -= Money.condense(args);
    }

    get raw(): number {
        return this.#raw;
    }

    get split(): MoneyBreakdown {
        return Money.explode(this.#raw);
    }

    toString(): string {
        const breakdown = this.split;
        return displayCoinTypes.map(t => `${breakdown[t]}${t}`).join();
    }

    validate(): void {
        if (Number.isNaN(this.#raw)) {
            throw new ValidationError(
                this,
                'Money value must be a real number',
            );
        }
    }
}

function asMoney(value: Money | number): Money {
    return value instanceof Money
        ? value
        : Money.fromRaw((value as number) || 0);
}

export type { CoinType };
export { Money, MoneyBreakdown, displayCoinTypes, asMoney };
