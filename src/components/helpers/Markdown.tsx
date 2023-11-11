import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import * as jsxRuntimeMissingTypeInformation from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import { StyledMarkdownContainer } from './Markdown.style';

const jsxRuntime = jsxRuntimeMissingTypeInformation as any;

const rehypeReactOptions = {
    Fragment: jsxRuntime.Fragment,
    jsx: jsxRuntime.jsx,
    jsxs: jsxRuntime.jsxs,
};

interface MarkdownProps {
    children: string;
}
function Markdown({ children }: MarkdownProps): React.JSX.Element {
    const reactContent = unified()
        .use(remarkParse)
        .use([remarkGfm])
        .use(remarkToRehype)
        .use(rehypeReact, rehypeReactOptions)
        .processSync(children).result as any;
    return <StyledMarkdownContainer>{reactContent}</StyledMarkdownContainer>;
}

export { Markdown };
