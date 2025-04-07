'use client'

import { Button, Checkbox, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import styles from "../utils/styles";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./ShowHideIcon";
import { FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = ({ onOpenChange }: { onOpenChange: () => void }) => {
    
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [isTermsSelected, setIsTermsSelected] = useState<boolean>(true);
    const [errors, setErrors] = useState<{email?: string, password?: string, terms?: string}>({});
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {

    }
    return (
        <Modal isOpen={true} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className={styles.loginModalHeader}>Create an account</ModalHeader>
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
                                    label="Name"
                                    labelPlacement="outside"
                                    name="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    value={name}
                                    onValueChange={(val) => setName(val)}
                                    errorMessage={({validationDetails}) => { // errorMessage is used for real-time client-side validation
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your name";
                                        }
                                    }}
                                />

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
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onValueChange={(val) => setPassword(val)}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your password";
                                        }
                                    }}
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                                        >
                                            {isPasswordVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                />

                                <Input
                                    isRequired
                                    label="Confirm Password"
                                    labelPlacement="outside"
                                    name="confirmPassword"
                                    placeholder="Re-enter your password"
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    value={confirmPassword}
                                    onValueChange={(val) => setConfirmPassword(val)}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your password";
                                        }
                                    }}
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                                        >
                                            {isPasswordVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                />

                                <div className={styles.registerModalTerms}>
                                    <Checkbox 
                                        defaultSelected 
                                        size="sm"
                                        color="primary"
                                        radius="sm"
                                        isSelected={isTermsSelected}
                                        onValueChange={() => setIsTermsSelected((prev) => !prev)}
                                    >
                                        I agree to the terms and conditions
                                    </Checkbox>
                                    {!isTermsSelected && <span className={styles.loginModalCustomError}>{"Please accept the terms"}</span>}
                                </div>

                                {Object.entries(errors).map(([key, error]) => <div key={key}><span className={styles.loginModalCustomError}>{error}</span></div>)}

                                <div className={styles.loginModalFormButtons}>
                                    <Button className="w-full" type="reset" variant="bordered">Clear</Button>
                                    <Button className="w-full" color="primary" type="submit">Register</Button>
                                </div>
                            </div>
                        </Form>
                        <div className={styles.separator}></div>
                        <h5 className={styles.loginModalSocialTitle}>Or join with</h5>
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
 
export default RegisterModal;