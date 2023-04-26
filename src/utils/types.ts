type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type ReactChildren = React.ReactNode | Iterable<React.ReactNode>;

export type { Optional, ReactChildren };
