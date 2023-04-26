import { useParams } from 'react-router-dom';
import { Spell } from '../components/Spells';
import { FullData } from '../types/FullData';
import { RouteProvider, WiP } from './base';

function SpellWrapper({ data }: { data: FullData }): JSX.Element {
    let { spell } = useParams<'spell'>();
    if (!spell) throw new Error('No spell param');
    spell = spell.replace(/^:/, '');
    if (!data.spells[spell]) throw new Error(`No spell ${spell}`);
    return <Spell spell={data.spells[spell]} />;
}

const spellRoutes: RouteProvider = data => {
    return [
        {
            path: '/spells',
            element: <WiP />,
        },
        {
            path: '/spells/:spell',
            element: <SpellWrapper data={data} />,
        },
    ];
};

export { spellRoutes };
