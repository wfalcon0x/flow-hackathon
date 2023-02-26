
import useWindowSize from "@/hooks/useWindowSize";
import { NftType } from "@/types/nftType.type";
import { PurchaseInit } from "@/types/purchaseInit.type";
import { DiscordIcon, FlowIcon, TwitterIcon, WebIcon } from "@/utils/icons";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/CustomButton";
import ConfirmPurchaseDetails from "./confirmPurchaseDetails";
import styles from "./index.module.scss";
import NftDetail from "./nftDetail";

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
    const [purchaseInit, setPurchaseInit] = useState<PurchaseInit | undefined>();
    const [termsChecked, setTermsChecked] = useState(false);
    const [cardWallet, setCardWallet] = useState("4242424242424242");
    const [cardName, setCardName] = useState("Test Name");
    const [cardDate, setCardDate] = useState("02/24");
    const [cardCVC, setCardCVC] = useState("424");
    const [cardPostCode, setCardPostCode] = useState("0000");
    const width = useWindowSize().width;


    const initPayment = () => {

        if (walletAddress.length > 0) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}init-nft-purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? "",
                    'Content-Length': '<calculated when request is sent>'
                },
                body: JSON.stringify({
                    projectId: nft.id,
                    recipient: walletAddress,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    onStepChange(3)
                    setPurchaseInit(data)
                })
                .catch(error => console.error(error));
        }
    }

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
                    <p className={styles.tryPayGlideDescription} style={{ textAlign: "center", width: "100%", marginBottom: "3rem", marginTop: 30 }}>{`Your purchase is now in wallet ${purchaseInit?.recipient}`}</p>
                    <div className={styles.imgCard}>
                        <Image
                            src={nft.image}
                            alt="nft"
                            width={width < 551 ? 200 : 240}
                            height={width < 551 ? 160 : 200}
                            className={styles.nftImg}
                        />
                    </div>
                    <p className={styles.tryText}>{nft.name}</p>
                    <div className={styles.viewFlowScanSection} style={{ cursor: "pointer" }}>
                        <div style={{ marginRight: "1rem", height: "100%", paddingTop: 10 }}>
                            <p className={styles.tryPayGlideDescription} style={{ marginTop: 0, fontWeight: 500 }}>View in flowscan here</p>
                        </div>
                        <div>
                            <Image src="/socialIcons/FlowScanIcon.png" alt="flow" width={51} height={47} />
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
                            text={"Buy Again"}
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
                                width={width < 551 ? 200 : 240}
                                height={width < 551 ? 160 : 200}
                                className={styles.nftImg}
                            />
                        </div>
                        <div className={styles.descriptionSection}>
                            <p className={styles.tryPayGlideText}>{nft.name}</p>
                            <p className={styles.tryPayGlideDescription}>{nft.description}</p>
                            <div className={styles.socialSection}>
                                <FlowIcon width={51} height={47} style={{ cursor: "pointer" }} />
                                <TwitterIcon width={46} height={47} style={{ cursor: "pointer" }} />
                                <DiscordIcon width={50} height={50} style={{ cursor: "pointer" }} />
                                <WebIcon width={39} height={38} style={{ cursor: "pointer" }} />
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
                                    </div>
                                    <div className={styles.poweredSection}>
                                        <p className={styles.poweredText}>powered by PayGlide</p>
                                    </div>
                                </div>
                            )}
                            {step == 2 && (
                                <div className={styles.secondStepSection}>
                                    <p className={styles.stepTitle}>Your NFT will be delivered to this wallet address</p>
                                    <input placeholder="Enter Wallet Address" className={styles.walletInput} type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
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
                            {(!!purchaseInit && step == 3) && (
                                <div className={styles.thirdStepSection}>
                                    <p className={styles.stepTitle}>Enter Card Details</p>
                                    <p className={styles.stepDescription}>You’ll review details before paying</p>
                                    <input placeholder="Cardholder Name" className={styles.walletInput} type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                    <div className={styles.cardsDetail}>
                                        <input placeholder="Card Number" className={styles.cardNumberInput} type="text" value={cardWallet} onChange={(e) => setCardWallet(e.target.value)} />
                                        <input placeholder="MM/YY" className={styles.cardDateInput} type="text" value={cardDate} onChange={(e) => setCardDate(e.target.value)} />
                                        <input placeholder="CVC" className={styles.cardCvcInput} type="text" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} />
                                        <input placeholder="Postcode" className={styles.cardPostcodeInput} type="text" value={cardPostCode} onChange={(e) => setCardPostCode(e.target.value)} />
                                    </div>
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
                    {(step == 4 && !!purchaseInit) && (
                        <>
                            <div className={styles.breakLine} />
                            <div className={styles.fourthStepSection}>
                                <ConfirmPurchaseDetails
                                    purchaseInitDetails={purchaseInit}
                                    termsChecked={termsChecked}
                                    onTermsCheckedChange={(checked) => setTermsChecked(checked)} />

                                <div className={styles.btnsSection}>
                                    <div className={styles.backBtn} onClick={() => onStepChange(3)}>
                                        <p className={styles.backText}>{"< back"}</p>
                                    </div>
                                    <div style={{ width: "30%" }}>
                                        <Button
                                            color="white"
                                            onClick={() => { onStepChange(5); }}
                                            width="100%"
                                            height="52px"
                                            fontSize={20}
                                            fontWeight={300}
                                            bgColor='black'
                                            text={"Pay"}
                                            disabled={!termsChecked}
                                        ></Button>
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
