
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import styles from "./index.module.scss";

type Props = {
    img: string;
};
const NftImageCard = ({
    img
}: Props) => {
    const width = useWindowSize().width;
    return (
        <div className={styles.imgCard}>
            <Image
                src={img}
                alt="nft"
                width={160}
                height={140}
                className={styles.image}
            />
        </div>
    );
};
export default NftImageCard;
