import { GlobalContext } from '../helpers/GlobalContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCustomTitle } from '../../Routes';
import { useTranslation } from 'react-i18next';
import { TranslationProvider } from '../../i18n';
import { assertDefined } from '../../utils';

const BreadcrumbsContainer = styled.div`
    display: inline-block;
    margin-left: 1.5em;
    span.title {
        font-weight: bold;
    }
`;

type PathTitleProvider = (
    t: TranslationProvider,
    path: string,
) => string | null;

type PathTitleResolver = (path: string) => string;

interface ChunkLinkProps {
    chunks: string[];
    titleResolver: PathTitleResolver;
    isLast?: boolean;
}

function titlesResolver(
    t: TranslationProvider,
    titlesProvider: PathTitleProvider,
): PathTitleResolver {
    return function title(path: string): string {
        const customTitle = titlesProvider(t, path);
        const lastChunk = path.split(/[/.]/).pop() || '';
        return customTitle || t(`navigation.${lastChunk}`);
    };
}

function SlashChunkLink({
    chunks,
    titleResolver,
    isLast = false,
}: ChunkLinkProps): React.JSX.Element {
    const path = `/${chunks.join('/')}`;
    const title = titleResolver(path);
    return (
        <> » {isLast ? <span>{title}</span> : <Link to={path}>{title}</Link>}</>
    );
}

function Breadcrumbs(): React.JSX.Element {
    const context = useContext(GlobalContext);
    const { t } = useTranslation();
    assertDefined(context.data);
    const titleResolver = titlesResolver(t, getCustomTitle(context.data));
    const path = window.location.hash.replace(/^#\//, '');
    const slashChunks = path
        .split('/')
        .map(s => s.replace(/^:/, ''))
        .filter(s => s);
    const lastSlashIndex = slashChunks.length - 1;
    return (
        <BreadcrumbsContainer>
            <span className="title">{t('navigation.address')}:</span>
            {slashChunks.length ? (
                <Link to="/">{t('navigation.home')}</Link>
            ) : (
                <span>{t('navigation.home')}</span>
            )}
            {slashChunks.map((_chunk, i) => (
                <SlashChunkLink
                    key={i}
                    titleResolver={titleResolver}
                    chunks={slashChunks.slice(0, i + 1)}
                    isLast={i === lastSlashIndex}
                />
            ))}
        </BreadcrumbsContainer>
    );
}

export { Breadcrumbs };
