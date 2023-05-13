import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import {
    CheetahForm,
    CrowForm,
    DolphinForm,
    EagleForm,
    Shapeshift,
    StagForm,
} from '../../../types/Transformation';
import { Speed } from '../MainPage/Speed';
import { ShapeshiftViewContainer, useTransformation } from './base';
import { ReactNode } from 'react';

function TravelFormView<TForm extends Shapeshift>({
    char,
    key,
    FormConstructor,
    children,
}: {
    char: Character;
    key: string;
    FormConstructor: new (args: { rank: number }) => TForm;
    children?: ReactNode;
}): JSX.Element {
    const { t } = useTranslation();
    const rank = char.classFeaturesCondensed.count(`${key}Form`);
    useTransformation(char, new FormConstructor({ rank }));
    return rank > 0 ? (
        <ShapeshiftViewContainer title={t(`charsheet.shapeshift.${key}`)}>
            <Speed speeds={char.speeds} />
            {children}
        </ShapeshiftViewContainer>
    ) : (
        <></>
    );
}

const CheetahFormView = ({ char }: { char: Character }): JSX.Element =>
    TravelFormView({ char, key: 'cheetah', FormConstructor: CheetahForm });

const DolphinFormView = ({ char }: { char: Character }): JSX.Element =>
    TravelFormView({ char, key: 'dolphin', FormConstructor: DolphinForm });

const CrowFormView = ({ char }: { char: Character }): JSX.Element =>
    TravelFormView({ char, key: 'crow', FormConstructor: CrowForm });

const StagFormView = ({ char }: { char: Character }): JSX.Element =>
    TravelFormView({ char, key: 'greatStag', FormConstructor: StagForm });

const EagleFormView = ({ char }: { char: Character }): JSX.Element =>
    TravelFormView({ char, key: 'eagle', FormConstructor: EagleForm });

export {
    TravelFormView,
    CheetahFormView,
    DolphinFormView,
    CrowFormView,
    StagFormView,
    EagleFormView,
};
