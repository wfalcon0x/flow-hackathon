
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import Button from "../ui/CustomButton";
import AdvancedSection, { AdvancedInfo, FloatType, QuantityType, TimeLimitType } from "./advancedSection";
import FinalSection from "./finalSection";
import FloatInfoSection, { FloatInfo } from "./floatInfoSection";
import styles from "./index.module.scss";
import LoginPage from "./loginPage";
import PreviewSection from "./previewSection";
import SocialsSection, { SocialResult } from "./socialsSection";
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
    const [floatInfo, setFloatInfo] = useState<FloatInfo>({
        eventName: "",
        description: "",
        image: "",
        price: 0
    });
    const [advancedInfo, setAdvancedInfo] = useState<AdvancedInfo>({
        claimQuantity: 0,
        endDate: new Date(),
        float: FloatType.SoulBound,
        quantityType: QuantityType.Limited,
        startDate: new Date(),
        timeLimit: TimeLimitType.NoTimeLimit
    });
    const [socialResult, setSocialResult] = useState<SocialResult>({
        discord: "",
        twitter: "",
        walletAddress: "",
        webpage: ""
    });


    return (
        <div className={styles.card}>
            <div className={styles.circleSection}>
                <div className={styles.circle} />
            </div>
            {step === 0 && (
                <div className={styles.createStepZero}>
                    <p className={styles.descriptionCreateText}>The following are non-functional wireframes of steps to create a checkout payment link for FLOATs</p>
                    <Button
                        color="white"
                        onClick={() => { onStepChange(2) }}
                        width={width < 1300 ? "90%" : "70%"}
                        height="52px"
                        fontSize={20}
                        fontWeight={400}
                        bgColor='black'
                        text={"Create FLOAT Checkout"}
                        borderRadius={30}
                    ></Button>
                </div>
            )}
            {/* {step === 1 && (
                <LoginPage onLogin={() => onStepChange(2)} />
            )} */}
            {step < 6 && step !== 0 && (
                <>
                    <StepSection step={step} />
                    {step === 2 && <FloatInfoSection onNext={(result) => { setFloatInfo(result); onStepChange(step + 1) }} onBack={() => { onStepChange(0) }} />}
                    {step === 3 && <AdvancedSection onNext={(result) => { setAdvancedInfo(result); onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }} />}
                    {step === 4 && <SocialsSection onNext={(result) => { setSocialResult(result); onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }} />}
                    {step === 5 && <PreviewSection onNext={() => { onStepChange(step + 1) }} onBack={() => { onStepChange(step - 1) }}
                        nftPreview={{
                            description: floatInfo.description,
                            name: floatInfo.eventName,
                            price: floatInfo.price,
                            image: floatInfo.image,
                            remaining: advancedInfo.claimQuantity,
                        }}
                    />}
                </>
            )}
            {step === 6 && (
                <FinalSection img={floatInfo.image} name={floatInfo.eventName} url={"www.payglide.xyz"} />
            )}
        </div>
    );
};
export default CreatePaymentCard;
