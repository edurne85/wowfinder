import { Navigate, useParams } from 'react-router-dom';
import { Spell } from '../components/Spells';
import { FullData } from '../types/FullData';
import { RouteProvider, TitlesProvider } from './base';
import { SpellListsView } from '../components/Spells/SpellListsView';
import { SpellListView } from '../components/Spells/SpellListView';

function SpellWrapper({ data }: { data: FullData }): React.JSX.Element {
    let { spell } = useParams<'spell'>();
    if (!spell) throw new Error('No spell param');
    spell = spell.replace(/^:/, '');
    if (!data.spells[spell]) throw new Error(`No spell ${spell}`);
    return <Spell spell={data.spells[spell]} />;
}

function SpellListsWrapper({ data }: { data: FullData }): React.JSX.Element {
    return <SpellListsView lists={Object.values(data.spellLists)} />;
}

function SpellListWrapper({ data }: { data: FullData }): React.JSX.Element {
    let { list } = useParams<'list'>();
    if (!list) throw new Error('No list param');
    list = list.replace(/^:/, '');
    if (!data.spellLists[list]) throw new Error(`No list ${list}`);
    return <SpellListView list={data.spellLists[list]} />;
}

const spellRoutes: RouteProvider = data => {
    return [
        {
            path: '/spells',
            element: <SpellListsWrapper data={data} />,
        },
        {
            path: '/spells/:list',
            element: <SpellListWrapper data={data} />,
        },
        {
            path: '/spell/:spell',
            element: <SpellWrapper data={data} />,
        },
        {
            path: '/spell',
            element: <Navigate to="/spells" />,
        },
    ];
};

const spellsTitles: TitlesProvider = t => [
    {
        match: /^\/spells\/:?(.*)/,
        title: (fragments: RegExpMatchArray | null): string | null => {
            return fragments
                ? t(`spells.lists.${fragments[1]}`) || fragments[1]
                : null;
        },
    },
    {
        match: /^\/spell\/:?(.*)/,
        title: (fragments: RegExpMatchArray | null): string | null => {
            return fragments ? t(`spells.${fragments[1]}.name`) : null;
        },
    },
];

export { spellRoutes, spellsTitles };
