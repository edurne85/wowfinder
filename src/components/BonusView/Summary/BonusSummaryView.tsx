import styled from 'styled-components';
import { BonusViewArgs } from '../helpers';
import { ConditionalStatsBonusSummaryView as Stats } from './StatsBonusSummaryView';
import { ConditionalResistBonusSummaryView as Resist } from './ResistBonusSummaryView';
import { ConditionalSkillsBonusSummaryView as Skills } from './SkillsBonusSummaryView';
import { ConditionalSavesBonusSummaryView as Saves } from './SavesBonusSummaryView';

const BonusSummaryContainer = styled.div``;

function BonusSummaryView({ bonus }: BonusViewArgs): React.JSX.Element {
    return (
        <BonusSummaryContainer>
            <Stats statsBonus={bonus.stats} />
            <Skills skillBonus={bonus.skills} />
            <Saves savesBonus={bonus.saves} />
            <Resist resistBonus={bonus.resistances} />
        </BonusSummaryContainer>
    );
}

function ConditionalBonusSummaryView({
    bonus,
}: Partial<BonusViewArgs>): React.JSX.Element {
    return bonus ? <BonusSummaryView bonus={bonus} /> : <></>;
}

export { BonusSummaryView, ConditionalBonusSummaryView };
