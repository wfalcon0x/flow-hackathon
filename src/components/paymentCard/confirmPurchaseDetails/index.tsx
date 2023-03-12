
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
            <div style={{ width: "100%", fontFamily: "NeueMontreal" }}>
                <p className={styles.confirmText}>Confirm Purchase</p>
                <div className={styles.labelValueRow}>
                    <div>
                        <p className={styles.totalText}>{purchaseInitDetails.quote.total.description}</p>
                    </div>
                    <div>
                        <p className={styles.totalText} style={{ paddingRight: "1rem" }}>{`${purchaseInitDetails.quote.total.currency == "USD" ? "$ " : ""}${purchaseInitDetails.quote.total.amount}`}</p>
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
                <div className={styles.labelValueRow} style={{ paddingLeft: 0, marginTop: "1.5rem", marginBottom: "1rem", border: "none" }}>
                    <div>
                        <p className={styles.deliveryLabel} >Delivery Address</p>
                    </div>
                    <div>
                        <p className={styles.deliveryValue}>{purchaseInitDetails.recipient}</p>
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