import { Character } from '../Character';

interface Transformation {
    apply(base: Character): Character;
}

export type { Transformation };
