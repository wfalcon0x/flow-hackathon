
import useWindowSize from "@/hooks/useWindowSize";
import { PaymentSession, PaymentType } from "@/types/paymentDetails.type";
import { AdrressWalletIcon, ConnectWalletIcon, CreateWalletIcon, SelectedAdrressWalletIcon, SelectedConnectWalletIcon, SelectedCreateWalletIcon } from "@/utils/icons";
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
                    <SelectedAdrressWalletIcon width={28} height={28} />
                    :
                    <AdrressWalletIcon width={28} height={28} />
                }
                <p className={[styles.labelText, deliveryType == PaymentType.ADDRESS ? styles.selectedText : ""].join(" ")}>Enter Address</p>
            </div>
            <div className={[styles.selectCard, deliveryType == PaymentType.WALLET ? styles.selectedCard : ""].join(" ")}
                onClick={() => onDeliveryTypeChange(PaymentType.WALLET)}>
                {deliveryType == PaymentType.WALLET ?
                    <SelectedConnectWalletIcon width={28} height={28} />
                    :
                    <ConnectWalletIcon width={28} height={28} />
                }
                <p className={[styles.labelText, deliveryType == PaymentType.WALLET ? styles.selectedText : ""].join(" ")}>Connect Wallet</p>
            </div>
            <div className={[styles.selectCard, deliveryType == PaymentType.CREATE_WALLET ? styles.selectedCard : ""].join(" ")}
                onClick={() => onDeliveryTypeChange(PaymentType.CREATE_WALLET)}>
                {deliveryType == PaymentType.CREATE_WALLET ?
                    <SelectedCreateWalletIcon width={28} height={28} />
                    :
                    <CreateWalletIcon width={28} height={28} />
                }
                <p className={[styles.labelText, deliveryType == PaymentType.CREATE_WALLET ? styles.selectedText : ""].join(" ")}>Create Wallet</p>
            </div>
        </div>
    );
};
export default DeliveryTypeSelectable;