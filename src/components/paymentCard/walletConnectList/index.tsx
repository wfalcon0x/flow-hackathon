
import Image from "next/image";
import styles from "./index.module.scss";

type Props = {
};
const WalletConnectList = ({
}: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.cardRow}>
                <div className={styles.card}>
                    <Image src={"/walletSocials/payglide-img.png"} alt="" width={78} height={15} />
                </div>
                <div className={styles.card}>
                    <Image src={"/walletSocials/lilico-img.png"} alt="" width={59} height={20} />
                </div>
                <div className={styles.card}>
                    <Image src={"/walletSocials/blocto-img.png"} alt="" width={55} height={19} />
                </div>
            </div>
            <div className={styles.cardRow}>
                <div className={styles.card}>
                    <Image src={"/walletSocials/flipper-img.png"} alt="" width={78} height={15} />
                </div>
                <div className={styles.card}>
                    <Image src={"/walletSocials/nufi-img.png"} alt="" width={63} height={22} />
                </div>
                <div className={styles.card}>
                    <Image src={"/walletSocials/dapper-img.png"} alt="" width={71} height={24} />
                </div>
            </div>
        </div>
    );
};
export default WalletConnectList;