import { AlignmentDescriptor } from '../../Character/Alignment';
import { EnergyType } from '../../Damage';

enum ElementalDescriptor {
    air = 'air',
    earth = 'earth',
    fire = 'fire',
    water = 'water',
}

enum BaseDescriptor {}
// TODO #428: Add the rest of the descriptors

const SpellDescriptor = {
    ...AlignmentDescriptor,
    ...BaseDescriptor,
    ...ElementalDescriptor,
    ...EnergyType,
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

export { SpellDescriptor, tryParseSpellDescriptor, parseValidSpellDescriptors };
