import { useTranslation } from 'react-i18next';
import { SpellBase } from '@model/Magic/Spell';
import { SpellDescriptor, stringify } from '@model/Magic/Spell/Descriptor';

interface DescriptorsArgs {
    descriptors: Iterable<SpellDescriptor>;
}

function Descriptors({ descriptors }: DescriptorsArgs): React.JSX.Element {
    const uniqueDescriptors = [...new Set(descriptors)];
    const { t } = useTranslation();
    return (
        <div className="spell-descriptors">
            [
            {uniqueDescriptors.map((descriptor, index) => (
                <span key={index} className="descriptor">
                    {stringify(descriptor, t)}
                </span>
            ))}
            ]
        </div>
    );
}

function DescriptorsIfNeeded({
    descriptors,
}: DescriptorsArgs): React.JSX.Element {
    return [...descriptors].length > 0 ? (
        <Descriptors descriptors={descriptors} />
    ) : (
        <></>
    );
}

function DescriptorsIfNeededRaw({
    raw,
}: {
    raw: SpellBase;
}): React.JSX.Element {
    return raw.descriptors ? (
        <DescriptorsIfNeeded descriptors={raw.descriptors} />
    ) : (
        <></>
    );
}

export { DescriptorsIfNeededRaw as Descriptors };
