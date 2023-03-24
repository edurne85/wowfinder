import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsContainer = styled.div`
    display: inline-block;
    & > a,
    & > span {
        margin: 0 0.5rem;
    }
`;

interface ChunkLinkProps {
    chunks: string[];
    isLast?: boolean;
}

function SlashChunkLink({
    chunks,
    isLast = false,
}: ChunkLinkProps): JSX.Element {
    const last = chunks.length ? chunks[chunks.length - 1] : '';
    const path = `/${chunks.join('/')}`;
    return (
        <>
            /
            {isLast ? <span>{last}</span> : <Link to={path}>{last}</Link>}
        </>
    );
}

// TODO: suport i18n
function Breadcrumbs(): JSX.Element {
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
            <Link to="/">Home</Link>
            {slashChunks.map((_chunk, i) => (
                <SlashChunkLink
                    key={i}
                    chunks={slashChunks.slice(0, i + 1)}
                    isLast={i === lastSlashIndex}
                />
            ))}
        </BreadcrumbsContainer>
    );
}

export { Breadcrumbs };
