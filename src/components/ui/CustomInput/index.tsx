import { PropsWithChildren } from "react";

import styles from "./index.module.scss";
import PasswordInput from "./PasswordInput";

type CustomProps = {
  label: string;
  inputType: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  withoutInput?: boolean;
  value?: string | number;
  error?: string;
  disabled?: boolean;
};

const CustomInput = (props: PropsWithChildren<CustomProps>) => {
  const {
    label,
    inputType,
    onChange = () => { },
    className,
    withoutInput,
    children,
    value,
    disabled,
    error
  } = props;
  return (
    <>
      <div className={`${styles.formInput} ${className}`}>
        <label className={styles.label}>{label} </label>
        {inputType !== "password" ? (
          !withoutInput && (
            <input
              value={value}
              className={styles.input}
              type={inputType}
              onChange={onChange}
              disabled={disabled}
            />
          )
        ) : (
          <PasswordInput
            onChange={onChange}
            value={typeof value === "string" ? value : ""}
          />
        )}
        {children}
        {!!error && (
          <label className={styles.error}>{error} </label>
        )}
      </div>
    </>
  );
};

export default CustomInput;
