
import Button from "@/components/ui/CustomButton";
import SelectableCard from "@/components/ui/Selectable";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

type Props = {
    onNext: (result: AdvancedInfo) => void;
    onBack: () => void;
};

export enum FloatType {
    Tradeable = "Tradeable",
    SoulBound = "SoulBound"
}
export enum QuantityType {
    Unlimited = "Unlimited",
    Limited = "Limited"
}
export enum TimeLimitType {
    NoTimeLimit = "NoTimeLimit",
    WithTimeLimit = "WithTimeLimit"
}

export interface AdvancedInfo {
    float: FloatType;
    quantityType: QuantityType;
    claimQuantity: number;
    timeLimit: TimeLimitType;
    startDate: Date;
    endDate: Date;
}

const AdvancedSection = ({
    onNext,
    onBack
}: Props) => {
    const width = useWindowSize().width;
    const [float, setFloat] = useState<FloatType | undefined>(undefined);
    const [quantityType, setQuantityType] = useState<QuantityType | undefined>(undefined);
    const [claimQuantity, setClaimQuantity] = useState<number>(0);
    const [timeLimit, setTimeLimit] = useState<TimeLimitType | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());


    const onNextStepHandler = () => {
        if (quantityType == QuantityType.Limited && claimQuantity == 0) {
            toast.error("Please fill out all required fields");
            return;
        }
        onNext({
            float: float!,
            quantityType: quantityType!,
            claimQuantity: claimQuantity,
            timeLimit: timeLimit!,
            startDate: startDate,
            endDate: endDate
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Configure your float <p className={styles.requiredDot}> *</p></p>
                <div className={styles.selectSection}>
                    <div className={styles.selectCard}>
                        <SelectableCard title="Tradeable" description="This FLOAT can be traded or transferred" selected={float == FloatType.Tradeable} onclick={() => { setFloat(FloatType.Tradeable) }} />
                    </div>
                    <div className={styles.selectCard}>
                        <SelectableCard title="Soulbound" description="This FLOAT cannot be traded" selected={float == FloatType.SoulBound} onclick={() => { setFloat(FloatType.SoulBound) }} />
                    </div>
                </div>
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Cannot be changed later.</p>
                <div className={styles.selectSection}>

                    <div className={styles.selectCard}>
                        <SelectableCard title="Unlimited Quantity" description="Select this if you don't want your FLOAT to have a limited quantity" selected={quantityType == QuantityType.Unlimited} onclick={() => { setQuantityType(QuantityType.Unlimited) }} />
                    </div>
                    <div className={styles.selectCard}>
                        <SelectableCard title="Limited Quantity" description="You can set the maximum number of times the FLOAT can be minted" selected={quantityType == QuantityType.Limited} onclick={() => { setQuantityType(QuantityType.Limited) }} />
                    </div>
                </div>
            </div>
            {quantityType == QuantityType.Limited && (
                <div className={styles.labelValueSection}>
                    <p className={styles.label}>How many can be claimed ?</p>
                    <input placeholder="ex. 100" className={styles.eventInput} type="text" value={claimQuantity} onChange={(e) => setClaimQuantity(+e.target.value)} />
                </div>
            )}
            <div className={styles.labelValueSection}>
                <div className={styles.selectSection}>
                    <div className={styles.selectCard}>
                        <SelectableCard title="No Time Limit" description="Can be minted at any point in the future" selected={timeLimit == TimeLimitType.NoTimeLimit} onclick={() => { setTimeLimit(TimeLimitType.NoTimeLimit) }} />
                    </div>
                    <div className={styles.selectCard}>
                        <SelectableCard title="Time Limit" description="Can only be minted between a specific time interval." selected={timeLimit == TimeLimitType.WithTimeLimit} onclick={() => { setTimeLimit(TimeLimitType.WithTimeLimit) }} />
                    </div>
                </div>
            </div>
            {timeLimit == TimeLimitType.WithTimeLimit && (

                <div className={styles.labelValueSection}>
                    <div className={styles.selectSection}>
                        <div className={styles.selectCard}>
                            <p className={styles.label}>Start (GMT)</p>
                            <input className={styles.dateInput} type="date" value={startDate.toISOString().substring(0, 10)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                        </div>
                        <div className={styles.selectCard}>
                            <p className={styles.label}>End (GMT)</p>
                            <input className={styles.dateInput} type="date" value={endDate.toISOString().substring(0, 10)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.btnSection}>
                <Button
                    color="white"
                    onClick={() => { onBack() }}
                    width="200px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='black'
                    text={"Back"}
                ></Button>
                <Button
                    color="white"
                    onClick={() => { onNextStepHandler() }}
                    width="200px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='#BF3DDB'
                    text={"Next"}
                ></Button>
            </div>
        </div>
    );
};
export default AdvancedSection;
