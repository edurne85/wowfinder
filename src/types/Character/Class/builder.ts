import { AuraEntry } from './Aura';
import { ClassTier } from './ClassTier';
import { ClassFeatureEntry } from './Features';

type RawFeaturesEntry = ClassFeatureEntry | AuraEntry;

interface ClassBuilder {
    key: string;
    tier?: ClassTier;
    hd: number;
    bab: number;
    fort?: boolean;
    refl?: boolean;
    will?: boolean;
    skl?: number;
    arc?: number;
    div?: number;
    esp?: number;
    wealth?: number;
    features?: RawFeaturesEntry[];
    skills?: string[];
}

const classBuilderDefaults = {
    tier: ClassTier.base,
    fort: false,
    refl: false,
    will: false,
    skl: 0,
    arc: 0,
    div: 0,
    esp: 0,
    wealth: 0,
    features: [],
    skills: [],
} satisfies Partial<ClassBuilder>;

function applyClassDefaults(builder: ClassBuilder): Required<ClassBuilder> {
    return { ...classBuilderDefaults, ...builder };
}

function preBuild(raw: any): Required<ClassBuilder> {
    // TODO validate input
    return applyClassDefaults(raw as ClassBuilder);
}

export { applyClassDefaults, preBuild };
export type { ClassBuilder };
