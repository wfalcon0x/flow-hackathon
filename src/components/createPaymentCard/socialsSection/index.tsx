
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import styles from "./index.module.scss";

type Props = {
    onNext: (result: SocialResult) => void;
    onBack: () => void;
};

export interface SocialResult {
    twitter: string;
    webpage: string;
    discord: string;
    walletAddress: string;
}

const SocialsSection = ({
    onNext,
    onBack
}: Props) => {
    const width = useWindowSize().width;
    const [twitter, setTwitter] = useState("");
    const [webpage, setWebpage] = useState("");
    const [discord, setDiscord] = useState("");
    const [walletAddress, setWalletAddress] = useState<string>("");


    return (
        <div className={styles.container}>
            <p className={styles.subTitle}>Socials</p>
            <div className={styles.socialRow}>
                <p className={styles.label}>Twitter</p>
                <div style={{ width: width < 550 ? "60%" : "40%" }}>
                    <input placeholder="ex: @test" className={styles.eventInput} type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
            </div>
            <div className={styles.socialRow}>
                <p className={styles.label}>Webpage</p>
                <div style={{ width: width < 550 ? "60%" : "40%" }}>
                    <input placeholder="Link to Webpage" className={styles.eventInput} type="text" value={webpage} onChange={(e) => setWebpage(e.target.value)} />
                </div>
            </div>
            <div className={styles.socialRow}>
                <p className={styles.label}>Discord</p>
                <div style={{ width: width < 550 ? "60%" : "40%" }}>
                    <input placeholder="Discord Link" className={styles.eventInput} type="text" value={discord} onChange={(e) => setDiscord(e.target.value)} />
                </div>
            </div>
            <p className={styles.subTitle}>Payment</p>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Wallet address to receive FLOW <p className={styles.requiredDot}> *</p></p>
                <input placeholder="Wallet Address" className={styles.eventInput} type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
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
                    onClick={() => {
                        onNext({
                            twitter,
                            webpage,
                            discord,
                            walletAddress
                        })
                    }}
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
