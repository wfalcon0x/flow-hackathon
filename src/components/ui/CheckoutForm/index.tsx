import {
  PaymentElement
} from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import Loader from '../Loader';
import styles from "./checkout.module.scss";
import Button from '../CustomButton';



type Props = {
  session: string
  onSuccess: (transactionHash: string) => void;
  onBack: () => void;
};


export default function CheckoutForm({
  session,
  onSuccess,
  onBack
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: 'if_required',
    });

    if (error !== undefined && (error.type === "card_error" || error.type === "validation_error")) {
      console.log(error);
      setMessage(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}nft-purchase-session/${session}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? ""
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == "TOKEN_TRANSFER_COMPLETED") {
            setMessage("Payment completed successfully");
            setIsLoading(false);
            clearInterval(interval);
            onSuccess(data.transactionHash);
          }
          if (data.status == "PAYMENT_FAILED") {
            setMessage("Payment failed");
            setIsLoading(false);
            clearInterval(interval);
            onSuccess(data.transactionHash);
          }
          if (data.status == "TOKEN_TRANSFER_FAILED") {
            setMessage("Token transfer failed");
            setIsLoading(false);
            clearInterval(interval);
            onSuccess(data.transactionHash);
          }
        })
        .catch(error => console.error(error));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} className={styles.btnContainer} id="submit">
        {isLoading ? (<Loader />) : (
          <div className={styles.btnsSection} style={{ marginTop: 100 }}>
            <div className={styles.backBtn} onClick={onBack}>
              <p className={styles.backText}>{"Back"}</p>
            </div>
            <div style={{ width: "135px" }}>
              <span className={styles.payBtn} id="button-text">
                Pay now
              </span>

            </div>
          </div>
        )}

      </button>
      {message && <div id="payment-message">{message}</div>}

    </form>
  )
}
