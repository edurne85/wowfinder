type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Quantified<T> = {
    item: T;
    qtty: number;
};

export type { Optional, Quantified };
