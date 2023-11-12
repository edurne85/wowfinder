import { debug } from '../../../utils';

interface DebugOutlineArgs {
    selector?: string;
    width?: string;
    style?: string;
    color?: string;
}
const debugOutline = ({
    selector = '&',
    width = '1px',
    style = 'dashed',
    color = '#ccc',
}: DebugOutlineArgs): string =>
    debug
        ? `@media screen {
        ${selector} {
            outline: ${width} ${style} ${color};
        }
    }`
        : '';

export { debugOutline };
