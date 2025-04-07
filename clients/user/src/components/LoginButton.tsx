import { Button, PressEvent } from "@heroui/react";
import styles from "../utils/styles";

const LoginButton = ({ onOpen }: { onOpen: (e: PressEvent) => void}) => {
    return (
        <Button
            className={`${styles.login}`}
            radius="full"
            onPress={onOpen}
          >
            Log In
        </Button>
    );
}
 
export default LoginButton;