
import Button from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.scss";

type Props = {
    onLogin: () => void;
};
const LoginPage = ({
    onLogin
}: Props) => {
    const width = useWindowSize().width;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.container}>
            <Image
                src={"/loginLogo.png"}
                alt="login logo"
                width={140}
                height={120}
                style={{ marginBottom: "2rem" }}
            />
            <p className={styles.loginDescription}>Log in to PayGlide to continue</p>
            <CustomInput
                value={email}
                label={"Email Address"}
                inputType={"text"}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <CustomInput
                value={password}
                label={"Password"}
                inputType={"password"}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <Button
                color="white"
                onClick={() => { onLogin() }}
                width="97%"
                height="52px"
                fontSize={20}
                fontWeight={400}
                bgColor='black'
                text={"Continue"}
                borderRadius={10}
                marginTop={3}
            ></Button>
        </div>
    );
};
export default LoginPage;
