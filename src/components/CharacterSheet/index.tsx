import { useContext } from 'react';
import { Character } from '../../types/Character';
import { ClassFeature } from '../../types/Character/Class';
import { GlobalContext } from '../helpers/GlobalContext';
import type { FullPageSelection, TypedPageArgs } from './TypedPage';
import { PageType, TypedPage } from './TypedPage';

function ConditionalTypedPage({
    type,
    char,
    xp,
    availables,
}: TypedPageArgs & { availables: FullPageSelection }): JSX.Element {
    return availables[type] ? <TypedPage {...{ type, char, xp }} /> : <></>;
}

function hasSpells(char?: Character): boolean {
    return (
        char != null &&
        (char.classBonuses.efl.arc > 0 ||
            char.classBonuses.efl.div > 0 ||
            char.classBonuses.efl.esp > 0)
    );
}

function hasAnyFeatures(
    char?: Character,
    ...features: ClassFeature[]
): boolean {
    return char != null && features.some(f => char.classFeatures.includes(f));
}

const druidFeralForms = [ClassFeature.bearForm, ClassFeature.catForm];
function hasDruidFeralForms(char?: Character): boolean {
    return hasAnyFeatures(char, ...druidFeralForms);
}

const druidTravelForms = [
    ClassFeature.cheetahForm,
    ClassFeature.dolphinForm,
    ClassFeature.crowForm,
    ClassFeature.greatStagForm,
    ClassFeature.eagleForm,
];
function hasDruidTravelForms(char?: Character): boolean {
    return hasAnyFeatures(char, ...druidTravelForms);
}

function hasDruidMoonkinForm(char?: Character): boolean {
    return hasAnyFeatures(char, ClassFeature.moonkinForm);
}

function hasDruidTreeForm(char?: Character): boolean {
    return hasAnyFeatures(char, ClassFeature.treeLifeForm);
}

export function CharacterSheet({
    char,
    xp = 0,
}: {
    char?: Character;
    xp?: number;
}): JSX.Element {
    const forcePages = useContext(GlobalContext).forcePages;
    const availables: FullPageSelection = {
        [PageType.main]: true,
        [PageType.skills]: true,
        [PageType.inventory]: true,
        [PageType.magic]: forcePages.magic || hasSpells(char),
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
    return (
        <>
            <ConditionalTypedPage type={PageType.main} {...args} />
            <ConditionalTypedPage type={PageType.skills} {...args} />
            <ConditionalTypedPage type={PageType.inventory} {...args} />
            <ConditionalTypedPage type={PageType.magic} {...args} />
        </>
    );
}
