
import useWindowSize from "@/hooks/useWindowSize";
import { TimerIcon } from "@/utils/icons";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

type Props = {
    onTimeReset: () => void;
};
const TimerFetch = ({
    onTimeReset
}: Props) => {
    const width = useWindowSize().width;
    const [time, setTime] = useState<number>(5);


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (time === 0) {
            // Send request here
            console.log('Request sent!');
            onTimeReset();
            setTime(5);
        }
    }, [time]);


    return (
        <div className={styles.container}>
            <div className={styles.timerContainer}>
                <TimerIcon width={9} height={10} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <p className={styles.timerText}>Quote refreshes in {time} secs</p>
            </div>
        </div>
    );
};
export default TimerFetch;
