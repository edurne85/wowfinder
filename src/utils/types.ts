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

interface Keyed<T = string> {
    key: T;
}

type Labeled<T extends object = object> = T & {
    label: string;
};

type NonPrivate<T> = Pick<T, Exclude<keyof T, `#${string}`>>;

export type { Counter, Keyed, Labeled, NonPrivate, Optional, Quantified };
