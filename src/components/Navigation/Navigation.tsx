import { Breadcrumbs } from './Breadcrumbs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { mainColor, font, linkColors } from '../helpers/mixins';

const NavigationContainer = styled.nav`
    margin: 0.5em 0;

    button,
    a,
    span {
        ${mainColor}
        ${font({
            size: 12,
        })}
        display: inline-block;
        appearance: none;
        border: none;
        padding: 0.1em 0.5em;
    }

    button,
    a {
        cursor: pointer;
        text-decoration: underline;
    }

    button:hover,
    a:hover {
        text-decoration: underline;
        ${linkColors}
    }
`;

function Navigation(): React.JSX.Element {
    const canGoBack: boolean = window.history.length > 1;
    const canGoForward: boolean =
        window.history.state.idx < window.history.length - 1;
    const { t } = useTranslation();
    return (
        <NavigationContainer>
            <button onClick={() => window.history.back()} disabled={!canGoBack}>
                {t('navigation.back')}
            </button>
            <button
                onClick={() => window.history.forward()}
                disabled={!canGoForward}>
                {t('navigation.forward')}
            </button>
            <Breadcrumbs />
        </NavigationContainer>
    );
}

function WithNavigation({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
}

export { WithNavigation };
