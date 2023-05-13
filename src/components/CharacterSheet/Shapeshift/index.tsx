// import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import Page from '../../helpers/Page';
import { BearFormView } from './BearFormView';
import { CatFormView } from './CatFormView';
import { CheetahFormView } from './CheetahFormView';

function FeralForms({
    char,
    visible,
}: {
    char?: Character;
    visible?: boolean;
}): JSX.Element {
    // const { t } = useTranslation();
    console.log(`FeralForms for ${char?.fullName || 'unknown'}: ${visible}`);
    return char ? (
        <Page key="ShapeshiftForms" id="ShapeshiftForms" visible={visible}>
            {/* TODO: add some heading? */}
            <BearFormView char={char} />
            <CatFormView char={char} />
            <CheetahFormView char={char} />
        </Page>
    ) : (
        <></>
    );
}

export { FeralForms };
