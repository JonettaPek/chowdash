'use client'

import { Button, Checkbox, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import styles from "../utils/styles";
import { FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";
import countries from '@/data/countries.json';
import "./register-modal.css";

const RegisterModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void, onOpenChange?: (isOpen: boolean) => void }) => {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<{name: string, flag: string, code: string, dial_code: string}>(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [isTermsSelected, setIsTermsSelected] = useState<boolean>(true);
    const [errors, setErrors] = useState<{email?: string, password?: string, terms?: string}>({});
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isTermsSelected) {
            return;
        }
        
        // const data = Object.fromEntries(new FormData(e.currentTarget)) // uncontrolled
        const data = { name, email, password, phone_number: selectedCountry.dial_code+phoneNumber, termsAccepted: isTermsSelected }; // controlled

        setErrors({});
        console.log(data); // call api
        clearInputs();
        navigateHome();
    }

    const clearInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setIsTermsSelected(true);
    }

    const navigateHome = () => {
        router.push("/")
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={navigateHome} placement="auto">
            <ModalContent>
                {() => (<>
                    <ModalHeader className={styles.loginModalHeader}>Create an account</ModalHeader>
                    <ModalBody>
                        <Form
                            className={`${styles.loginModalForm}`}
                            validationErrors={errors} // validationErrors is used for server-side validation errors
                            onSubmit={onSubmit}
                            autoComplete="off"
                        >
                            <div className={styles.loginModalFormInputs}>
                                <Input
                                    isRequired
                                    label="Name"
                                    name="name"
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
                                    name="email"
                                    type="email"
                                    value={email}
                                    onValueChange={(val) => setEmail(val)}
                                    errorMessage={({validationDetails}) => {
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

                                <Input
                                    isRequired
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    value={confirmPassword}
                                    onValueChange={(val) => setConfirmPassword(val)}
                                    isInvalid={password != confirmPassword}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your password";
                                        }
                                        if (password != confirmPassword) {
                                            return "Passwords don't match";
                                        }
                                    }}
                                    endContent={<PasswordVisibilityToggle isPasswordVisible={isConfirmPasswordVisible} setIsPasswordVisible={setIsConfirmPasswordVisible}/>}
                                />

                                <Input
                                    isRequired
                                    label="Phone Number"
                                    name="phoneNumber"
                                    type="number"
                                    value={phoneNumber}
                                    onValueChange={(val) => setPhoneNumber(val)}
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your phone number";
                                        }
                                        if (validationDetails.typeMismatch) {
                                            return "Please enter a valid phone number";
                                        }
                                    }}
                                    startContent={
                                        <Select
                                            aria-label="country code"
                                            selectionMode="single"
                                            style={{border: "none", background: "transparent", paddingTop: 30}}
                                            startContent={`${selectedCountry.flag} ${selectedCountry.dial_code}`}
                                            items={countries}
                                            selectedKeys={[selectedCountry.code]}
                                            onSelectionChange={(keys) => {
                                                console.log(Array.from(keys)[0])
                                                const selected = countries.find(c => c.code === Array.from(keys)[0])
                                                if (selected) setSelectedCountry(selected)
                                              }}
                                        >
                                            {(country) => (
                                                <SelectItem
                                                    key={country.code} textValue={`${country.code}`}
                                                >
                                                    {`${country.flag} ${country.dial_code}`}
                                                </SelectItem>
                                            )}
                                        </Select>
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