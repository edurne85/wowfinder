import styled from 'styled-components';
import { BonusViewArgs } from '../helpers';
import { ConditionalStatsBonusSummaryView } from './StatsBonusSummaryView';
import { ConditionalResistBonusSummaryView } from './ResistBonusSummaryView';
import { ConditionalSkillsBonusSummaryView } from './SkillsBonusSummaryView';

const BonusSummaryContainer = styled.div``;

function BonusSummaryView({ bonus }: BonusViewArgs): React.JSX.Element {
    return (
        <BonusSummaryContainer>
            <ConditionalStatsBonusSummaryView statsBonus={bonus.stats} />
            <ConditionalResistBonusSummaryView
                resistBonus={bonus.resistances}
            />
            <ConditionalSkillsBonusSummaryView skillBonus={bonus.skills} />
        </BonusSummaryContainer>
    );
}

function ConditionalBonusSummaryView({
    bonus,
}: Partial<BonusViewArgs>): React.JSX.Element {
    return bonus ? <BonusSummaryView bonus={bonus} /> : <></>;
}

export { BonusSummaryView, ConditionalBonusSummaryView };
