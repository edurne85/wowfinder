import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { allSubSchoolsByParent, CastingMode, FullComputedSchools, School } from '../../../@types/Magic';

const PowerContainer = styled.table`
    & th,
    & td {
        text-align: left;
    }
    & th {
        width: 12mm;
    }
    & td {
        width: 30mm;
    }
    & li {
        margin-left: 1.5em;
    }
`;

interface SchoolArgs {
    k: string;
    data: FullComputedSchools;
}

function SchoolLine ({k, data}: SchoolArgs): JSX.Element {
    const school = k as School;
    const { t } = useTranslation();
    const val = data[school];
    return (<li>
        {t(`magic.schools.${k}`)}: {val[''] || 0}
        <ul>{
            allSubSchoolsByParent[school].sort().map(subschool => (
                <li key={subschool}>
                    {t(`magic.schools.sub.${subschool}`)}: {`${val[subschool] || val[''] || 0}`}
                </li>
            ))
        }</ul>
    </li>);
}

export function SpellPower({
    data,
    mode,
}: {
    data: FullComputedSchools;
    mode: CastingMode;
}): JSX.Element {
    const { t } = useTranslation();
    return (
        <PowerContainer>
            <tr>
                <th colSpan={1}>{t('ui.magic.power')} ({t(`magic.modes.abbr.${mode}`)})</th>
            </tr>
            <tr>
                <td><ul>
                    {Object.keys(allSubSchoolsByParent).map(k => {
                        return <SchoolLine k={k} key={k} data={data}></SchoolLine>;
                    })}
                </ul></td>
            </tr>
        </PowerContainer>
    );
}
