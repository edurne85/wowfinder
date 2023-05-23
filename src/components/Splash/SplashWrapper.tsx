import { LoadingStages } from './LoadingStages';
import { Splash } from './Splash';

interface SplashWrapperProps {
    stage: LoadingStages | null;
    finalStage: LoadingStages;
    FollowUp: React.FunctionComponent;
}

function SplashWrapper(props: SplashWrapperProps): React.JSX.Element {
    const { stage, finalStage, FollowUp } = props;
    return stage ? (
        stage === finalStage ? (
            <FollowUp />
        ) : (
            <Splash stage={stage} />
        )
    ) : (
        <></>
    );
}

export { SplashWrapper };
