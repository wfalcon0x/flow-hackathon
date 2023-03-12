
import useWindowSize from "@/hooks/useWindowSize";
import { PaymentSession, PaymentType } from "@/types/paymentDetails.type";
import { AdrressWalletIcon, ConnectWalletIcon, CreateWalletIcon, SelectedAdrressWalletIcon } from "@/utils/icons";
import styles from "./index.module.scss";

type Props = {
    deliveryType: PaymentType;
    onDeliveryTypeChange: (deliveryType: PaymentType) => void;
};
const DeliveryTypeSelectable = ({
    deliveryType,
    onDeliveryTypeChange
}: Props) => {
    return (
        <div className={styles.container}>
            <div className={[styles.selectCard, deliveryType == PaymentType.ADDRESS ? styles.selectedCard : ""].join(" ")}
                onClick={() => onDeliveryTypeChange(PaymentType.ADDRESS)}
            >
                {deliveryType == PaymentType.ADDRESS ?
                    <SelectedAdrressWalletIcon width={28} height={28} className={deliveryType == PaymentType.ADDRESS ? styles.selectedIcon : ""} />
                    :
                    <AdrressWalletIcon width={28} height={28} />
                }
                <p className={[styles.labelText, deliveryType == PaymentType.ADDRESS ? styles.selectedText : ""].join(" ")}>Enter Address</p>
            </div>
            <div className={[styles.selectCard, deliveryType == PaymentType.WALLET ? styles.selectedCard : ""].join(" ")}
                onClick={() => onDeliveryTypeChange(PaymentType.WALLET)}>
                <ConnectWalletIcon width={28} height={28} className={deliveryType == PaymentType.WALLET ? styles.selectedIcon : ""} />
                <p className={[styles.labelText, deliveryType == PaymentType.WALLET ? styles.selectedText : ""].join(" ")}>Connect Wallet</p>
            </div>
            <div className={[styles.selectCard, deliveryType == PaymentType.CREATE_WALLET ? styles.selectedCard : ""].join(" ")}
                onClick={() => onDeliveryTypeChange(PaymentType.CREATE_WALLET)}>
                <CreateWalletIcon width={28} height={28} className={deliveryType == PaymentType.CREATE_WALLET ? styles.selectedIcon : ""} />
                <p className={[styles.labelText, deliveryType == PaymentType.CREATE_WALLET ? styles.selectedText : ""].join(" ")}>Create Wallet</p>
            </div>
        </div>
    );
};
export default DeliveryTypeSelectable;