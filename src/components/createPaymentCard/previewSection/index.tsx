
import NftDetail from "@/components/paymentCard/nftDetail";
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import { DiscordIcon, FlowIcon, TwitterIcon, WebIcon } from "@/utils/icons";
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

    return (
        <div className={styles.container}>
            <div className={styles.previewCard}>
                <div className={styles.imageSection}>
                    <div className={styles.imgCard}>
                        <Image
                            src={nftPreview.image}
                            alt="nft"
                            width={width < 551 ? 200 : 210}
                            height={width < 551 ? 160 : 170}
                            className={styles.nftImg}
                        />
                    </div>
                    <div className={styles.descriptionSection}>
                        <p className={styles.tryPayGlideText}>{nftPreview.name}</p>
                        <p className={styles.tryPayGlideDescription}>{nftPreview.description}</p>
                        <div className={styles.socialSection}>
                            <FlowIcon width={51} height={47} style={{ cursor: "pointer" }} />
                            <TwitterIcon width={46} height={47} style={{ cursor: "pointer" }} />
                            <DiscordIcon width={50} height={50} style={{ cursor: "pointer" }} />
                            <WebIcon width={39} height={38} style={{ cursor: "pointer" }} />
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
                            width={width < 550 ? "100%" : "60%"}
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
