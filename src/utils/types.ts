type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Quantified<T> = {
    item: T;
    qtty: number;
};

type Counter = {
    min: number;
    max: number;
    current: number;
    initial: number;
};

type NonPrivate<T> = Pick<T, Exclude<keyof T, `#${string}`>>;

export type { Optional, Quantified, Counter, NonPrivate };
