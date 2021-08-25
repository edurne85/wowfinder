import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Character from "../../@types/Character";
import Size from "../../@types/Character/Size";
import Skills, { Skill } from "../../@types/Character/Skills";
import { StatKey, StatSet } from "../../@types/Character/Stats";
import { debug } from "../../utils";
import Header from "../helpers/Header";
import { CheckCell, InputCell } from "../helpers/InputCell";
import { borderless, font, FontFamily, smallText } from "../helpers/mixins";
import Page from "../helpers/Page";

const StyledTable = styled.table`
    ${font({family: FontFamily.priori})}
    & th, & td, & input {
        box-sizing: border-box;
        width: 11mm;
        text-align: center;
        ${smallText}
        ${borderless}
    }
    ${debug ? `
        & th, & td {
            outline: 1px dashed #ff9;
        }
    ` : ''}
    & .skill-name, & .skill-name input {
        width: 50mm;
        text-align: left;
    }
    & .check-box, & .check-box input {
        width: 5mm;
    }
`;

interface SkillArgs {
    k: string,
    statMods: StatSet,
    ranks: number,
    isClass: boolean,
    // TODO Racial bonus
    size: Size,
    gear: number,
    // TODO Gear bonuses
    // TODO Misc bonuses
    // TODO ACP
    // TODO Temp bonuses
}

const trainedClassSkillBonus = 3;

function SkillRow({k, statMods, ranks, isClass, size, gear}: SkillArgs) {
    const { t } = useTranslation();
    const skill = Skills[k as Skill];
    let statKey: StatKey = skill.primary;
    let statBonus = statMods[skill.primary];
    if (skill.secondary !== null) {
        const secondaryBonus = statMods[skill.secondary];
        if (secondaryBonus > statBonus) {
            statKey = skill.secondary;
            statBonus = secondaryBonus;
        }
    }
    const id: (suffix: string) => string = (suffix) => `txtSkill_${k}_${suffix}`;
    const trained = isClass && ranks > 0 ? trainedClassSkillBonus : 0;
    const sizeMod = skill.sizeModFactor * size;
    const usable = isClass || ranks > 0 || !skill.trainedOnly;
    const total = usable ? statBonus + ranks + trained + sizeMod + gear: 0; // TODO
    return (<tr>
        <CheckCell id={id('Untrained')} value={!skill.trainedOnly} />
        <CheckCell id={id('Class')} value={isClass} />
        <td className="skill-name">{t(`skills.${k}`)}</td>
        <InputCell id={id('Total')} value={total} hideZero={!usable} />
        <td className="skill-stat-abbr">{t(`stats.abbr.${statKey}`)}</td>
        <InputCell id={id('StatMod')} value={statBonus} />
        <InputCell id={id('Ranks')} value={ranks} hideZero={true} />
        <InputCell id={id('Trained')} value={trained} hideZero={true} />
        <InputCell id={id('Racial')} value={0} hideZero={true} />
        <InputCell id={id('SizeMod')} value={sizeMod} hideZero={true} />
        <InputCell id={id('Gear')} value={gear} hideZero={true} />
        <InputCell id={id('Misc')} value={0} hideZero={true} />
        <InputCell id={id('Acp')} value={0} hideZero={true} />
        <InputCell id={id('Temp')} value={0} hideZero={true} />
    </tr>);
}

export function SkillsPage({char, visible = true}: {char: Character, visible?: boolean}) {
    const { t } = useTranslation();
    const sortedKeys = Object.keys(Skills).sort((k1, k2) => t(`skills.${k1}`).localeCompare(t(`skills.${k2}`)));
    const statMods = char.stats.totalMods;
    const size = char.race?.size || 0;
    const classSkills = char.classBonuses.classSkills;
    const gearBonuses = char.gearBonuses.skills;
    return (<Page key="Skills" id="Skills" visible={visible}>
        <Header>{t('ui.skills.h')}</Header>
        <StyledTable>
            <thead>
                <tr>
                    <th className="check-box">{t('ui.skills.untrained')}</th>
                    <th className="check-box">{t('ui.skills.class')}</th>
                    <th className="skill-name">{t('ui.skills.skill')}</th>
                    <th>{t('ui.common.total')}</th>
                    <th>{t('ui.common.stat')}</th>
                    <th>{t('ui.common.statMod')}</th>
                    <th>{t('ui.skills.ranks')}</th>
                    <th>{t('ui.skills.trained')}</th>
                    <th>{t('ui.common.racial')}</th>
                    <th>{t('ui.common.size')}</th>
                    <th>{t('ui.common.gear')}</th>
                    <th>{t('ui.common.misc')}</th>
                    <th>{t('ui.skills.acp')}</th>
                    <th>{t('ui.common.temp')}</th>
                </tr>
            </thead>
            <tbody>
                {sortedKeys.map(k => (
                    <SkillRow {...{
                        key: k,
                        k,
                        statMods,
                        isClass: classSkills.has(k as Skill),
                        size,
                        ranks: char.skillRanks[k] || 0,
                        gear: gearBonuses.value(k as Skill),
                    }}/>
                ))}
            </tbody>
        </StyledTable>
    </Page>);
}