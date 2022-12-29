import { TFunction } from 'i18next';
import { Length } from '../../Units';

type SpellSelf = {
    spellAreaType: 'self';
};

type SpellPoint = {
    spellAreaType: 'point';
};

type SpellCone = {
    spellAreaType: 'cone';
    radius: Length;
};

type SpellCube = {
    spellAreaType: 'cube';
    size: Length;
};

type SpellLine = {
    spellAreaType: 'line';
    length: Length;
};

type SpellSphere = {
    spellAreaType: 'sphere';
    radius: Length;
    selfCentered: boolean;
};

type SpellArea = SpellSelf | SpellPoint | SpellCone | SpellCube | SpellLine | SpellSphere;

function stringify(value: SpellArea, t: TFunction<'translation'>): string {
    switch (value.spellAreaType) {
        case 'self':
            return t('magic.area.self');
        case 'point':
            return t('magic.area.point');
        case 'cone':
            return t('magic.area.cone', { radius: value.radius });
        case 'cube':
            return t('magic.area.cube', { size: value.size });
        case 'line':
            return t('magic.area.line', { length: value.length });
        case 'sphere': {
            const suffix = value.selfCentered ? 'self' : 'point';
            return t(`magic.area.sphere.${suffix}`, { radius: value.radius });
        }
        default: {
            const unreachable: never = value;
            return unreachable;
        }
    }
}

function tryParseArea(input: string): SpellArea | undefined {
    const matches = /^([a-z]+)(\(.*\))?$/.exec(input.toLowerCase());
    if (!matches) {
        return undefined;
    }
    const [ areaType, param ] = matches;
    const length = Length.tryParseLength(param);
    switch (areaType) {
        case 'self':
            return { spellAreaType: 'self' };
        case 'point':
            return { spellAreaType: 'point' };
        case 'cone':
            return length ? { spellAreaType: 'cone', radius: length } : undefined;
        case 'cube':
            return length ? { spellAreaType: 'cube', size: length } : undefined;
        case 'line':
            return length ? { spellAreaType: 'line', length } : undefined;
        case 'sphere.point':
            return length ? { spellAreaType: 'sphere', radius: length, selfCentered: false } : undefined;
        case 'sphere.self':
            return length ? { spellAreaType: 'sphere', radius: length, selfCentered: true } : undefined;
        default:
            return undefined;
    }
}

const defaultArea = { spellAreaType: 'point' } as const;

function parseArea(input: string, defaultValue: SpellArea = defaultArea): SpellArea {
    return tryParseArea(input) ?? defaultValue;
}

export type {
    SpellArea,
    SpellPoint,
    SpellCone,
    SpellCube,
    SpellLine,
    SpellSphere,
};
export {
    stringify,
    tryParseArea,
    parseArea,
};
