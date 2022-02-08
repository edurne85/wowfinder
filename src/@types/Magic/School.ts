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
    heal = 'heal',
}

const subSchoolParents: { [key in SubSchool]: School } = {
    void: School.uni,
    heal: School.con,
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
    defaultValue: T
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
    defaultValue: T
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

const allSubSchoolsByParent = fillSchoolValues<SubSchool[]>(breakdownSubSchoolsByParent, []);

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
};
