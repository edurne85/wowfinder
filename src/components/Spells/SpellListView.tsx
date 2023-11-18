import { useTranslation } from 'react-i18next';
import { SpellList, SpellListEntry } from '../../types/Magic';
import { toRoman } from '../../utils';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SpellListViewContainer = styled.div`
    margin: 0 1em;
    & > section {
        margin: 1em 0;
    }
    & ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
`;

interface SpellListEntryViewProps {
    entry: SpellListEntry;
}

function SpellListEntryView({
    entry,
}: SpellListEntryViewProps): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <li>
            <Link to={`/spell/${entry.spell.key}`}>
                {`${entry.spell.getFullName(t)} ${toRoman(entry.rank)}`}
            </Link>
        </li>
    );
}

interface SpellListLevelViewProps {
    entries: SpellListEntry[];
    level: number;
}

function SpellListLevelView({
    entries,
    level,
}: SpellListLevelViewProps): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <section>
            <h2>
                {t('magic.level')} {level}
            </h2>
            <ul>
                {entries.map(entry => (
                    <SpellListEntryView entry={entry} key={entry.spell.key} />
                ))}
            </ul>
        </section>
    );
}

interface SpellListViewProps {
    list: SpellList;
}

function SpellListView({ list }: SpellListViewProps): React.JSX.Element {
    const { t } = useTranslation();
    const spells = list.spells;
    const levels = Object.keys(spells)
        .map(k => parseInt(k))
        .sort((a, b) => a - b);
    return (
        <SpellListViewContainer>
            <h1>{t(`spell-lists.${list.key}.name`)}</h1>
            <p>{t(`spell-lists.${list.key}.description`)}</p>
            {levels.map(level => (
                <SpellListLevelView
                    entries={spells[level]}
                    level={level}
                    key={level}
                />
            ))}
        </SpellListViewContainer>
    );
}

export { SpellListView };
