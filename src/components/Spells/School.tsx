import { useTranslation } from 'react-i18next';
import { School as S, SubSchool } from '../../types/Magic';
import { Spell, SpellBase } from '../../types/Magic/Spell';

interface SchoolArgs {
    sch: S | SubSchool;
}

function School({ sch }: SchoolArgs): React.JSX.Element {
    const { t } = useTranslation();
    const key = S[sch as S]
        ? `magic.schools.${sch}`
        : `magic.schools.sub.${sch}`;
    return (
        <span className="school">
            <b>{t('charsheet.magic.school')}</b>: {t(key)}
        </span>
    );
}

function SchoolIfNeededSpell({ spell }: { spell: Spell }): React.JSX.Element {
    return spell.sch ? <School sch={spell.sch} /> : <></>;
}

function SchoolIfNeededRaw({ raw }: { raw: SpellBase }): React.JSX.Element {
    return raw instanceof Spell ? <SchoolIfNeededSpell spell={raw} /> : <></>;
}

export { SchoolIfNeededRaw as School };
