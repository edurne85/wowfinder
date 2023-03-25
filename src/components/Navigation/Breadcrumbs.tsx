import { GlobalContext } from '../helpers/GlobalContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCustomTitle } from '../../Routes';
import { useTranslation } from 'react-i18next';
import { TranslationProvider } from '../../i18n';

const BreadcrumbsContainer = styled.div`
    display: inline-block;
    & > a,
    & > span {
        margin: 0 0.5rem;
    }
`;

type PathTitleProvider = (t: TranslationProvider, path: string) => string | null;

type PathTitleResolver = (path: string) => string;

interface ChunkLinkProps {
    chunks: string[];
    titleResolver: PathTitleResolver;
    isLast?: boolean;
}

function titlesResolver(t: TranslationProvider, titlesProvider: PathTitleProvider): PathTitleResolver {
    return function title(
        path: string
    ): string {
        const customTitle = titlesProvider(t, path);
        const lastChunk = path.split(/[/.]/).pop() || '';
        return customTitle || t(`navigation.${lastChunk}`);
    };
}

function SlashChunkLink({
    chunks,
    titleResolver,
    isLast = false,
}: ChunkLinkProps): JSX.Element {
    const path = `/${chunks.join('/')}`;
    const title = titleResolver(path);
    return <>/{isLast ? <span>{title}</span> : <Link to={path}>{title}</Link>}</>;
}

// TODO / WiP: suport i18n
function Breadcrumbs(): JSX.Element {
    const context = useContext(GlobalContext);
    const { t } = useTranslation();
    const titleResolver = titlesResolver(t, getCustomTitle(context.data));
    const path = window.location.hash.replace(/^#\//, '');
    const slashChunks = path
        .split('/')
        .map(s => s.replace(/^:/, ''))
        .filter(s => s);
    const lastSlashIndex = slashChunks.length - 1;
    /* const lastSlashChunk = slashChunks.length
        ? slashChunks[lastSlashIndex]
        : '';
    // const dotChunks = lastSlashChunk.split('.'); */ // TODO
    return (
        <BreadcrumbsContainer>
            <Link to="/">{t('navigation.home')}</Link>
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
