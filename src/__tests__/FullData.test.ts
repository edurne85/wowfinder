import { FullData } from '@model/FullData';
import { globalSetup } from './process-mocks-setup';

describe('Validate assets', () => {
    globalSetup();
    it('Should load assets', () => {
        expect(() => FullData.load(true)).not.toThrow();
    });
});
