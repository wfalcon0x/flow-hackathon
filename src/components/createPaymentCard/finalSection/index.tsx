
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import { CopyIcon } from "@/utils/icons";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

type Props = {
    name: string;
    img: string;
    url: string;
};
const FinalSection = ({
    img,
    name,
    url
}: Props) => {
    const width = useWindowSize().width;

    return (
        <div className={styles.container}>
            <div className={styles.finalStepTitleSection}>
                <div style={{ marginRight: "1rem" }}>
                    <Image src="/uiIcons/celebrationIcon.png" alt="celebration" width={56} height={57} />
                </div>
                <div>
                    <p className={styles.tryPayGlideTextCongratz} >Congratulations !</p>
                </div>
            </div>
            <p className={styles.subTitle}>You’ve created your first checkout</p>
            <div className={styles.imgCard}>
                <Image
                    src={img}
                    alt="nft"
                    width={width < 551 ? 200 : 240}
                    height={width < 551 ? 160 : 200}
                    className={styles.nftImg}
                />
            </div>
            <p className={styles.nftTitle}>{name}</p>
            <div className={styles.urlSection}>
                <div>
                    <p className={styles.urlText}>{url}</p>
                </div>
                <div>
                    <CopyIcon width={24} height={24} fill={"black"} cursor={"pointer"} onClick={() => { navigator.clipboard.writeText(url); toast.success("Copied") }} />
                </div>
            </div>
            <p className={styles.urlDescription}>Share the link to start accepting card payments
                Currently, you will not be able edit the FLOAT</p>

        </div>
    );
};
export default FinalSection;