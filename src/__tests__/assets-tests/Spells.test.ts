import { Spell } from '../../types/Magic';
import { globalSetup } from '../process-mocks-setup';

describe('Validate spell assets', () => {
    globalSetup();
    it('Should load spells', () => {
        expect(() => Spell.load(undefined, true)).not.toThrow();
    });
});
