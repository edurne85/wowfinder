import { useParams } from 'react-router-dom';
import { CharacterList, CharacterSheet } from '../components';
import { FullData } from '../FullData';
import { RouteProvider } from './base';

function CharacterSheetWrapper({data}: {data: FullData}): JSX.Element {
    let { char } = useParams<'char'>();
    if (!char) throw new Error('No char param');
    char = char.replace(/^:/, '');
    if (!data.chars[char]) throw new Error(`No char ${char}`);
    return (
        <CharacterSheet
            char={data.chars[char]}
            xp={data.rewards[char]?.XP || 0}
        />
    );
}

const characterRoutes: RouteProvider = data => {
    return [
        {
            path: '/chars',
            element: <CharacterList chars={data.chars} />,
        },
        {
            path: '/chars/:char',
            element: <CharacterSheetWrapper data={data} />,
        },
    ];
};

export { characterRoutes };