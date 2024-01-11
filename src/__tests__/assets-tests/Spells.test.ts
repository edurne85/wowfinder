import { Spell } from '../../types/Magic';
import { globalSetup } from '../process-mocks-setup';

describe('Validate spell assets', () => {
    globalSetup();

    const spells = Spell.load();
    Object.keys(spells).forEach(key => {
        it(`Spell ${key} should be valid`, () => {
            expect(spells[key].validate()).toBe(true);
        });
    });
});
