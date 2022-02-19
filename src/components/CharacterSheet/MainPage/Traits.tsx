import { TFunction, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../@types/Character';

const maxLines = 32;

const TraitsContainer = styled.div`
    margin-top: 2.8ex;
`;

const Line = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px dashed #999;
`;

function classFeatureString(translated: string, count: number): string {
    return count > 1 ? `${translated} (${count})` : translated;
}
function classFeatureStrings(char: Character, t: TFunction<'translation'>): string[] {
    return char.classFeaturesCondensed.map(({feature, count}) => classFeatureString(t(`classFeatures.${feature}`), count));
}

export default function Traits({char}: {char?: Character}): JSX.Element {
    const { t } = useTranslation();
    const lines: string[] = [];
    // TODO Racial traits
    lines.push(...(char? classFeatureStrings(char, t) : []));
    lines.push(...(char?.validFeats || []));
    // TODO: feats
    lines.splice(maxLines);
    lines.push(...Array(maxLines - lines.length).fill('\xa0'));
    let lineCount = 0;
    return (<TraitsContainer>
        {lines.map(l=> <Line key={`TraitsLine-${++lineCount}`}>{l}</Line>)}
    </TraitsContainer>);
}