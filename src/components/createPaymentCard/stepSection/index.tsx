
import useWindowSize from "@/hooks/useWindowSize";
import styles from "./index.module.scss";

type Props = {
    step: number;
};
const StepSection = ({
    step
}: Props) => {
    const width = useWindowSize().width;

    return (
        <div className={styles.container}>
            <div className={styles.stepSection}>
                <div className={styles.circle} style={{ backgroundColor: step >= 2 ? "#BF3DDB" : "black" }} />
                <div className={styles.line} style={{ backgroundColor: step >= 3 ? "#BF3DDB" : "black" }} />
                <div className={styles.circle} style={{ backgroundColor: step >= 3 ? "#BF3DDB" : "black" }} />
                <div className={styles.line} style={{ backgroundColor: step >= 4 ? "#BF3DDB" : "black" }} />
                <div className={styles.circle} style={{ backgroundColor: step >= 4 ? "#BF3DDB" : "black" }} />
                <div className={styles.line} style={{ backgroundColor: step >= 5 ? "#BF3DDB" : "black" }} />
                <div className={styles.circle} style={{ backgroundColor: step >= 5 ? "#BF3DDB" : "black" }} />
            </div>
            <div className={styles.textSection}>
                <p className={styles.text}>{
                    step == 2 ? "FLOAT Information"
                        : step == 3 ? "FLOAT Advanced"
                            : step == 4 ? "PayGlide Setup"
                                : "Preview"
                }</p>
            </div>
            <div className={styles.breakLine} />
        </div>
    );
};
export default StepSection;
