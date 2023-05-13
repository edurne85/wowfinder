// import { useTranslation } from 'react-i18next';
import Columns from '../../helpers/Columns';
import { Character } from '../../../types/Character';
import Page from '../../helpers/Page';
import { BearFormView } from './BearFormView';
import { CatFormView } from './CatFormView';
import {
    CheetahFormView,
    DolphinFormView,
    CrowFormView,
    StagFormView,
    EagleFormView,
} from './TravelFormView';
import styled from 'styled-components';

const TemporarySpacer = styled.div`
    margin: 2em;
    content: ' ';
`;

function FeralForms({
    char,
    visible,
}: {
    char?: Character;
    visible?: boolean;
}): JSX.Element {
    // const { t } = useTranslation();
    return char ? (
        <Page key="ShapeshiftForms" id="ShapeshiftForms" visible={visible}>
            {/* TODO: add some heading? */}
            <BearFormView char={char} />
            <CatFormView char={char} />
            <TemporarySpacer />
            <Columns
                columns={[
                    {
                        key: 'TravelFormsLeftColumn',
                        id: 'TravelFormsLeftColumn',
                        children: (
                            <>
                                <CheetahFormView char={char} />
                                <CrowFormView char={char} />
                                <EagleFormView char={char} />
                            </>
                        ),
                    },
                    {
                        key: 'TravelFormsRightColumn',
                        id: 'TravelFormsRightColumn',
                        children: (
                            <>
                                <DolphinFormView char={char} />
                                <StagFormView char={char} />
                            </>
                        ),
                    },
                ]}
            />
        </Page>
    ) : (
        <></>
    );
}

export { FeralForms };
