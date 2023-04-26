import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../helpers/GlobalContext';
import styled from 'styled-components';
import {
    allSubSchoolsByParent,
    CastingMode,
    FullComputedSchools,
    School,
    SubSchool,
} from '../../../types/Magic';
import { font } from '../../helpers/mixins';

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
        ${font({ size: 10.5 })}
    }
`;

interface SchoolArgs {
    k: string;
    data: FullComputedSchools;
}

function SchoolLine({ k, data }: SchoolArgs): JSX.Element {
    const school = k as School;
    const { t } = useTranslation();
    const val = data[school];
    const context = useContext(GlobalContext);
    function v(k: SubSchool | ''): string {
        return context.forceBlank ? '' : (val[k] || val[''] || 0).toString();
    }

    return (
        <li>
            {t(`magic.schools.${k}`)}: {v('')}
            <ul>
                {allSubSchoolsByParent[school].sort().map(subschool => (
                    <li key={subschool}>
                        {t(`magic.schools.sub.${subschool}`)}:{' '}
                        {`${v(subschool)}`}
                    </li>
                ))}
            </ul>
        </li>
    );
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
            <thead>
                <tr>
                    <th colSpan={1}>
                        {t('charsheet.magic.power')} (
                        {t(`magic.modes.abbr.${mode}`)})
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ul>
                            {Object.keys(allSubSchoolsByParent).map(k => {
                                return (
                                    <SchoolLine
                                        k={k}
                                        key={k}
                                        data={data}></SchoolLine>
                                );
                            })}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </PowerContainer>
    );
}
