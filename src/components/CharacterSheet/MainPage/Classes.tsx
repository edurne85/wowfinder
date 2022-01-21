import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Character from '../../../@types/Character';
import Class from '../../../@types/Character/Class';
import { borderThin, printableBottomBorder, font, FontFamily } from '../../helpers/mixins';

const StyledTable = styled.table`
    & td, & th, & input, & select {
        box-sizing: border-box;
    }
    & td.class-select, & select {
        width: 30mm;
        ${font({family: FontFamily.priori})}
    }
    & td.class-level, & input {
        text-align: center;
        width: 9mm;
    }
    & input {
        ${borderThin}
    }
    ${printableBottomBorder('& input')}
    & .first-class, & .first-class * {
        font-weight: bold;
    }
`;

function ClassPicker({selectedKey = null}: {selectedKey?: string | null}): JSX.Element {
    const allClasses = Class.import();
    const { t } = useTranslation();
    const cKeys = Object.keys(allClasses);
    return (<select defaultValue={selectedKey || ''}>
        <option value=""></option>
        {cKeys.map(k => {
            return (<option key={k} value={k}>{t(`classes.${k}`)}</option>);
        })}
    </select>);
}

interface ClassEntryArgs {
    cKey: string | null,
    level: number,
    first?: boolean,
}
function ClassEntry({cKey, level, first = false}: ClassEntryArgs): JSX.Element {
    const firstClass = first ? ' first-class' : '';
    return (<>
        <td className={`class-select${firstClass}`}>
            <ClassPicker selectedKey={cKey} />
        </td>
        <td className={`class-level${firstClass}`}>
            <input value={level || ''} readOnly={true} />
        </td>
    </>);
}

const maxClassCount = 12;

export default function Classes({char}: {char?: Character}): JSX.Element {
    const pairs: {key: string, level: number}[] = char != null ? char.classes.map(c => ({key: c.cls.key, level: c.level})) : [];
    while (pairs.length < maxClassCount) {
        pairs.push({key: '', level: 0});
    }
    const rows = [];
    for (let i = 0; i + 1 < maxClassCount; i += 2) {
        rows.push(<tr key={i}>
            <ClassEntry cKey={pairs[i].key} level={pairs[i].level} first={i === 0} />
            <ClassEntry cKey={pairs[i+1].key} level={pairs[i+1].level}  />
        </tr>);
    }
    return (<StyledTable><tbody>{rows}</tbody></StyledTable>);
}