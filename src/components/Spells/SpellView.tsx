import { useTranslation } from 'react-i18next';
import { Spell, SpellRank } from '../../types/Magic/Spell';
import React from 'react';
import { toRoman } from '../../utils';
import { SpellHelper } from './SpellHelper';

interface SpellArgs {
    spell: Spell;
}

interface SpellRankArgs {
    parent: Spell;
    rank: SpellRank;
}

function Rank({ parent, rank }: SpellRankArgs): React.JSX.Element {
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

function SpellView({ spell }: SpellArgs): React.JSX.Element {
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

export { SpellView };
