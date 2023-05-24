import { parseIfNeeded } from '../../../utils';
import { parseArea, SpellArea } from './Area';
import { CastingTime } from './CastingTime';
import { parseSpellComponent, SpellComponent } from './Components';
import { parseValidSpellDescriptors, SpellDescriptor } from './Descriptor';
import { SpellDuration, tryParseSpellDuration } from './Duration';
import { parseValidFlags, SpellFlag } from './Flags';
import { SpellRange } from './Range';

interface SpellBaseBuilder {
    descriptors?: (SpellDescriptor | string)[];
    castingTime?: CastingTime | string;
    components?: (SpellComponent | string)[];
    range?: SpellRange | string;
    area?: SpellArea | string;
    // effect: ???;
    // targets: SpellTarget[];
    duration?: SpellDuration | string;
    // savingThrow?: Save || false;
    flags?: (SpellFlag | string)[];
}

abstract class SpellBase implements SpellBaseBuilder {
    #descriptors: Set<SpellDescriptor>;
    #castingTime?: CastingTime;
    #components: SpellComponent[];
    #range?: SpellRange;
    #area?: SpellArea;
    // #effect, #targets
    #duration?: SpellDuration;
    // #savingThrow
    #flags: Set<SpellFlag>;
    constructor({
        descriptors = [],
        castingTime,
        components = [],
        range,
        area,
        duration,
        flags = [],
    }: SpellBaseBuilder) {
        this.#descriptors = new Set(parseValidSpellDescriptors(descriptors));
        this.#castingTime = parseIfNeeded(castingTime, CastingTime.tryParse);
        this.#components = components.map(c =>
            parseIfNeeded(c, parseSpellComponent),
        );
        this.#range = parseIfNeeded(range, SpellRange.tryParse);
        this.#area = parseIfNeeded(area, parseArea);
        // #effect, #targets
        this.#duration = parseIfNeeded(duration, tryParseSpellDuration);
        // #duration, #savingThrow
        this.#flags = new Set(parseValidFlags(flags));
    }

    get descriptors(): SpellDescriptor[] {
        return [...this.#descriptors];
    }

    get castingTime(): CastingTime | undefined {
        return this.#castingTime;
    }

    get components(): SpellComponent[] {
        return [...this.#components];
    }

    get range(): SpellRange | undefined {
        return this.#range;
    }

    get area(): SpellArea | undefined {
        return this.#area;
    }

    // effect, targets, duration

    get duration(): SpellDuration | undefined {
        return this.#duration;
    }

    get flags(): SpellFlag[] {
        return [...this.#flags];
    }
}

export { SpellBaseBuilder, SpellBase };
