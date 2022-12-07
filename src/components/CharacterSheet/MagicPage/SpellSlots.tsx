import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../helpers/GlobalContext';
import styled from 'styled-components';
import { Character } from '../../../@types/Character';
import {
    CastingMode,
    zeroCasterLevel,
    levelByMode,
    slotsByLevel,
    slotsByStat,
    castingStats,
} from '../../../@types/Magic';
import { InputCell } from '../../helpers/InputCell';

const SlotsContainer = styled.table`
    & td,
    & td input,
    & th,
    & th input {
        width: 11.5mm;
        text-align: center;
    }
`;

interface SlotsRowArgs {
    level: number;
    cls?: number;
    stat?: number;
    misc?: number;
}
function SlotsRow({
    level,
    cls = 0,
    stat = 0,
    misc = 0,
}: SlotsRowArgs): JSX.Element {
    return (
        <tr>
            <th>{level}</th>
            <InputCell value={cls + stat + misc} hideZero={true} />
            <InputCell value={cls} hideZero={true} />
            <InputCell value={stat} hideZero={true} />
            <InputCell value={misc} hideZero={true} />
        </tr>
    );
}

interface SpellSlotsArgs {
    char?: Character;
    mode: CastingMode;
}
const spellLevelMax = 15;
const levels: number[] = [...Array(spellLevelMax + 1).keys()];

export function SpellSlots({ char, mode }: SpellSlotsArgs): JSX.Element {
    const { t } = useTranslation();
    const clevel = levelByMode(
        char?.classBonuses?.efl || zeroCasterLevel,
        mode
    );
    const statKey = castingStats[mode];
    const stat = char?.stats?.totals[statKey] || 0;
    const context = useContext(GlobalContext);
    const v:(n: number) => number = (n: number) =>
        context.forceBlank ? 0 : n;
    return (
        <SlotsContainer>
            <thead>
                <tr>
                    <th colSpan={5}>{t('ui.magic.slots')} ({t(`magic.modes.abbr.${mode}`)})</th>
                </tr>
                <tr>
                <th>{t('ui.magic.level')}</th>
                <th>{t('ui.common.total')}</th>
                <th>{t('ui.magic.class')}</th>
                <th>{t(`stats.abbr.${statKey}`)}</th>
                <th>{t('ui.common.misc')}</th>
                </tr>
            </thead>
            <tbody>
                {levels.map(l => (
                    <SlotsRow
                        level={l}
                        key={l}
                        cls={v(slotsByLevel(mode, clevel, l))}
                        stat={v(clevel ? slotsByStat(stat, l) : 0)}
                    />
                ))}
            </tbody>
        </SlotsContainer>
    );
}
