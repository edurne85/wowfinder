import styled from 'styled-components';
import { Class } from '../../types/Character/Class';
import { useTranslation } from 'react-i18next';
import { ProgressionTable } from './ProgressionTable';
import { Money } from '../Money';

const ClassViewWrapper = styled.div`
    margin: 1em 0.5em;
    & b {
        font-weight: bold;
    }
    & h2 {
        margin-top: 0.5em;
    }
    & .classSkills span {
        display: inline-block;
        margin: 0 0.2em;
        white-space: nowrap;
        &:after {
            content: ', ';
        }
        &:last-child:after {
            content: '';
        }
    }
`;

function ClassView({ cls }: { cls: Class }): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <ClassViewWrapper>
            <h1>{t(`classes.${cls.key}`)}</h1>
            <p>
                <b>{t('class.ui.maxLevel')}</b>: {cls.maxLevel}
                <br />
                <b>{t('class.ui.initialWealth')}</b>:{' '}
                <Money money={cls.startingWealth} />
                <br />
                <b>{t('class.ui.hd')}</b>: d{cls.hitDie}
                <br />
                <b>{t('class.ui.skillRanks')}</b>: {cls.skillRanks} +{' '}
                {`[${t('stats.abbr.INT')}]`} + {t('class.ui.perLevel')}
                <br />
                <b>{t('class.ui.classSkills')}</b>:{' '}
                <span className="classSkills">
                    {[...cls.classSkills].map(s => (
                        <span>{t(`skills.${s}`)}</span>
                    ))}
                </span>
            </p>
            <h2>{t('class.ui.progression')}</h2>
            <ProgressionTable cls={cls} />
        </ClassViewWrapper>
    );
}

export { ClassView };
