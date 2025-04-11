import { Button } from "@heroui/button";
import styles from "../utils/styles";
import { useRouter } from "next/navigation";

const LoginButton = () => {
    const router = useRouter();
    return (
        <Button
            className={`${styles.loginButton}`}
            radius="full"
            onPress={() => {
                router.push("/login");
            }}
          >
            Log In
        </Button>
    );
}
 
export default LoginButton;