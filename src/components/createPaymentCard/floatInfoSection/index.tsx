
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

type Props = {
    onNext: (result: FloatInfo) => void;
    onBack: () => void;
};

export interface FloatInfo {
    eventName: string;
    description: string;
    image: string;
    price: number;
}
const FloatInfoSection = ({
    onNext,
    onBack
}: Props) => {
    const width = useWindowSize().width;
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(1);
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            };
        }
    };

    const onNextStepHandler = () => {
        if (eventName.length === 0 || price === 0) {
            toast.error("Please fill out all required fields");
            return;
        }
        onNext({
            eventName,
            description,
            image,
            price
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Event Name <p className={styles.requiredDot}> *</p></p>
                <input placeholder="Event Name" className={styles.eventInput} type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Description</p>
                <textarea placeholder="Description" className={styles.descriptionInput} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Image</p>
                <input
                    style={{
                        display: "hidden",
                        width: 0,
                        height: 0,
                    }}
                    id="file"
                    ref={inputFile}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                />
                <div className={styles.imgCardSection}>
                    <div className={styles.imgCard} onClick={() => { inputFile.current?.click() }}>
                        {image.length > 0 && (
                            <Image
                                src={image}
                                alt="nft"
                                width={width < 1300 ? 140 : 221}
                                height={width < 1300 ? 120 : 181}
                                className={styles.nftImg}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Price  <p className={styles.requiredDot}> *</p></p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ width: "30%" }}>
                        <input placeholder="Currency" disabled className={styles.eventInput} type="text" value={"FLOW"} />
                    </div>
                    <div style={{ width: "65%" }}>
                        <input placeholder="Price" className={styles.eventInput} style={{ paddingLeft: "2rem" }} type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
                    </div>
                </div>
                {/* <p className={styles.labelNotice}>Make sure price on the contract is the same</p> */}
            </div>
            {/* <div className={styles.labelValueSection}>
                <p className={styles.label}>Post-Purchase Redirect URL <p className={styles.requiredDot}> *</p></p>
                <input placeholder="Redirect URL" className={styles.eventInput} type="text" value={postPurchaseUrl} onChange={(e) => setPostPurchaseUrl(e.target.value)} />
                <p className={styles.labelNotice}>Users will be redirected to purchase page for failed transactions</p>
            </div> */}
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
                    onClick={() => { onNextStepHandler() }}
                    width="200px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='#BF3DDB'
                    text={"Next"}
                ></Button>
            </div>
        </div>
    );
};
export default FloatInfoSection;
