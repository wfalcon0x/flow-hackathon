import { HidePasswordIcon, ShowPasswordIcon } from "@/utils/icons";
import { useState } from "react";

import styles from "./index.module.scss";

type PasswordInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const PasswordInput = (props: PasswordInputProps) => {
  const { onChange, value } = props;
  const [visible, setVisible] = useState(false);

  const onEyeClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <input
        value={value}
        className={styles.input}
        onChange={onChange}
        type={visible ? "text" : "password"}
      />
      {visible ? (
        <div className={styles.icon} onClick={onEyeClick}>
          <ShowPasswordIcon className={styles.passIcon} />
        </div>
      ) : (
        <div className={styles.icon} onClick={onEyeClick}>
          <HidePasswordIcon className={styles.passIcon} />
        </div>
      )}
    </>
  );
};

export default PasswordInput;
