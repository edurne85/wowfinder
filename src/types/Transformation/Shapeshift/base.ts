import { Character } from '../../Character';
import { Bonus } from '../../Character/Bonus';
import { Transformation } from '../base';

abstract class Shapeshift implements Transformation {
    abstract compute(base: Character, rank?: number): Bonus;
    abstract apply(base: Character): Character;
}

export { Shapeshift };
