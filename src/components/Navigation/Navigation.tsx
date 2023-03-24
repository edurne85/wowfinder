import { Breadcrumbs } from './Breadcrumbs';

function Navigation(): JSX.Element {
    const canGoBack: boolean = window.history.length > 1;
    const canGoForward: boolean = window.history.state.idx < window.history.length - 1;
    console.log({
        history: window.history,
        canGoBack,
        canGoForward,
    });
    return (
        <nav>
            <button
                onClick={() => window.history.back()}
                disabled={!canGoBack}
            >
                Back
            </button>
            <button
                onClick={() => window.history.forward()}
                disabled={!canGoForward}
            >
                Forward
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
