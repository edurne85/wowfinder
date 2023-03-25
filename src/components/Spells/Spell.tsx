import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Spell as S, SpellRank, SpellBase } from '../../@types/Magic/Spell';
import React from 'react';
import { Descriptors } from './Descriptors';
import { toRoman } from '../../utils';
import { School } from './School';

interface SpellArgs {
    spell: S;
}

interface SpellRankArgs {
    parent: S;
    rank: SpellRank;
}

const SpellContainer = styled.div`
    margin: 0.3em 0.8em;
    div.spell-description p {
        margin: 0.6em 0;
    }
`;

function SpellDescription({ desc }: { desc: string }): JSX.Element {
    return (
        <div className="spell-description">
            {desc.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
            ))}
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
}): JSX.Element {
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

function SpellHelper ({ texts, raw, hRank }: SpellHelperArgs): JSX.Element {
    return (
        <SpellContainer className="spell">
            <Heading hRank={hRank} text={texts.title} />
            <Descriptors raw={raw} />
            <School raw={raw} />
            <SpellDescription desc={texts.description} />
        </SpellContainer>
    );
}

function Rank({ parent, rank }: SpellRankArgs): JSX.Element {
    const { t } = useTranslation();
    return (
        <SpellHelper
            raw={rank}
            hRank={3}
            texts={{
                title: `${t('charsheet.magic.rank')} ${toRoman(rank.rank)}`,
                description: t(`spells.${parent.key}.${rank.rank}`),
            }}
        />
    );
}

function Spell({ spell }: SpellArgs): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            <SpellHelper
                raw={spell}
                hRank={2}
                texts={{
                    title: t(`spells.${spell.key}.name`),
                    description: t(`spells.${spell.key}.description`),
                }}
            />
            {spell.ranks.map(rank => (
                <Rank key={rank.rank} parent={spell} rank={rank} />
            ))}
        </>
    );
}

export { Spell };
