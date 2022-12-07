import { ReactElement , useState } from 'react';

import { Character } from '../../@types/Character';
import { MainPage } from './MainPage';
import { SkillsPage } from './SkillsPage';
import { InventoryPage } from './InventoryPage';
import { MagicPage } from './MagicPage';

interface TypedPageBaseArgs {
    char?: Character,
    xp: number,
}

type PageArgs = TypedPageBaseArgs & { visible: boolean };

enum PageType {
    main = 'Main',
    skills = 'Skills',
    inventory = 'Inventory',
    magic = 'Magic',
    spells = 'Spells',
    feral = 'FeralForms',
    travel = 'TravelForms',
    moonkin = 'MoonkinForm',
    tree = 'TreeForm',
}

const pageTypes: {[keys in PageType]: React.FC<PageArgs>} = {
    [PageType.main]: MainPage,
    [PageType.skills]: SkillsPage,
    /* TODO / WIP */ [PageType.inventory]: InventoryPage,
    /* TODO / WIP */ [PageType.magic]: MagicPage,
    /* TODO */ [PageType.spells]: () => <></>,
    /* TODO */ [PageType.feral]: () => <></>,
    /* TODO */ [PageType.travel]: () => <></>,
    /* TODO */ [PageType.moonkin]: () => <></>,
    /* TODO */ [PageType.tree]: () => <></>,
};

type TypedPageArgs = TypedPageBaseArgs & { type: PageType };

type PartialPageSelection = {[keys in PageType]?: boolean}; 

type FullPageSelection = {[keys in PageType]: boolean}; 

const defaultPages: FullPageSelection = {
    [PageType.main]: true,
    [PageType.skills]: true,
    [PageType.inventory]: true,
    [PageType.magic]: true,
    [PageType.spells]: false,
    [PageType.feral]: false,
    [PageType.travel]: false,
    [PageType.moonkin]: false,
    [PageType.tree]: false,
};

function TypedPage({type, char, xp}: TypedPageArgs): ReactElement {
    const [ selectedPages ] = useState<PartialPageSelection>(defaultPages);
    return pageTypes[type]({char, xp, visible: !!selectedPages[type]}) as ReactElement;
}

export type {
    FullPageSelection,
    TypedPageArgs,
};

export {
    TypedPage,
    PageType,
};