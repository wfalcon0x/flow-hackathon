import styles from "./index.module.scss";
import { BaseSyntheticEvent } from "react";

type Props = {
    text?: React.ReactNode;
    onClick?: () =>
        | void
        | Promise<void>
        | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>);
    secondary?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    padding?: string;
    color?: string;
    fullwidth?: boolean;
    width?: string;
    fontSize?: number;
    boxShadow?: string;
    borderRadius?: number;
    marginTop?: number;
    height?: string;
    bgColor?: string;
    fontWeight?: number;
};

const Button: React.FC<Props> = ({
    text,
    onClick,
    secondary = false,
    disabled = false,
    bordered = false,
    fullwidth = false,
    color,
    padding,
    fontSize,
    boxShadow,
    borderRadius,
    marginTop,
    height,
    bgColor,
    width,
    fontWeight
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: padding ?? "0.75rem 2rem",
                border: bordered ? "2px solid var(--primary-color)" : "none",
                color: color ?? "var(--primary-color)",
                backgroundColor: bgColor ?? "var(--text-color-light)",
                width: width ?? "100%",
                borderRadius: borderRadius ? borderRadius + "px" : "28px",
                fontFamily: "Graphik",
                fontWeight: fontWeight ?? 500,
                fontSize: fontSize ? fontSize + "px" : undefined,
                boxShadow: boxShadow ? boxShadow : "none",
                marginTop: marginTop ? marginTop + "rem" : "0",
                height: height ?? "unset",
                cursor: "pointer",
            }}
            className={styles.btn}
        >
            {text}
        </button>
    );
};

export default Button;
