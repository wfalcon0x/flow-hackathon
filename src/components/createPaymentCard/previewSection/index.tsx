
import NftDetail from "@/components/paymentCard/nftDetail";
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import { DiscordIcon, EthIcon, TwitterIcon, WebIcon } from "@/utils/icons";
import Image from "next/image";
import styles from "./index.module.scss";

type Props = {
    onNext: () => void;
    onBack: () => void;
    nftPreview: NftPreview;
};

export interface NftPreview {
    name: string;
    description: string;
    image: string;
    price: number;
    remaining: number;
}

const PreviewSection = ({
    nftPreview,
    onNext,
    onBack
}: Props) => {
    const width = useWindowSize().width;

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

    return (
        <div className={styles.container}>
            <div className={styles.previewCard}>
                <div className={styles.imageSection}>
                    <div className={styles.imgCard}>
                        {nftPreview.image.length > 0 && (

                            <Image
                                src={nftPreview.image}
                                alt=""
                                width={width < 1300 ? 180 : 210}
                                height={width < 1300 ? 160 : 170}
                                className={styles.nftImg}
                            />
                        )}
                    </div>
                    <div className={styles.descriptionSection}>
                        <p className={styles.tryPayGlideText}>{nftPreview.name}</p>
                        <p className={styles.tryPayGlideDescription}>{nftPreview.description}</p>
                        <div className={styles.socialSection}>
                            <Image
                                src={"/socialIcons/floatIcon.png"}
                                alt=""
                                width={35}
                                height={31}
                                style={{ cursor: "pointer", marginRight: 5 }}
                                onClick={openLink}
                            />
                            <TwitterIcon onClick={openTwitter} width={46} height={47} style={{ cursor: "pointer", marginRight: 5 }} />
                            <DiscordIcon onClick={openDiscord} width={50} height={50} style={{ cursor: "pointer", marginRight: 5 }} />
                            <WebIcon onClick={openWeb} width={39} height={38} style={{ cursor: "pointer", marginRight: 5 }} />
                        </div>
                    </div>
                </div>
                <div className={styles.nftDetail}>
                    <NftDetail currency={"FLOW"} onQuantityChange={() => { }} quantity={1} price={nftPreview.price.toString()} remainingQuantity={nftPreview.remaining} />
                </div>
                <div className={styles.breakLine} />
                <div className={styles.firstStepSection}>
                    <div className={styles.payWithCardCard}>
                        <Button
                            color="white"
                            onClick={() => { }}
                            width={width < 1300 ? "100%" : "60%"}
                            height="52px"
                            fontSize={20}
                            fontWeight={300}
                            bgColor='black'
                            text={"Pay with Card"}
                        ></Button>
                    </div>
                    <div className={styles.poweredSection}>
                        <p className={styles.poweredText}>powered by </p>
                        <Image src={"/flowIcon.png"} alt="" width={35} height={31} style={{ marginLeft: 5, marginRight: 5 }} />
                        <p className={styles.poweredText}> PayGlide</p>
                    </div>
                </div>
            </div>
            <div className={styles.btnSection}>
                <Button
                    color="white"
                    onClick={() => { onBack() }}
                    width="200px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='black'
                    text={"Back"}
                ></Button>
                <Button
                    color="white"
                    onClick={() => { onNext() }}
                    width="250px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='#BF3DDB'
                    text={"Create Checkout"}
                    padding="0 1rem"
                ></Button>
            </div>
        </div>
    );
};
export default PreviewSection;
