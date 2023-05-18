import React, { ReactNode } from 'react';

type Wrapper = (props: { children: ReactNode }) => React.JSX.Element;
const DefaultWrapper: Wrapper = ({ children }: { children: ReactNode }) => (
    <span>{children}</span>
);

let callCounter = 0;

export function Join({
    separator,
    items,
    InnerWrapper = DefaultWrapper,
    OuterWrapper = DefaultWrapper,
}: {
    separator: React.JSX.Element | string;
    items: React.JSX.Element[];
    InnerWrapper?: Wrapper;
    OuterWrapper?: Wrapper;
}): React.JSX.Element {
    const key = `join-${callCounter++}`;
    return (
        <OuterWrapper>
            {items.map((item, index) => (
                <InnerWrapper key={`${key}-${index}`}>
                    {index ? separator : ''}
                    {item}
                </InnerWrapper>
            ))}
        </OuterWrapper>
    );
}
