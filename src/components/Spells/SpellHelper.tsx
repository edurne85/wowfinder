import React from 'react';
import { Descriptors } from './SpellDescriptorsView';
import { School } from './SpellSchoolView';
import { SpellDuration } from './SpellDuration';
import { SpellRange } from './SpellRangeView';
import { Components } from './SpellComponentsView';
import { SpellBase } from '../../types/Magic/Spell';
import { Markdown } from '@components/helpers/Markdown';
import { styled } from 'styled-components';
import { CastingTime } from './SpellCastingTimeView';

function SpellDescription({ desc }: { desc: string }): React.JSX.Element {
    return (
        <div className="spell-description">
            <Markdown>{desc}</Markdown>
        </div>
    );
}

function Heading({
    hRank,
    sub = 0,
    text,
}: {
    hRank: number;
    sub?: number;
    text: string;
}): React.JSX.Element {
    return React.createElement(`h${hRank + sub}`, {}, text);
}
interface SpellHelperArgs {
    raw: SpellBase;
    hRank: number;
    texts: {
        title: string;
        description: string;
    };
}

const SpellContainer = styled.div`
    margin: 0.3em 0.8em;
    div.spell-description {
        p {
            margin: 0.6em 0;
        }
        li,
        ul {
            margin-left: 0.6em;
        }
    }
`;

function SpellHelper({
    texts,
    raw,
    hRank,
}: SpellHelperArgs): React.JSX.Element {
    return (
        <SpellContainer className="spell">
            <Heading hRank={hRank} text={texts.title} />
            <Descriptors raw={raw} />
            <School raw={raw} />
            <Components components={raw.components} />
            <CastingTime castingTime={raw.castingTime} />
            <SpellDuration duration={raw.duration} />
            <SpellRange range={raw.range} />
            <SpellDescription desc={texts.description} />
        </SpellContainer>
    );
}

export { SpellHelper };
