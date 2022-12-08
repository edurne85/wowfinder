import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../helpers/GlobalContext';
import styled from 'styled-components';
import { borderless, debugOutline, printableBottomBorder, smallText } from '../../helpers/mixins';

interface WeightProps {
    load?: number;
    capacity: number;
}

const StyledTable = styled.table`
    ${debugOutline({color: '#909'})}
    margin-top: 5mm;
    border-spacing: 0;
    & td, & th, & input {
        box-sizing: border-box;
        width: 12mm;
        text-align: center;
    }
	& td {
		border: 0.2mm #000 solid;
	}
    & td.text {
        width: 20mm;
    }
    ${printableBottomBorder('& td')}
	& th {
		${smallText};
	}
    & input {
        ${borderless};
    }
`;

enum LimitType {
    light = 'light',
    medium = 'medium',
    heavy = 'heavy',
    lift = 'lift',
    drag = 'drag',
    excess = 'excess',
}

type Limits = {
    [LimitType.light]: number,
    [LimitType.medium]: number,
    [LimitType.heavy]: number,
    [LimitType.lift]: number,
    [LimitType.drag]: number,
};

function limit(base: number, factor = 1.0): number {
    return Math.round(base * factor);
}

function limits(base: number): Limits {
    return {
        [LimitType.light]: limit(base, 1.0 / 3),
        [LimitType.medium]: limit(base, 2.0 / 3),
        [LimitType.heavy]: limit(base),
        [LimitType.lift]: limit(base, 2.0),
        [LimitType.drag]: limit(base, 5.0),
    };
}

const limitsOrdered: (keyof Limits)[] = [
    LimitType.light,
    LimitType.medium,
    LimitType.heavy,
    LimitType.lift,
    LimitType.drag,
];

function currentLoad(limits: Limits, load: number): LimitType {
    for (const l of limitsOrdered) {
        if (load < limits[l]) {
            return l;
        }
    }
    return LimitType.excess;
}

const WeightInput: React.FC<{ value: number }> = ({ value }) => {
    const context = useContext(GlobalContext);
    return (<input defaultValue={context.forceBlank ? '' : value} />);
};

const Weight: React.FC<WeightProps> = ({load = 0, capacity}) => {
    const { t } = useTranslation();
    const l = limits(capacity);
    const context = useContext(GlobalContext);
    const totalText = context.forceBlank ? '' : t(`ui.inventory.weight.${currentLoad(l, load)}`);
    return(<StyledTable id="tblHp">
        <tbody>
            <tr>
                <th colSpan={2}>{t('ui.common.total')}</th>
                <th>{t('ui.inventory.weight.light')}</th>
                <th>{t('ui.inventory.weight.medium')}</th>
                <th>{t('ui.inventory.weight.heavy')}</th>
                <th>{t('ui.inventory.weight.lift')}</th>
                <th>{t('ui.inventory.weight.drag')}</th>
            </tr>
            <tr>
                <td><WeightInput value={load} /></td>
                <td className="text">{totalText}</td>
                <td><WeightInput value={l.light} /></td>
                <td><WeightInput value={l.medium} /></td>
                <td><WeightInput value={l.heavy} /></td>
                <td><WeightInput value={l.lift} /></td>
                <td><WeightInput value={l.drag} /></td>
            </tr>
        </tbody>
    </StyledTable>);
};

export {
    Weight,
};