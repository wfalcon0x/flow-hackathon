
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import styles from "./index.module.scss";

type Props = {
    onNext: () => void;
    onBack: () => void;
};
const SocialsSection = ({
    onNext,
    onBack
}: Props) => {
    const width = useWindowSize().width;
    const [twitter, setTwitter] = useState("");
    const [webpage, setWebpage] = useState("");
    const [discord, setDiscord] = useState("");


    return (
        <div className={styles.container}>
            <div className={styles.socialRow}>
                <p className={styles.label}>Twitter</p>
                <div style={{ width: "40%" }}>
                    <input placeholder="ex: @test" className={styles.eventInput} type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
            </div>
            <div className={styles.socialRow}>
                <p className={styles.label}>Webpage</p>
                <div style={{ width: "40%" }}>
                    <input placeholder="Link to Webpage" className={styles.eventInput} type="text" value={webpage} onChange={(e) => setWebpage(e.target.value)} />
                </div>
            </div>
            <div className={styles.socialRow}>
                <p className={styles.label}>Discord</p>
                <div style={{ width: "40%" }}>
                    <input placeholder="Discord Link" className={styles.eventInput} type="text" value={discord} onChange={(e) => setDiscord(e.target.value)} />
                </div>
            </div>
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
                    onClick={() => { onNext() }}
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
export default SocialsSection;
