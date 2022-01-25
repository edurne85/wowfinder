export function Join({separator, items}: {separator: JSX.Element | string, items: JSX.Element[]}): JSX.Element {
    return (<>{items.map((item, index) => (<>{index ? separator : ''}{item}</>))}</>);
}