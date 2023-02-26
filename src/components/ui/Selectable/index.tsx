
import useWindowSize from "@/hooks/useWindowSize";
import styles from "./index.module.scss";

type Props = {
    title: string;
    description: string;
    selected: boolean;
    onclick: () => void;
};
const SelectableCard = ({
    description,
    onclick,
    selected,
    title
}: Props) => {
    const width = useWindowSize().width;

    return (
        <div
            className={styles.container}
            style={{ border: selected ? "1px solid #BF3DDB" : "none", backgroundColor: selected ? "#BF3DDB21" : "#D9D9D9" }}
            onClick={onclick}
        >
            <p className={styles.titleText} style={{ color: selected ? "#BF3DDB" : "black" }}>{title}</p>
            <p className={styles.description}>{description}</p>
        </div>
    );
};
export default SelectableCard;
