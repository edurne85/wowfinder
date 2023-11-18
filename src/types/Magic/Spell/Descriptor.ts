import { AlignmentDescriptor } from '../../Character/Alignment';
import { EnergyType } from '../../Damage';
import { Stringifier } from '@utils/strings';

enum ElementalDescriptor {
    air = 'air',
    earth = 'earth',
    fire = 'fire',
    water = 'water',
}

enum CelestialDescriptor {
    lunar = 'lunar',
    solar = 'solar',
    astral = 'astral',
}

enum BaseDescriptor {
    curse = 'curse',
    death = 'death',
    disease = 'disease',
    emotion = 'emotion',
    fear = 'fear',
    language = 'language',
    mind = 'mind',
    pain = 'pain',
    poison = 'poison', // Nature damage subtype?
}
// TODO #428: Add the rest of the descriptors

const SpellDescriptor = {
    ...AlignmentDescriptor,
    ...BaseDescriptor,
    ...ElementalDescriptor,
    ...CelestialDescriptor,
    ...EnergyType,
    // Pending energy subtypes:
    // acid (nature)
    // electricity (nature)
    // force (arcane)
    // sonic (bludgeoning)
    // ...review as needed
};

type SpellDescriptor = keyof typeof SpellDescriptor;

function tryParseSpellDescriptor(input: string): SpellDescriptor | undefined {
    return SpellDescriptor[input as keyof typeof SpellDescriptor];
}

function parseValidSpellDescriptors(inputs: string[]): SpellDescriptor[] {
    return inputs
        .map(tryParseSpellDescriptor)
        .filter(Boolean) as SpellDescriptor[];
}

const stringify: Stringifier<SpellDescriptor> = (value, t) => {
    if (AlignmentDescriptor[value as AlignmentDescriptor]) {
        return t(`alignment.${value}`);
    }
    if (EnergyType[value as EnergyType]) {
        return t(`damageTypes.full.${value}`);
    }
    return t(`magic.descriptor.${value}`);
};

export {
    SpellDescriptor,
    stringify,
    tryParseSpellDescriptor,
    parseValidSpellDescriptors,
};
