import styled from 'styled-components';
import { Class } from '../../types/Character/Class';
import { useTranslation } from 'react-i18next';
import { ProgressionTable } from './ProgressionTable';

const ClassViewWrapper = styled.div`
    & p.wip {
        margin: 0.3em;
        border: 2px solid red;
        background-color: #ffdddd;
        padding: 0.3em;
    }
`;

function ClassView({ cls }: { cls: Class }): React.JSX.Element {
    // TODO i18n
    const { t } = useTranslation();
    return (
        <ClassViewWrapper>
            <p className="wip">This page is a work in progress</p>
            <h1>{t(`classes.${cls.key}`)}</h1>
            <ProgressionTable cls={cls} />
        </ClassViewWrapper>
    );
}

export { ClassView };
