import { Feat } from '../../Feat';
import { FeatFlag } from '../../FeatFlag';
import { FeatSpec } from '../../FeatSpec';
import { allOf, feat, req, Reqs } from '../helpers';

const build = {
    magic: (key: Feat, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.magic]),
    item: (key: Feat, clevel: number): FeatSpec =>
        feat(key, req.level.caster(clevel), [
            FeatFlag.magic,
            FeatFlag.itemCreation,
        ]),
    focus: (key: Feat, prev?: Feat): FeatSpec =>
        feat(key, prev ? allOf(...req.feats(prev)) : prev, [
            FeatFlag.magic,
            FeatFlag.spellFocus,
        ]),
    meta: (key: Feat): FeatSpec =>
        feat(key, req.none, [
            FeatFlag.magic,
            FeatFlag.metaMagic,
            FeatFlag.multiple,
        ]),
    metaSingle: (key: Feat): FeatSpec =>
        feat(key, req.none, [FeatFlag.magic, FeatFlag.metaMagic]),
};

export { build };
