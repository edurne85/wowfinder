import { useTranslation } from 'react-i18next';
import { LoadingStages } from './LoadingStages';
import styled from 'styled-components';

interface SplashProps {
    stage: LoadingStages;
}

const SplashDiv = styled.div`
    text-align: center;
    margin: 1em;
`;

const logoSrc = window.Main.builtin('logo.png');
function Logo({ title }: { title?: string | null }): React.JSX.Element {
    return (
        <img
            style={{
                width: '85%',
                height: 'auto',
            }}
            src={logoSrc}
            title={title || undefined}
        />
    );
}

function Splash(props: SplashProps): React.JSX.Element {
    const { stage } = props;
    const { t } = useTranslation();
    return (
        <SplashDiv>
            <h1>
                <Logo title={t('splash.title')} />
            </h1>
            <p>{t(`splash.stages.${stage}`)}</p>
        </SplashDiv>
    );
}

export { Splash };
