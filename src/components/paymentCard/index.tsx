
import useWindowSize from "@/hooks/useWindowSize";
import { NftType } from "@/types/nftType.type";
import { CheckoutFormOptions } from "@/types/checkoutFormOptions.type";
import { PaymentDetails } from "@/types/paymentDetails.type";
import { DiscordIcon, EthIcon, FlowIcon, TwitterIcon, WebIcon } from "@/utils/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../ui/CustomButton";
import ConfirmPurchaseDetails from "./confirmPurchaseDetails";
import styles from "./index.module.scss";
import NftDetail from "./nftDetail";
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../ui/CheckoutForm";
import { toast } from "react-toastify";
import { validateRecipient } from "@/utils/check-recipient";

type Props = {
    step: number;
    onStepChange: (step: number) => void;
    nft: NftType;
};
const PaymentCard = ({
    step,
    onStepChange,
    nft,
}: Props) => {
    const [quantity, setQuantity] = useState(1);
    const [walletAddress, setWalletAddress] = useState("");
    const [walletAddressError, setWalletAddressError] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [checkoutFormOptions, setCheckoutFormOptions] = useState<CheckoutFormOptions | undefined>(undefined);
    const width = useWindowSize().width;
    const [showPopup, setShowPopup] = useState(false)
    const [transactionHash, setTransactionHash] = useState("")

    const openTwitter = () => {
        window.open('https://twitter.com/payglide', '_blank');
    }
    const openDiscord = () => {
        window.open('https://discord.gg/Ff328bUvdN', '_blank');
    }
    const openWeb = () => {
        window.open('https://payglide.xyz/', '_blank');
    }
    const openLink = () => {
        window.open('https://testnet.floats.city/0xad6aa3b3eb3a0dd3/event/136396920', '_blank');
    }

    const openYourTransaction = () => {
        window.open(`https://testnet.flowscan.org/transaction/${transactionHash}`, '_blank');
    }

    const initStripe = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}config`).then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }

    const initPayment = async () => {
        const recipientValidation = await validateRecipient(walletAddress, nft.host, nft.id);
        console.log(recipientValidation)
        if (recipientValidation.ok) {
            setWalletAddressError("")
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}init-nft-purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'payglide-api-key': process.env.NEXT_PUBLIC_API_KEY ?? "",
                },
                body: JSON.stringify({
                    projectId: nft.id,
                    recipient: walletAddress,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    onStepChange(4)
                    setPaymentDetails(data)
                    const options = {
                        clientSecret: data?.provider.clientSecret,
                        appearance: {
                            theme: 'flat',
                            variables: {
                                fontFamily: ' "Gill Sans", sans-serif',
                                fontLineHeight: '1.5',
                                borderRadius: '10px',
                                colorBackground: '#F6F8FA',
                                colorPrimaryText: '#262626'
                            },
                            rules: {
                                '.Block': {
                                    backgroundColor: 'var(--colorBackground)',
                                    boxShadow: 'none',
                                    padding: '12px'
                                },
                                '.Input': {
                                    padding: '12px'
                                },
                                '.Input:disabled, .Input--invalid:disabled': {
                                    color: 'lightgray'
                                },
                                '.Tab': {
                                    padding: '10px 12px 8px 12px',
                                    border: 'none'
                                },
                                '.Tab:hover': {
                                    border: 'none',
                                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
                                },
                                '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
                                    border: 'none',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
                                },
                                '.Label': {
                                    fontWeight: '500'
                                },
                                '.button-text': {
                                    backgroundColor: 'var(--colorPrimaryText)',
                                    color: 'white',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
                                },
                            }
                        },
                    };
                    console.log(options)
                    setCheckoutFormOptions(options)
                })
                .catch(error => console.error(error));
        } else {
            setWalletAddressError(recipientValidation.message)
        }
    }

    useEffect(() => {
        initStripe();
    }, []);

    return (
        <div className={styles.card}>
            {step == 5 ? (
                <div className={styles.finalStepSection}>
                    <div className={styles.finalStepTitleSection}>
                        <div style={{ marginRight: "1rem" }}>
                            <Image src="/uiIcons/celebrationIcon.png" alt="celebration" width={56} height={57} />
                        </div>
                        <div>
                            <p className={styles.tryPayGlideTextCongratz} >Congratulations!</p>
                        </div>
                    </div>
                    <p className={styles.tryPayGlideDescription} style={{ textAlign: "center", width: "100%" }}>{`Your purchase is now in wallet ${paymentDetails?.session.recipient}`}</p>
                    <div className={styles.imgCard}>
                        <Image
                            src={nft.image}
                            alt="nft"
                            width={width < 1300 ? 140 : 240}
                            height={width < 1300 ? 120 : 200}
                            className={styles.nftImg}
                        />
                    </div>
                    <p className={styles.tryText}>{nft.name}</p>
                    <div className={styles.viewFlowScanSection} style={{ cursor: "pointer" }}>
                        <div style={{ marginRight: "1rem", height: "100%", paddingTop: 10 }}>
                            <p className={styles.tryPayGlideDescription} style={{ marginTop: 0, fontWeight: 500 }}>View in flowscan here</p>
                        </div>
                        <div>
                            <Image src="/flowIconImage.png" style={{ cursor: "pointer" }} alt="flow" width={51} height={47} onClick={openYourTransaction} />
                        </div>
                    </div>
                    <div className={styles.buyAgainBtnSection}>
                        <Button
                            color="white"
                            onClick={() => { onStepChange(1) }}
                            width="70%"
                            height="52px"
                            fontSize={20}
                            fontWeight={300}
                            bgColor='black'
                            text={"Return"}
                        ></Button>
                    </div>
                </div>
            ) : (
                <div style={{ height: "55%" }}>
                    <div className={styles.imageSection}>
                        <div className={styles.imgCard}>
                            <Image
                                src={nft.image}
                                alt="nft"
                                width={width < 1300 ? 140 : 240}
                                height={width < 1300 ? 120 : 200}
                                className={styles.nftImg}
                            />
                        </div>
                        <div className={styles.descriptionSection}>
                            <p className={styles.tryPayGlideText}>{nft.name}</p>
                            <p className={styles.tryPayGlideDescription}>{nft.description}</p>
                            <div className={styles.socialSection}>
                                <Image
                                    src={"/socialIcons/floatIcon.png"}
                                    alt=""
                                    width={51}
                                    height={47}
                                    style={{ cursor: "pointer", marginRight: 5 }}
                                    onClick={openLink}

                                />
                                <TwitterIcon onClick={openTwitter} width={40} height={41} style={{ cursor: "pointer", marginRight: 5 }} />
                                <DiscordIcon onClick={openDiscord} width={45} height={45} style={{ cursor: "pointer", marginRight: 5 }} />
                                <WebIcon onClick={openWeb} width={40} height={39} style={{ cursor: "pointer", marginRight: 5 }} />
                            </div>
                        </div>
                    </div>
                    {step < 4 && (
                        <>
                            <div className={styles.nftDetail}>
                                <NftDetail currency={nft.currency} onQuantityChange={setQuantity} quantity={quantity} price={nft.amount} remainingQuantity={nft.remaining} />
                            </div>
                            <div className={styles.breakLine} />
                            {step == 1 && (
                                <div className={styles.firstStepSection}>
                                    <div className={styles.payWithCardCard}>
                                        <Button
                                            color="white"
                                            onClick={() => { onStepChange(2); }}
                                            width="100%"
                                            height="52px"
                                            fontSize={20}
                                            fontWeight={300}
                                            bgColor='black'
                                            text={"Pay with Card"}
                                        ></Button>
                                        <div style={{ position: "relative" }}>
                                            <Button
                                                color="white"
                                                onClick={() => { toast.error("Coming Soon") }}
                                                width="100%"
                                                height="52px"
                                                fontSize={20}
                                                fontWeight={300}
                                                bgColor='#989898'
                                                text={"Pay with Crypto"}
                                                marginTop={2}
                                            ></Button>
                                        </div>
                                    </div>
                                    <div className={styles.poweredSection}>
                                        <p className={styles.poweredText}>powered by </p>
                                        <Image src={"/flowIcon.png"} alt="" width={35} height={31} style={{ marginLeft: 5, marginRight: 5 }} />
                                        <p className={styles.poweredText}> PayGlide</p>
                                    </div>
                                </div>
                            )}
                            {step == 2 && (
                                <div className={styles.secondStepSection}>
                                    <p className={styles.stepTitle}>Your NFT will be delivered to this wallet address</p>
                                    <p className={styles.inputError}>{walletAddressError}</p>
                                    <input placeholder="Enter wallet or .find address" className={styles.walletInput} type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                                    <div className={styles.btnsSection} style={{ marginTop: 100 }}>
                                        <div className={styles.backBtn} onClick={() => onStepChange(1)}>
                                            <p className={styles.backText}>{"< back"}</p>
                                        </div>
                                        <div style={{ width: width < 550 ? "40%" : "30%" }}>
                                            <Button
                                                color="white"
                                                onClick={() => { initPayment() }}
                                                width="100%"
                                                height="52px"
                                                fontSize={20}
                                                fontWeight={300}
                                                bgColor='black'
                                                text={"Next"}
                                            ></Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(!!paymentDetails && step == 3) && (
                                <div className={styles.thirdStepSection}>
                                    {/* <p className={styles.stepTitle}>Enter Card Details</p>
                                    <p className={styles.stepDescription}>You’ll review details before paying</p>
                                    <>
                                        {checkoutFormOptions?.clientSecret && stripePromise && (
                                            <Elements stripe={stripePromise} options={checkoutFormOptions}>
                                                <CheckoutForm />
                                            </Elements>
                                        )}
                                    </> */}
                                    {/* <input placeholder="Cardholder Name" className={styles.walletInput} type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                    <div className={styles.cardsDetail}>
                                        <input placeholder="Card Number" className={styles.cardNumberInput} type="text" value={cardWallet} onChange={(e) => setCardWallet(e.target.value)} />
                                        <input placeholder="MM/YY" className={styles.cardDateInput} type="text" value={cardDate} onChange={(e) => setCardDate(e.target.value)} />
                                        <input placeholder="CVC" className={styles.cardCvcInput} type="text" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} />
                                        <input placeholder="Postcode" className={styles.cardPostcodeInput} type="text" value={cardPostCode} onChange={(e) => setCardPostCode(e.target.value)} />
                                    </div> */}
                                    <div className={styles.btnsSection}>
                                        <div className={styles.backBtn} onClick={() => onStepChange(2)}>
                                            <p className={styles.backText}>{"< back"}</p>
                                        </div>
                                        <div style={{ width: width < 551 ? "40%" : "30%" }}>
                                            <Button
                                                color="white"
                                                onClick={() => { onStepChange(4); }}
                                                width="100%"
                                                height="52px"
                                                fontSize={20}
                                                fontWeight={300}
                                                bgColor='black'
                                                text={"Review"}
                                            ></Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {(step == 4 && !!paymentDetails) && (
                        <>
                            <div className={styles.breakLine} style={{ marginTop: "2rem" }} />
                            <div className={styles.fourthStepSection}>
                                <ConfirmPurchaseDetails
                                    purchaseInitDetails={paymentDetails.session}
                                    termsChecked={termsChecked}
                                    onTermsCheckedChange={(checked) => setTermsChecked(checked)} />
                                <p className={styles.stepTitle}>Enter Card Details</p>
                                <p className={styles.stepDescription}>You’ll review details before paying</p>
                                <>
                                    {checkoutFormOptions?.clientSecret && stripePromise && (
                                        <Elements stripe={stripePromise} options={checkoutFormOptions}>
                                            <CheckoutForm session={paymentDetails.session.id} onSuccess={(transactionHash) => { onStepChange(5); setTransactionHash(transactionHash) }} />
                                        </Elements>
                                    )}
                                </>
                                <div className={styles.btnsSection}>
                                    <div className={styles.backBtn} onClick={() => onStepChange(2)}>
                                        <p className={styles.backText}>{"< back"}</p>
                                    </div>
                                    <div style={{ width: "30%" }}>
                                        {/* <Button
                                            color="white"
                                            onClick={() => { onStepChange(5); }}
                                            width="100%"
                                            height="52px"
                                            fontSize={20}
                                            fontWeight={300}
                                            bgColor='black'
                                            text={"Pay"}
                                            disabled={!termsChecked}
                                        ></Button> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

        </div>
    );
};
export default PaymentCard;
