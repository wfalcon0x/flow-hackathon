
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
            <p className={styles.quantityRemaining}>{`${remainingQuantity > 999 ? `${remainingQuantity.toString().slice(0, -3)},${remainingQuantity.toString().slice(-3)}` : remainingQuantity} remaining`}</p>
            <div className={styles.labelValueSection}>
                <div>
                    <p className={styles.labelText}>Quantity</p>
                </div>
                <div>
                    <input className={styles.quantityInput} type="number" value={quantity} onChange={(e) => onQuantityChange(+e.target.value)} />
                </div>
            </div>
            <div className={styles.labelValueSection}>
                <div>
                    <p className={styles.labelText}>Price</p>
                </div>
                <div>
                    <p className={styles.labelText}>{`${price} ${currency.toUpperCase()}`}</p>
                </div>
            </div>
            <div className={styles.labelValueSection}>
                <div>
                    <p className={styles.labelText}>Fees</p>
                </div>
                <div>
                    <p className={styles.labelText}>at checkout</p>
                </div>
            </div>
        </div>
    );
};
export default NftDetail;