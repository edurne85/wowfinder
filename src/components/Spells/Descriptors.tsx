import { SpellBase, SpellDescriptor } from '../../types/Magic/Spell';

interface DescriptorsArgs {
    descriptors: Iterable<SpellDescriptor>;
}

function Descriptors({ descriptors }: DescriptorsArgs): React.JSX.Element {
    const uniqueDescriptors = [...new Set(descriptors)];
    // TODO: Add translations
    return (
        <div className="spell-descriptors">
            {uniqueDescriptors.map((descriptor, index) => (
                <span key={index} className="descriptor">
                    {descriptor}
                </span>
            ))}
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
