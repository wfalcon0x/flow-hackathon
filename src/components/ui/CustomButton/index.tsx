import { BaseSyntheticEvent } from "react";
import styles from "./index.module.scss";

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
    border?: string;
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
    fontWeight,
    border
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: padding ?? "0.75rem 2rem",
                border: border ? border : "none",
                color: color ?? "var(--primary-color)",
                backgroundColor: bgColor ?? "var(--text-color-light)",
                width: width ?? "100%",
                borderRadius: borderRadius ? borderRadius + "px" : "28px",
                fontFamily: "NeueMontreal",
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
