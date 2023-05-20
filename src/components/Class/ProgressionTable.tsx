import styled from 'styled-components';
import { Class, baseHitPoints } from '../../types/Character/Class';
import { useTranslation } from 'react-i18next';

const ProgresstionTableWrapper = styled.table`
    & td,
    & th {
        text-align: center;
        padding: 0.4em;
        border: 1px solid black;
    }
    & td.classFeatures,
    & th.classFeatures {
        text-align: left;
    }
`;

function saveAtLevel(save: boolean, level: number): string {
    const value = Math.floor(level / (save ? 2 : 3));
    return save ? `${value} (${value + 2})` : `${value}`;
}

interface ProgressionRowProps {
    level: number;
    cls: Class;
}

function ProgressionRow({
    level,
    cls,
}: ProgressionRowProps): React.JSX.Element {
    const { t } = useTranslation();
    const [base, extra] = baseHitPoints(cls.hitDie);
    const hp = `${base * level} (${base * level + extra})`;
    return (
        <tr>
            <td>{level}</td>
            <td>{hp}</td>
            <td>+{Math.floor(cls.baseAttack * level)}</td>
            <td>{saveAtLevel(cls.saves.fortitude, level)}</td>
            <td>{saveAtLevel(cls.saves.reflexes, level)}</td>
            <td>{saveAtLevel(cls.saves.will, level)}</td>
            <td className="classFeatures">
                {cls
                    .featuresAt(level)
                    .map(f => t(`class.features.${f}`))
                    .join(', ')}
            </td>
        </tr>
    );
}

interface ProgressionTableProps {
    cls: Class;
}

function ProgressionTable({ cls }: ProgressionTableProps): React.JSX.Element {
    const { t } = useTranslation();
    const levels = Array.from({ length: cls.maxLevel }, (_, i) => i + 1);
    return (
        <ProgresstionTableWrapper>
            <thead>
                <tr>
                    <th>{t('class.ui.level')}</th>
                    <th>{t('class.ui.hp')}</th>
                    <th>{t('class.ui.bab')}</th>
                    <th>{t('class.ui.fort')}</th>
                    <th>{t('class.ui.refl')}</th>
                    <th>{t('class.ui.will')}</th>
                    <th className="classFeatures">{t('class.ui.features')}</th>
                </tr>
            </thead>
            <tbody>
                {levels.map(level => (
                    <ProgressionRow key={level} level={level} cls={cls} />
                ))}
            </tbody>
        </ProgresstionTableWrapper>
    );
}

export { ProgressionTable };
