import * as utils from '../';

describe('utils/index.ts', () => {
    it('should export all utils', () => {
        expect(utils).toHaveProperty('capitalizeFirstLetter');
        expect(utils).toHaveProperty('fThousands');
        expect(utils).toHaveProperty('parseIfNeeded');
        expect(utils).toHaveProperty('sum');
        expect(utils).toHaveProperty('toRoman');
        expect(utils).toHaveProperty('assertDefined');
        expect(utils).toHaveProperty('assertNonNull');
        expect(utils).toHaveProperty('jClone');
    });
});
