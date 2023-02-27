
import useWindowSize from "@/hooks/useWindowSize";
import { PaymentSession } from "@/types/paymentDetails.type";
import styles from "./index.module.scss";

type Props = {
    purchaseInitDetails: PaymentSession;
    termsChecked: boolean;
    onTermsCheckedChange: (checked: boolean) => void;
};
const ConfirmPurchaseDetails = ({
    purchaseInitDetails,
    onTermsCheckedChange,
    termsChecked
}: Props) => {
    const width = useWindowSize().width;
    return (
        <div className={styles.card}>
            <div style={{ width: width < 551 ? "100%" : "80%", fontFamily: "NeueMontreal" }}>
                <p className={styles.confirmText}>Confirm Purchase</p>
                <div className={styles.labelValueRow}>
                    <div>
                        <p className={styles.label} style={{ fontSize: 16 }}>{purchaseInitDetails.quote.total.description}</p>
                    </div>
                    <div>
                        <p className={styles.value} style={{ fontSize: 16 }}>{`${purchaseInitDetails.quote.total.currency == "USD" ? "$" : ""}${purchaseInitDetails.quote.total.amount}`}</p>
                    </div>
                </div>
                {purchaseInitDetails.quote.details.map((item, index) => {
                    return (
                        <div key={index} className={styles.labelValueRow}>
                            <div>
                                <p className={styles.label}>{item.description}</p>
                            </div>
                            <div>
                                <p className={styles.value}>{`${item.currency == "USD" ? "$" : ""}${item.amount}`}</p>
                            </div>
                        </div>
                    );
                })}
                <div className={styles.labelValueRow} style={{ paddingLeft: 0, marginTop: "3rem", marginBottom: "4rem" }}>
                    <div>
                        <p className={styles.label} style={{ fontWeight: 700 }}>Delivery Address:</p>
                    </div>
                    <div>
                        <p className={styles.value}>{purchaseInitDetails.recipient}</p>
                    </div>
                </div>
            </div>
            <div className={styles.checkBoxSection}>
                <div>
                    <input type="checkbox" className={styles.checkboxInput} checked={termsChecked} onChange={(event) => onTermsCheckedChange(event.target.checked)} />
                </div>
                <div>
                    <p className={styles.terms}>I understant that this is a non-refundable digital good and accept the <p className={styles.termsLinkText}>Terms of Service</p></p>
                </div>
            </div>

        </div>
    );
};
export default ConfirmPurchaseDetails;