const screenZoomDefault = 1.6;

function screenZoom(factor = screenZoomDefault, minWidth?: number): string {
    const widthCondition = minWidth ? `and (min-width: ${minWidth}px)` : '';
    return `@media screen ${widthCondition} {
            zoom: ${factor};
        }`;
}

export { screenZoom };
