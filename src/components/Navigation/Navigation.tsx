import { Breadcrumbs } from './Breadcrumbs';
import { useTranslation } from 'react-i18next';

function Navigation(): JSX.Element {
    const canGoBack: boolean = window.history.length > 1;
    const canGoForward: boolean = window.history.state.idx < window.history.length - 1;
    console.log({
        history: window.history,
        canGoBack,
        canGoForward,
    });
    const { t } = useTranslation();
    return (
        <nav>
            <button
                onClick={() => window.history.back()}
                disabled={!canGoBack}
            >
                {t('navigation.back')}
            </button>
            <button
                onClick={() => window.history.forward()}
                disabled={!canGoForward}
            >
                {t('navigation.forward')}
            </button>
            <Breadcrumbs />
        </nav>
    );
}

function WithNavigation({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
}

export { WithNavigation };
