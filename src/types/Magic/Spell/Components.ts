import { buildItem, Item } from '../../Item';

enum SpellCoreComponent {
    V = 'V',
    S = 'S',
    M = 'M',
}

type SpellComponent = SpellCoreComponent | Item;

function parseSpellComponent(component: string): SpellComponent {
    if (component in SpellCoreComponent) {
        return component as SpellCoreComponent;
    }
    return buildItem(component);
}

export type { SpellComponent };
export { SpellCoreComponent, parseSpellComponent };
