'use client'

import { Button, Checkbox, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import styles from "../utils/styles";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


const LoginModal = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) => {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isTermsSelected, setIsTermsSelected] = useState<boolean>(true);
    const [errors, setErrors] = useState<{email?: string, password?: string, terms?: string}>({});

    const onSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
        e.preventDefault();

        if (!isTermsSelected) {
            return;
        }

        // const data = Object.fromEntries(new FormData(e.currentTarget)) as {email: string, password: string, terms: Terms}; // uncontrolled
        const data = { email, password, termsAccepted: isTermsSelected } // controlled
    
        setErrors({});
        console.log(data);// call api
        setEmail("");
        setPassword("");
        setIsTermsSelected(true);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className={styles.loginModalHeader}>Log In</ModalHeader>
                    <ModalBody>
                        <Form
                            className={`${styles.loginModalForm}`}
                            validationErrors={errors} // validationErrors is used for server-side validation errors
                            onSubmit={(e) => onSubmit(e, onClose)}
                            autoComplete="off"
                        >
                            <div className={styles.loginModalFormInputs}>
                                <Input
                                    isRequired
                                    label="Email"
                                    labelPlacement="outside"
                                    name="email"
                                    placeholder="Enter your email"
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
                                    labelPlacement="outside"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onValueChange={(val) => setPassword(val)}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your password";
                                        }
                                    }}
                                />

                                <div className="flex flex-col gap-2">
                                    <Checkbox 
                                        defaultSelected 
                                        size="sm"
                                        color="primary"
                                        radius="sm"
                                        isSelected={isTermsSelected}
                                        onValueChange={(val) => setIsTermsSelected(val)}
                                    >
                                        I agree to the terms and conditions
                                    </Checkbox>
                                    {!isTermsSelected && <span className={styles.loginModalCustomError}>{"Please accept the terms"}</span>}
                                </div>

                                {Object.entries(errors).map(([key, error]) => <div key={key}><span className={styles.loginModalCustomError}>{error}</span></div>)}

                                <div className={styles.loginModalFormButtons}>
                                    <Button className="w-full" type="reset" variant="bordered">Reset</Button>
                                    <Button className="w-full" color="primary" type="submit">Submit</Button>
                                </div>

                                <div className={styles.loginModalLinks}>
                                    <div>
                                        <label className="text-xs">Forgot password? </label>
                                        <button
                                            onClick={() => {
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
                        <h5 className="text-center font-[500]">Or join with</h5>
                        <div className="flex justify-center gap-4">
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