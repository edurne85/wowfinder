interface ConditionalRenderProps<Props> {
    condition: boolean;
    component: (props: Props) => React.JSX.Element;
    props: Props;
}

function ConditionalRender<Props>({
    condition,
    component,
    props,
}: ConditionalRenderProps<Props>): React.JSX.Element | null {
    return condition ? component(props) : null;
}

export { ConditionalRender };
