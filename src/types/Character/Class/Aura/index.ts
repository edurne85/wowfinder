import { Aura, AuraBonus } from './base';

type AuraEntry = {
    level: number;
    aura: Aura;
};

export { auraBonuses } from './bonuses';
export type { AuraBonus, AuraEntry };
export { Aura };
