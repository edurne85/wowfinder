import { validateEnumValue } from '@model/Assets';
import { ValidationError } from '@model/Validable';

enum School {
    abj = 'abj',
    con = 'con',
    div = 'div',
    enc = 'enc',
    evo = 'evo',
    ill = 'ill',
    nec = 'nec',
    tra = 'tra',
    uni = 'uni',
}

enum SubSchool {
    void = 'void',
    banish = 'banish',
    counter = 'counter',
    call = 'call',
    celestial = 'celestial',
    create = 'create',
    heal = 'heal',
    summon = 'summon',
    teleport = 'teleport',
    scry = 'scry',
    charm = 'charm',
    compel = 'compel',
    figment = 'figment',
    glamer = 'glamer',
    phantom = 'phantom',
    shadow = 'shadow',
    enhancement = 'enhancement',
    polymorph = 'polymorph',
}

const subSchoolParents: { [key in SubSchool]: School } = {
    void: School.uni,
    banish: School.abj,
    counter: School.enc,
    call: School.con,
    celestial: School.con,
    create: School.con,
    heal: School.con,
    summon: School.con,
    teleport: School.con,
    scry: School.div,
    charm: School.enc,
    compel: School.enc,
    figment: School.ill,
    glamer: School.ill,
    phantom: School.ill,
    shadow: School.ill,
    enhancement: School.tra,
    polymorph: School.tra,
};

function subSchoolsByParent(parent: School): SubSchool[] {
    return Object.keys(SubSchool)
        .map(k => k as SubSchool)
        .filter(sub => subSchoolParents[sub] === parent)
        .map(sub => SubSchool[sub]);
}

type SchoolValues<T> = {
    [key in School]: T;
};
type SchoolValuesPartial<T> = {
    [key in School]?: T;
};
function fillSchoolValues<T>(
    values: SchoolValuesPartial<T>,
    defaultValue: T,
): SchoolValues<T> {
    const full: SchoolValuesPartial<T> = {};
    const givenKeys = Object.keys(values);
    for (const k of Object.keys(School)) {
        const s = k as School;
        full[s] = givenKeys.includes(k) ? values[s] : defaultValue;
    }
    return full as SchoolValues<T>;
}

type SubSchoolValues<T> = {
    [key in SubSchool]: T;
};
type SubSchoolValuesPartial<T> = {
    [key in SubSchool]?: T;
};
function fillSubSchoolValues<T>(
    values: SubSchoolValuesPartial<T>,
    defaultValue: T,
): SubSchoolValues<T> {
    const full: SubSchoolValuesPartial<T> = {};
    const givenKeys = Object.keys(values);
    for (const k of Object.keys(SubSchool)) {
        const s = k as SubSchool;
        full[s] = givenKeys.includes(k) ? values[s] : defaultValue;
    }
    return full as SubSchoolValues<T>;
}

const breakdownSubSchoolsByParent: SchoolValuesPartial<SubSchool[]> = {};
for (const s of Object.keys(School)) {
    const school = s as School;
    breakdownSubSchoolsByParent[school] = subSchoolsByParent(school);
}

const allSubSchoolsByParent = fillSchoolValues<SubSchool[]>(
    breakdownSubSchoolsByParent,
    [],
);

function tryParseSchool(input: string): School | SubSchool | undefined {
    input = input.toLowerCase();
    const schoolEnum = School[input as keyof typeof School];
    if (schoolEnum) {
        return schoolEnum;
    }
    const subSchoolEnum = SubSchool[input as keyof typeof SubSchool];
    if (subSchoolEnum) {
        return subSchoolEnum;
    }
    return undefined;
}

type SchoolParseResult = { school: School; subSchool?: SubSchool } | undefined;

function fullParseSchool(input: string): SchoolParseResult {
    const school = tryParseSchool(input);
    if (!school) {
        return undefined;
    }
    if (school in School) {
        return { school: school as School };
    }
    const subSchool = school as SubSchool;
    return { school: subSchoolParents[subSchool], subSchool };
}

function validateSchool(school: unknown, subSchool: unknown): void {
    validateEnumValue(school, School);
    if (subSchool) {
        validateEnumValue(subSchool, SubSchool);
        if (subSchoolParents[subSchool as SubSchool] !== school) {
            throw new ValidationError(
                subSchool,
                `Invalid sub-school ${subSchool} for school ${school}`,
            );
        }
    }
}

export type {
    SchoolValues,
    SchoolValuesPartial,
    SubSchoolValues,
    SubSchoolValuesPartial,
};
export {
    School,
    SubSchool,
    subSchoolParents,
    subSchoolsByParent,
    fillSchoolValues,
    fillSubSchoolValues,
    allSubSchoolsByParent,
    tryParseSchool,
    fullParseSchool,
    validateSchool,
};
