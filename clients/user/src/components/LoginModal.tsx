'use client'

import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import styles from "../utils/styles";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";


const LoginModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void, onOpenChange?: (isOpen: boolean) => void }) => {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{email?: string, password?: string, terms?: string}>({});
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
        e.preventDefault();

        // const data = Object.fromEntries(new FormData(e.currentTarget)); // uncontrolled
        const data = { email, password } // controlled
    
        setErrors({});
        console.log(data);// call api
        clearInputs();
        onClose();
    };

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="auto">
            <ModalContent>
                {() => (<>
                    <ModalHeader className={styles.loginModalHeader}>Log In</ModalHeader>
                    <ModalBody>
                        <Form
                            className={`${styles.loginModalForm}`}
                            validationErrors={errors} // validationErrors is used for server-side validation errors
                            onSubmit={(e) => onSubmit(e, onClose)}
                            onReset={clearInputs}
                            autoComplete="off"
                        >
                            <div className={styles.loginModalFormInputs}>
                                <Input
                                    isRequired
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onValueChange={(val) => setEmail(val)}
                                    errorMessage={({validationDetails}) => { // errorMessage is used for real-time client-side validation
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your email";
                                        }
                                        if (validationDetails.typeMismatch) {
                                            return "Please enter a valid email address";
                                        }
                                    }}
                                />
                                
                                <Input
                                    isRequired
                                    label="Password"
                                    name="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onValueChange={(val) => setPassword(val)}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your password";
                                        }
                                    }}
                                    endContent={<PasswordVisibilityToggle isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible}/>}
                                />

                                {Object.entries(errors).map(([key, error]) => <div key={key}><span className={styles.loginModalCustomError}>{error}</span></div>)}

                                <div className={styles.loginModalFormButtons}>
                                    <Button className="w-full" type="reset" variant="bordered">Clear</Button>
                                    <Button className="w-full" color="primary" type="submit">Sign In</Button>
                                </div>

                                <div className={styles.loginModalLinks}>
                                    <div>
                                        <label className="text-xs">Forgot password? </label>
                                        <button
                                            onClick={() => {
                                                clearInputs();
                                                onClose()
                                                router.push("/forgot-password")
                                            }}
                                            type="button"
                                            className={styles.loginModalLink}
                                        >
                                        Reset
                                        </button>
                                    </div>
                                    <div>
                                        <label className="text-xs">Not a user? </label>
                                        <button
                                            onClick={() => {
                                                clearInputs();
                                                onClose()
                                                router.push("/register")
                                            }}
                                            type="button"
                                            className={styles.loginModalLink}
                                        >
                                        Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <div className={styles.separator}></div>
                        <h5 className={styles.loginModalSocialTitle}>Or sign in with</h5>
                        <div className={styles.loginModalSocialIcons}>
                            <a href="https://github.com/jonettapek" target="_blank">
                                <AiFillGithub />
                            </a>
                            <a href="https://www.google.com" target="_blank">
                                <FcGoogle />
                            </a>
                        </div>
                    </ModalBody>
                    <ModalFooter />
                </>)}
            </ModalContent>
        </Modal>
    );
}
 
export default LoginModal;