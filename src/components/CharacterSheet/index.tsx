import Character from '../../@types/Character';
import { ClassFeature } from '../../@types/Character/Class';
import type { FullPageSelection, TypedPageArgs } from './TypedPage';
import { PageType, TypedPage } from './TypedPage';

function ConditionalTypedPage({
    type,
    char,
    xp,
    availables,
}: TypedPageArgs & {availables: FullPageSelection} ): JSX.Element {
    return availables[type] ? <TypedPage {...{type, char, xp}} /> : <></>;
}

function hasSpells(char: Character): boolean {
    return char.classBonuses.efl.arc > 0
        || char.classBonuses.efl.div > 0
        || char.classBonuses.efl.esp > 0;
}

function hasAnyFeatures(char: Character, ...features: ClassFeature[]): boolean {
    return features.some(f => char.classFeatures.includes(f));
}

const druidFeralForms = [ClassFeature.bearForm, ClassFeature.catForm];
function hasDruidFeralForms(char: Character): boolean {
    return hasAnyFeatures(char, ...druidFeralForms);
}

const druidTravelForms = [
    ClassFeature.cheetahForm,
    ClassFeature.dolphinForm,
    ClassFeature.crowForm,
    ClassFeature.greatStagForm,
    ClassFeature.eagleForm,
];
function hasDruidTravelForms(char: Character): boolean {
    return hasAnyFeatures(char, ...druidTravelForms);
}

function hasDruidMoonkinForm(char: Character): boolean {
    return hasAnyFeatures(char, ClassFeature.moonkinForm);
}

function hasDruidTreeForm(char: Character): boolean {
    return hasAnyFeatures(char, ClassFeature.treeLifeForm);
}

export function CharacterSheet({char, xp = 0}: {char: Character, xp: number}): JSX.Element {
    const availables: FullPageSelection = {
        [PageType.main]: true,
        [PageType.skills]: true,
        [PageType.gear]: false,
        [PageType.spells]: false && hasSpells(char),
        [PageType.feral]: false && hasDruidFeralForms(char),
        [PageType.moonkin]: false && hasDruidMoonkinForm(char),
        [PageType.tree]: false && hasDruidTreeForm(char),
        [PageType.travel]: false && hasDruidTravelForms(char),
    };
    const args = {
        char,
        xp,
        availables,
    };
    return (<>
        <ConditionalTypedPage type={PageType.main} {...args} />
        <ConditionalTypedPage type={PageType.skills} {...args} />
        { /* TODO: Gear page(s) */}
    </>);
}