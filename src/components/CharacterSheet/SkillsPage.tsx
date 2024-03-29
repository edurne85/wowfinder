import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../types/Character';
import { SkillsBonus } from '../../types/Character/Bonus';
import Size from '../../types/Character/Size';
import { Skills, Skill } from '../../types/Character/Skill';
import { StatSet } from '../../types/Character/Stats';
import Header from '../helpers/Header';
import { CheckCell, InputCell } from '../helpers/InputCell';
import {
    borderless,
    debugOutline,
    font,
    FontFamily,
    printableBottomBorder,
    reverseColors,
    smallText,
} from '../helpers/styles';
import Page from '../helpers/Page';
import { sum } from '@utils/numbers';

const SkillsPageContainer = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    border: 0 none;
    width: 100%;
    height: 100%;
`;

const Footer = styled.footer`
    ${font({ family: FontFamily.priori })};
    position: absolute;
    bottom: 0;
    & > strong {
        ${reverseColors}
        font-variant: small-caps;
        padding: 0 0.25em;
        margin-right: 0.5em;
    }
`;

const StyledTable = styled.table`
    ${font({ family: FontFamily.priori })}
    & th, & td, & input {
        box-sizing: border-box;
        width: 10.5mm;
        text-align: center;
        ${smallText}
        ${borderless}
    }
    ${debugOutline({ selector: '& th, & td', color: '#ff9' })}
    ${printableBottomBorder('& td input')}
    & .skill-stat-abbr {
        width: 16mm;
    }
    & .skill-name,
    & .skill-name input {
        width: 50mm;
        text-align: left;
    }
    & .check-box,
    & .check-box input {
        width: 5mm;
    }
`;

interface SkillArgs {
    k: string;
    statMods?: StatSet;
    ranks: number;
    isClass: boolean;
    // TODO #454: Racial bonus
    size: Size;
    gear: number;
    // TODO #454: Misc bonuses
    // TODO #454: ACP
    // TODO #454: Temp bonuses
}

const trainedClassSkillBonus = 3;

function SkillRow({
    k,
    statMods,
    ranks,
    isClass,
    size,
    gear,
}: SkillArgs): React.JSX.Element {
    const { t } = useTranslation();
    const skill = Skills[k as Skill];
    const hasTotal = statMods != null;
    const primaryAbbr = t(`stats.abbr.${skill.primary}`);
    const secondaryAbbr = skill.secondary
        ? t(`stats.abbr.${skill.secondary}`)
        : null;
    let fullAbbr = skill.secondary
        ? `${primaryAbbr} / ${secondaryAbbr}`
        : primaryAbbr;
    let statBonus: number | undefined;
    if (statMods) {
        statBonus = statMods[skill.primary];
        fullAbbr = primaryAbbr;
        if (skill.secondary !== null) {
            const secondaryBonus = statMods[skill.secondary];
            if (secondaryBonus > statBonus) {
                statBonus = secondaryBonus;
                fullAbbr = secondaryAbbr || '';
            }
        }
    }
    const id: (suffix: string) => string = suffix => `txtSkill_${k}_${suffix}`;
    const trained = isClass && ranks > 0 ? trainedClassSkillBonus : 0;
    const sizeMod = skill.sizeModFactor * size;
    const usable = isClass || ranks > 0 || !skill.trainedOnly;
    const total = hasTotal
        ? usable
            ? (statBonus || 0) + ranks + trained + sizeMod + gear
            : 0
        : undefined;
    return (
        <tr>
            <CheckCell id={id('Untrained')} value={!skill.trainedOnly} />
            <CheckCell id={id('Class')} value={isClass} />
            <td className="skill-name">{t(`skills.${k}`)}</td>
            <InputCell id={id('Total')} value={total} hideZero={!usable} />
            <td className="skill-stat-abbr">{fullAbbr}</td>
            <InputCell id={id('StatMod')} value={statBonus} />
            <InputCell id={id('Ranks')} value={ranks} hideZero={true} />
            <InputCell id={id('Trained')} value={trained} hideZero={true} />
            <InputCell id={id('Racial')} value={0} hideZero={true} />
            <InputCell id={id('SizeMod')} value={sizeMod} hideZero={true} />
            <InputCell id={id('Gear')} value={gear} hideZero={true} />
            <InputCell id={id('Misc')} value={0} hideZero={true} />
            <InputCell id={id('Acp')} value={0} hideZero={true} />
            <InputCell id={id('Temp')} value={0} hideZero={true} />
        </tr>
    );
}

export function SkillsPage({
    char,
    visible = true,
}: {
    char?: Character;
    visible?: boolean;
}): React.JSX.Element {
    const { t } = useTranslation();
    const sortedKeys = Object.keys(Skills).sort((k1, k2) =>
        t(`skills.${k1}`).localeCompare(t(`skills.${k2}`)),
    );
    const statMods = char?.stats.totalMods;
    const size = char?.race?.size || 0;
    const classSkills = char?.classBonuses.classSkills || new Set<Skill>();
    const gearBonuses = char?.gearBonuses.skills || new SkillsBonus({});
    return (
        <Page key="Skills" id="Skills" visible={visible}>
            <SkillsPageContainer>
                <Header>{t('charsheet.skills.h')}</Header>
                <StyledTable>
                    <thead>
                        <tr>
                            <th className="check-box">
                                {t('charsheet.skills.untrained')}
                            </th>
                            <th className="check-box">
                                {t('charsheet.skills.class')}
                            </th>
                            <th className="skill-name">
                                {t('charsheet.skills.skill')}
                            </th>
                            <th>{t('charsheet.common.total')}</th>
                            <th>{t('charsheet.common.stat')}</th>
                            <th>{t('charsheet.common.statMod')}</th>
                            <th>{t('charsheet.skills.ranks')}</th>
                            <th>{t('charsheet.skills.trained')}</th>
                            <th>{t('charsheet.common.racial')}</th>
                            <th>{t('charsheet.common.size')}</th>
                            <th>{t('charsheet.common.gear')}</th>
                            <th>{t('charsheet.common.misc')}</th>
                            <th>{t('charsheet.skills.acp')}</th>
                            <th>{t('charsheet.common.temp')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedKeys.map(k => (
                            <SkillRow
                                {...{
                                    key: k,
                                    k,
                                    statMods,
                                    isClass: classSkills.has(k as Skill),
                                    size,
                                    ranks: char?.skillRanks[k] || 0,
                                    gear: gearBonuses.value(k as Skill),
                                }}
                            />
                        ))}
                    </tbody>
                </StyledTable>
                <Footer>
                    <strong>{t('charsheet.skills.ranks')}:</strong>
                    {sum(...Object.values(char?.skillRanks || {}))} /{' '}
                    {char?.maxSkillRanks || ''}
                </Footer>
            </SkillsPageContainer>
        </Page>
    );
}
