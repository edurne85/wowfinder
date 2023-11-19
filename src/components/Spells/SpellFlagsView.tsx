import { SpellFlag } from '@model/Magic';
import { useTranslation } from 'react-i18next';

interface SpellFlagArgs {
    flag: SpellFlag;
    value: boolean;
}

function SpellFlagText({ flag, value }: SpellFlagArgs): React.JSX.Element {
    const { t } = useTranslation();
    const flagLabel = t(`magic.flags.${flag}`);
    const valueText = t(`keywords.${value ? 'yes' : 'no'}`);
    return (
        <div>
            <b>{flagLabel}</b>: {valueText}
        </div>
    );
}

function SpellFlagIfNeeded({
    flag,
    value,
}: SpellFlagArgs): React.JSX.Element | null {
    return value ? <SpellFlagText flag={flag} value={value} /> : null;
}

interface SpellFlagsViewArgs {
    flags: Iterable<SpellFlag>;
}

function SpellFlagsView({ flags }: SpellFlagsViewArgs): React.JSX.Element {
    return (
        <>
            {[...flags].map(flag => (
                <SpellFlagIfNeeded key={flag} flag={flag} value={true} />
            ))}
        </>
    );
}

export { SpellFlagsView as SpellFlags };
