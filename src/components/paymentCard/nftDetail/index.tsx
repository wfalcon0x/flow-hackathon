
import styles from "./index.module.scss";

type Props = {
    remainingQuantity: number;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    price: string;
    currency: string;
};
const NftDetail = ({
    quantity,
    onQuantityChange,
    price,
    currency,
    remainingQuantity
}: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.quantityRemainingCard}>
                <p className={styles.quantityRemaining}>{`${remainingQuantity > 999 ? `${remainingQuantity.toString().slice(0, -3)},${remainingQuantity.toString().slice(-3)}` : remainingQuantity} remaining`}</p>
            </div>
            <div className={styles.cardsRowSection}>
                <div className={styles.labelValueCard}>
                    <p className={styles.labelText}>Quantity</p>
                    <input disabled className={styles.quantityInput} title="You can only purchase 1 float" type="number" value={quantity} onChange={(e) => onQuantityChange(+e.target.value)} />
                </div>
                <div className={styles.labelValueCard}>
                    <p className={styles.labelText} style={{ marginBottom: "7px" }}>Price</p>
                    <p className={styles.labelValue}>{`${price} ${currency.toUpperCase()}`}</p>
                    <p className={styles.approxValue}>{"≈ $1.20"}</p>
                </div>
                <div className={styles.labelValueCard}>
                    <p className={styles.labelText} style={{ marginBottom: "7px" }}>Price</p>
                    <p className={styles.labelValue}>{`at checkout`}</p>
                </div>
            </div>
        </div>
    );
};
export default NftDetail;
