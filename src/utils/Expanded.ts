type Expanded<T extends { [key: string]: V }, V> = T & { ''?: V };

export type { Expanded };
