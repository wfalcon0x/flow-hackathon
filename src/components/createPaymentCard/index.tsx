
import useWindowSize from "@/hooks/useWindowSize";
import Button from "../ui/CustomButton";
import AdvancedSection from "./advancedSection";
import FloatInfoSection from "./floatInfoSection";
import styles from "./index.module.scss";
import LoginPage from "./loginPage";
import PreviewSection from "./previewSection";
import SocialsSection from "./socialsSection";
import StepSection from "./stepSection";

type Props = {
    step: number;
    onStepChange: (step: number) => void;
};
const CreatePaymentCard = ({
    step,
    onStepChange,
}: Props) => {
    const width = useWindowSize().width;

    return (
        <div className={styles.card}>
            <div className={styles.circleSection}>
                <div className={styles.circle} />
            </div>
            {step === 0 && (
                <div className={styles.createStepZero}>
                    <Button
                        color="white"
                        onClick={() => { onStepChange(1) }}
                        width="70%"
                        height="52px"
                        fontSize={20}
                        fontWeight={400}
                        bgColor='black'
                        text={"Create FLOAT Checkout"}
                    ></Button>
                </div>
            )}
            {step === 1 && (
                <LoginPage onLogin={() => onStepChange(2)} />
            )}
            {step < 6 && (
                <>
                    <StepSection step={step} />
                    {step === 2 && <FloatInfoSection onNext={() => { onStepChange(step + 1) }} />}
                    {step === 3 && <AdvancedSection onNext={() => { onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }} />}
                    {step === 4 && <SocialsSection onNext={() => { onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }} />}
                    {step === 5 && <PreviewSection onNext={() => { onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }} />}

                </>
            )}
        </div>
    );
};
export default CreatePaymentCard;
