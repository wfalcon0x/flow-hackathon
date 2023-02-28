
import useWindowSize from "@/hooks/useWindowSize";
import { CopyIcon } from "@/utils/icons";
import Image from "next/image";
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
                {img.length > 0 && (

                    <Image
                        src={img}
                        alt=""
                        width={width < 1300 ? 140 : 240}
                        height={width < 1300 ? 120 : 200}
                        className={styles.nftImg}
                    />
                )}
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
