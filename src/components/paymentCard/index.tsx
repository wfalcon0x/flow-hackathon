
import useWindowSize from "@/hooks/useWindowSize";
import { NftType } from "@/types/nftType.type";
import { CheckoutFormOptions } from "@/types/checkoutFormOptions.type";
import { PaymentDetails, PaymentType } from "@/types/paymentDetails.type";
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
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import OtpField from 'react-otp-field';
import NftImageCard from "../ui/NftCard";
import DeliveryTypeSelectable from "./deliveryType";
import WalletConnectList from "./walletConnectList";

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
    const supabaseClient = useSupabaseClient()
    const [quantity, setQuantity] = useState(1);
    const [walletAddress, setWalletAddress] = useState("");
    const [walletAddressError, setWalletAddressError] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [checkoutFormOptions, setCheckoutFormOptions] = useState<CheckoutFormOptions | undefined>(undefined);
    const width = useWindowSize().width;
    const [transactionHash, setTransactionHash] = useState("");
    const [email, setEmail] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [token, setToken] = useState('');
    const [deliveryType, setDeliveryType] = useState<PaymentType>(PaymentType.ADDRESS);

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

    const handleLogin = async (email: string) => {
        try {
            const { error } = await supabaseClient.auth.signInWithOtp({ email })
            if (error) throw error
            setShowVerification(true)
        } catch (err) {
            const error = err as Error
            setLoginError(error.message)
        }
    }

    const verifyToken = async (token: string) => {
        try {
            setLoading(true)
            const { error: verifyError } = await supabaseClient.auth.verifyOtp({
                email,
                token,
                type: 'magiclink'
            })
            if (verifyError) throw verifyError

            fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ""}api/accounts`).then(async (r) => {
                const account = await r.json();
                console.log(account)
                initNftPurchase(account.address)
            });

        } catch (err) {
            const error = err as Error
            setLoginError(error.message)
            setShowVerification(false)
            setToken('')
            setLoading(false)
        }
    }

    const setTokenAndVerify = async (token: string) => {
        console.log(token)
        setToken(token)
        if (token && token.length === 6) {
            verifyToken(token)
        }
    }

    const initPaymentWithAddress = async () => {
        const recipientValidation = await validateRecipient(walletAddress, nft.host, nft.id);
        console.log(recipientValidation)
        if (recipientValidation.ok) {
            initNftPurchase(walletAddress)
        } else {
            setWalletAddressError(recipientValidation.message)
        }
    }

    const initNftPurchase = async (walletAddress: string) => {
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
                    <p className={styles.tryPayGlideDescription} style={{ textAlign: "center", width: "100%", marginBottom: "1rem" }}>{`Your purchase is now in wallet ${paymentDetails?.session.recipient}`}</p>
                    <NftImageCard img={nft.image} />
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
                <div style={{ height: "75%" }}>
                    <div className={styles.imageSection}>
                        <NftImageCard img={nft.image} />
                        <div className={styles.descriptionSection}>
                            <p className={styles.tryPayGlideText}>{nft.name}</p>
                            <p className={styles.tryPayGlideDescription}>{nft.description}</p>
                            <div className={styles.socialSection}>
                                <div className={styles.socialFloatCard}>
                                    <Image
                                        src={"/socialIcons/float-icon.png"}
                                        alt=""
                                        width={22}
                                        height={22}
                                        className={styles.floatIcon}
                                        onClick={openLink}

                                    />
                                </div>
                                <div className={styles.socialTwitterCard}>
                                    <TwitterIcon onClick={openTwitter} />
                                </div>
                                <div className={styles.socialDiscordCard}>
                                    <DiscordIcon onClick={openDiscord} />
                                </div>
                                <div className={styles.socialWebCard}>
                                    <WebIcon onClick={openWeb} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {step < 4 && (
                        <div style={{ display: "flex", height: "100%", justifyContent: step == 1 ? "space-between" : "flex-start", flexDirection: "column" }}>
                            <div className={styles.nftDetail}>
                                <NftDetail currency={nft.currency} onQuantityChange={setQuantity} quantity={quantity} price={nft.amount} remainingQuantity={nft.remaining} />
                            </div>
                            {step == 1 && (
                                <div className={styles.firstStepSection}>
                                    <div className={styles.payWithCardCard}>
                                        <Button
                                            color="white"
                                            onClick={() => { onStepChange(2); }}
                                            width="100%"
                                            height="50px"
                                            fontSize={17}
                                            fontWeight={700}
                                            bgColor='black'
                                            text={"Pay with Card"}

                                        ></Button>
                                        <div style={{ position: "relative" }}>
                                            <Button
                                                gradientTextColor
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
                                </div>
                            )}
                            {step == 2 && (
                                <div className={styles.secondStepSection}>
                                    {!showVerification ?
                                        <>
                                            <p className={styles.stepTitle}>Delivery Address For NFT:</p>
                                            <DeliveryTypeSelectable deliveryType={deliveryType} onDeliveryTypeChange={(deliv) => setDeliveryType(deliv)} />
                                            {deliveryType == PaymentType.ADDRESS && (
                                                <>
                                                    <p className={styles.stepTitle}>Enter wallet or .find address</p>
                                                    {walletAddressError && <p className={styles.inputError}>{walletAddressError}</p>}
                                                    <input placeholder="" className={styles.walletInput} type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                                                </>
                                            )}
                                            {deliveryType == PaymentType.WALLET && (
                                                <WalletConnectList />
                                            )}
                                            {deliveryType == PaymentType.CREATE_WALLET && (
                                                <>
                                                    <p className={styles.stepTitle}>Create a magic wallet linked to your email</p>
                                                    {loginError && <p className={styles.inputError}>{loginError}</p>}
                                                    <input placeholder="" className={styles.walletInput} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </>
                                            )}
                                            <div className={styles.btnsSection} style={{ marginTop: 100 }}>
                                                <div className={styles.backBtn} onClick={() => onStepChange(1)}>
                                                    <p className={styles.backText}>{"Back"}</p>
                                                </div>
                                                <div style={{ width: "135px" }}>
                                                    <Button
                                                        color="white"
                                                        onClick={() => { email ? handleLogin(email) : initPaymentWithAddress() }}
                                                        width="100%"
                                                        height="50px"
                                                        fontSize={16}
                                                        fontWeight={700}
                                                        bg='linear-gradient(90.19deg, #EB98FD 0.17%, #6AB7FF 52.17%)'
                                                        text={"Next"}
                                                    ></Button>
                                                </div>
                                            </div>
                                        </> : <> {loading ? <span>Loading...</span> :
                                            <>
                                                <p className={styles.stepTitleFont}>Verification Code</p>
                                                <p className={styles.stepTitle}>Please enter the verification code sent to {email}</p>
                                                <div className={styles.otpSection}>
                                                    <OtpField
                                                        value={token}
                                                        onChange={setTokenAndVerify}
                                                        numInputs={6}
                                                        onChangeRegex={/^([0-9]{0,})$/}
                                                        autoFocus
                                                        classNames={styles.otpField}
                                                        separator={<span></span>}
                                                        isTypeNumber
                                                        inputProps={{ className: styles.otpFieldInput, disabled: false }}
                                                    />
                                                </div></>}
                                        </>}
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
                        </div>
                    )}
                    {(step == 4 && !!paymentDetails) && (
                        <>
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
