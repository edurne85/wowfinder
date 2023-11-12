import { useTranslation } from 'react-i18next';
import { School as S, SubSchool } from '../../types/Magic';
import { Spell, SpellBase } from '../../types/Magic/Spell';
import { styled } from 'styled-components';

const SchoolContainer = styled.span`
    display: block;
`;

interface SpellSchoolViewArgs {
    sch: S | SubSchool;
}

function SpellSchoolView({ sch }: SpellSchoolViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    const key = S[sch as S]
        ? `magic.schools.${sch}`
        : `magic.schools.sub.${sch}`;
    return (
        <SchoolContainer>
            <b>{t('charsheet.magic.school')}</b>: {t(key)}
        </SchoolContainer>
    );
}

function SchoolIfNeededSpell({ spell }: { spell: Spell }): React.JSX.Element {
    return spell.sch ? <SpellSchoolView sch={spell.sch} /> : <></>;
}

function SchoolIfNeededRaw({ raw }: { raw: SpellBase }): React.JSX.Element {
    return raw instanceof Spell ? <SchoolIfNeededSpell spell={raw} /> : <></>;
}

export { SchoolIfNeededRaw as School };
