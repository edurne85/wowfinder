import { useParams } from 'react-router-dom';
import { CharacterList, CharacterSheet } from '../components';
import { FullData } from '../types/FullData';
import { RouteProvider, TitlesProvider } from './base';

function CharacterSheetWrapper({
    data,
}: {
    data: FullData;
}): React.JSX.Element {
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
            title: (path: string) => {
                const char = path.replace(/^\/chars\/:/, '');
                return data.chars[char]?.fullName || char;
            },
        },
    ];
};

const characterNames: TitlesProvider = (_, data) => [
    {
        match: /^\/chars\/:?(.*)/,
        title: (fragments: RegExpMatchArray | null): string | null => {
            return fragments
                ? data.chars[fragments[1]]?.fullName || fragments[1]
                : null;
        },
    },
];

export { characterRoutes, characterNames };
