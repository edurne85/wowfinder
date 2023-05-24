import { ReactElement, useState } from 'react';

import { Character } from '../../types/Character';
import { MainPage } from './MainPage';
import { SkillsPage } from './SkillsPage';
import { InventoryPage } from './InventoryPage';
import { MagicPage } from './MagicPage';
import { FeralForms } from './Shapeshift';

interface TypedPageBaseArgs {
    char?: Character;
    xp: number;
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

const pageTypes: { [keys in PageType]: React.FC<PageArgs> } = {
    [PageType.main]: MainPage,
    [PageType.skills]: SkillsPage,
    /* TODO #449 (epic) (WIP) */ [PageType.inventory]: InventoryPage,
    /* TODO #450 (epic) (WIP) */ [PageType.magic]: MagicPage,
    /* TODO #451 (epic) */ [PageType.spells]: () => <></>,
    [PageType.feral]: FeralForms,
    /* TODO #357 */ [PageType.travel]: () => <></>,
    /* TODO #452 (epic) */ [PageType.moonkin]: () => <></>,
    /* TODO #453 (epic) */ [PageType.tree]: () => <></>,
};

type TypedPageArgs = TypedPageBaseArgs & { type: PageType };

type PartialPageSelection = { [keys in PageType]?: boolean };

type FullPageSelection = { [keys in PageType]: boolean };

const defaultPages: FullPageSelection = {
    [PageType.main]: true,
    [PageType.skills]: true,
    [PageType.inventory]: true,
    [PageType.magic]: true,
    [PageType.spells]: false,
    [PageType.feral]: true,
    [PageType.travel]: false,
    [PageType.moonkin]: false,
    [PageType.tree]: false,
};

function TypedPage({ type, char, xp }: TypedPageArgs): ReactElement {
    const [selectedPages] = useState<PartialPageSelection>(defaultPages);
    return pageTypes[type]({
        char,
        xp,
        visible: !!selectedPages[type],
    }) as ReactElement;
}

export type { FullPageSelection, TypedPageArgs };

export { TypedPage, PageType };
