import { useTranslation } from 'react-i18next';
import type { SkillsBonusViewArgs } from '../helpers';
import { Skill } from '@model/Character/Skill';
import { useNumberFormatters } from '@hooks';

function SkillsBonusSummaryView({
    skillBonus,
}: SkillsBonusViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const { signedNonZero: format } = useNumberFormatters();
    const v = skillBonus.values;
    return (
        <p>
            {t('charsheet.skills.h')}:{' '}
            {Object.values(Skill)
                .filter(key => !!v[key])
                .map(key => `${t(`skills.${key}`)}: ${format(v[key] || 0)}`)
                .join(', ')}
        </p>
    );
}

function ConditionalSkillsBonusSummaryView({
    skillBonus,
}: Partial<SkillsBonusViewArgs>): React.JSX.Element {
    return skillBonus && !skillBonus.isZero ? (
        <SkillsBonusSummaryView skillBonus={skillBonus} />
    ) : (
        <></>
    );
}

export { SkillsBonusSummaryView, ConditionalSkillsBonusSummaryView };
