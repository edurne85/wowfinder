import { Character } from '../../types/Character';
import { ClassBonuses } from '../../types/Character/Class';

type CharProps = {
    char: Character;
};

type CharXpProps = {
    char?: Character;
    xp?: number;
};

type BonusOnlyProps = {
    bonuses?: ClassBonuses;
};

type HitPointProps = Partial<CharProps> & { current?: number };

export { CharProps, CharXpProps, BonusOnlyProps, HitPointProps };
