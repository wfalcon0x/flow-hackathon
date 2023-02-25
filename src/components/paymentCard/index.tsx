
import { NftType } from "@/types/nftType.type";
import { PurchaseInit } from "@/types/purchaseInit.type";
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
                            <p className={styles.tryPayGlideText} >Congratulations!</p>
                        </div>
                    </div>
                    <p className={styles.tryPayGlideDescription} style={{ textAlign: "center", width: "100%", marginBottom: "3rem" }}>{`Your purchase is now in wallet ${purchaseInit?.recipient}`}</p>
                    <div className={styles.imgCard}>

                    </div>
                    <p className={styles.tryText}>Try PayGlide</p>
                    <div className={styles.viewFlowScanSection} style={{ cursor: "pointer" }}>
                        <div style={{ marginRight: "1rem" }}>
                            <p className={styles.tryPayGlideDescription} style={{ marginTop: 0 }}>View in flowscan here</p>
                        </div>
                        <div>
                            <Image src="/socialIcons/FlowScanIcon.png" alt="flow" width={51} height={47} />
                        </div>
                    </div>
                    <div className={styles.buyAgainBtnSection}>
                        <Button
                            color="white"
                            onClick={() => { alert("Buy Again") }}
                            width="100%"
                            height="60px"
                            fontSize={24}
                            fontWeight={700}
                            bgColor='black'
                            text={"Buy Again"}
                        ></Button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.imageSection}>
                        <div className={styles.imgCard}>

                        </div>
                        <div className={styles.descriptionSection}>
                            <p className={styles.tryPayGlideText}>Try PayGlide</p>
                            <p className={styles.tryPayGlideDescription}>{`Buy ${nft.name.toUpperCase()} NFT direct with card first time ever!`}</p>
                            <div className={styles.socialSection}>
                                <Image src="/socialIcons/FlowScanIcon.png" alt="flow" width={51} height={47} />
                                <Image src="/socialIcons/TwitterIcon.png" alt="twitter" width={46} height={47} />
                                <Image src="/socialIcons/DiscordIcon.png" alt="discord" width={92} height={83} />
                                <Image src="/socialIcons/Webicon.png" alt="web" width={39} height={38} />
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
                                <>
                                    <div className={styles.payWithCardCard}>
                                        <Button
                                            color="white"
                                            onClick={() => { onStepChange(2); }}
                                            width="100%"
                                            height="75px"
                                            fontSize={24}
                                            fontWeight={700}
                                            bgColor='black'
                                            text={"Pay with Card"}
                                        ></Button>
                                    </div>
                                    <div className={styles.poweredSection}>
                                        <p className={styles.poweredText}>powered by PayGlide</p>
                                    </div>
                                </>
                            )}
                            {step == 2 && (
                                <div className={styles.secondStepSection}>
                                    <p className={styles.stepTitle}>Your NFT will be delivered to this wallet address</p>
                                    <input placeholder="Enter Wallet Address" className={styles.walletInput} type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                                    <div className={styles.btnsSection}>
                                        <div className={styles.backBtn} onClick={() => onStepChange(1)}>
                                            <p className={styles.backText}>{"< back"}</p>
                                        </div>
                                        <div style={{ width: "30%" }}>
                                            <Button
                                                color="white"
                                                onClick={() => { initPayment() }}
                                                width="100%"
                                                height="60px"
                                                fontSize={24}
                                                fontWeight={700}
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
                                    <input placeholder="Cardholder Name" className={styles.walletInput} type="text" value={""} onChange={(e) => console.log(e.target.value)} />
                                    <div className={styles.btnsSection}>
                                        <div className={styles.backBtn} onClick={() => onStepChange(2)}>
                                            <p className={styles.backText}>{"< back"}</p>
                                        </div>
                                        <div style={{ width: "30%" }}>
                                            <Button
                                                color="white"
                                                onClick={() => { onStepChange(4); }}
                                                width="100%"
                                                height="60px"
                                                fontSize={24}
                                                fontWeight={700}
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
                                            height="60px"
                                            fontSize={24}
                                            fontWeight={700}
                                            bgColor='black'
                                            text={"Pay"}
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
