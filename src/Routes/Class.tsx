import { RouteProvider, TitlesProvider, WiP } from './base';
import { Link } from 'react-router-dom';
import { Class } from '../@types/Character/Class';
import { useTranslation } from 'react-i18next';

interface ClassListProps {
    classes: { [key: string]: Class };
}

function ClassList({ classes }: ClassListProps): JSX.Element {
    const classKeys = Object.keys(classes).sort();
    const { t } = useTranslation();
    return (
        <div>
            {classKeys.map(key => (
                <p key={key}>
                    <Link to={`/classes/:${key}`}>{t(`classes.${key}`)}</Link>
                </p>
            ))}
        </div>
    );
}

const classRoutes: RouteProvider = data => {
    return [
        {
            path: '/classes',
            element: <ClassList classes={data.classes} />,
        },
        {
            path: '/classes/:class',
            element: <WiP />,
        },
    ];
};

const classNames: TitlesProvider = (t) => [
    {
        match: /^\/classes\/:?(.*)/,
        title: (fragments: RegExpMatchArray | null): string | null => {
            return fragments?.length
                ? t(`classes.${fragments[1]}`) || fragments[1]
                : null;
        },
    },
];

export { classRoutes, classNames };
