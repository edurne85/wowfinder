import styled from 'styled-components';
import { BonusViewArgs } from '../helpers';
import { ConditionalStatsBonusSummaryView as Stats } from './StatsBonusSummaryView';
import { ConditionalResistBonusSummaryView as Resist } from './ResistBonusSummaryView';
import { ConditionalSkillsBonusSummaryView as Skills } from './SkillsBonusSummaryView';
import { ConditionalSavesBonusSummaryView as Saves } from './SavesBonusSummaryView';
import { ConditionalSpellPowerBonusSummaryView as SpellPower } from './SpellPowerBonusSummaryView';
import { useTranslation } from 'react-i18next';
import { useNumberFormatters } from '@hooks';

const BonusSummaryContainer = styled.div``;

function BonusSummaryView({ bonus }: BonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    return (
        <BonusSummaryContainer>
            {bonus.hp ? (
                <p>
                    {t('charsheet.hitpoints.h')}: {format(bonus.hp)}
                </p>
            ) : null}
            <Stats statsBonus={bonus.stats} />
            <Skills skillBonus={bonus.skills} />
            <Saves savesBonus={bonus.saves} />
            <Resist resistBonus={bonus.resistances} />
            <SpellPower spellPowerBonus={bonus.spellPower} />
        </BonusSummaryContainer>
    );
}

function ConditionalBonusSummaryView({
    bonus,
}: Partial<BonusViewArgs>): React.JSX.Element {
    return bonus ? <BonusSummaryView bonus={bonus} /> : <></>;
}

export { BonusSummaryView, ConditionalBonusSummaryView };
