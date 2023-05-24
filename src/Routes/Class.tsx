import { RouteProvider, TitlesProvider } from './base';
import { Link, useParams } from 'react-router-dom';
import { Class } from '../types/Character/Class';
import { useTranslation } from 'react-i18next';
import { FullData } from '../types/FullData';
import { ClassView } from '../components/Class/ClassView';

function ClassViewWrapper({ data }: { data: FullData }): React.JSX.Element {
    let { class: cls } = useParams<'class'>();
    if (!cls) {
        throw new Error('No class param');
    }
    cls = cls.replace(/^:/, '');
    if (!data.classes[cls]) {
        throw new Error(`No class ${cls}`);
    }
    return <ClassView cls={data.classes[cls]} />;
}
interface ClassListProps {
    classes: { [key: string]: Class };
}

function ClassList({ classes }: ClassListProps): React.JSX.Element {
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
            element: <ClassViewWrapper data={data} />,
        },
    ];
};

const classNames: TitlesProvider = t => [
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
