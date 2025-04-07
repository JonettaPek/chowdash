'use client'

import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import Link from "next/link";
import styles from "../utils/styles";
import { FormEvent, useState } from "react";

const LoginModal = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) => {


    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{name?: string, password?: string, terms?: string}>({});
    const [submitted, setSubmitted] = useState<{name: string, email:string, password: string, terms: string} | null>(null);

    const getPasswordError = (value: string) => {
        if (value.length < 8) {
          return "Password must be 8 characters or more";
        }
        if ((value.match(/[A-Z]/g) || []).length < 1) {
          return "Password needs at least 1 uppercase letter";
        }
        if ((value.match(/[^a-z]/gi) || []).length < 1) {
          return "Password needs at least 1 symbol";
        }
    
        return null;
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as {name: string, email: string, password: string, terms: string};
        console.log(data)
        // Custom validation checks
        const newErrors: { 
          name: string,
          password: string,
          terms: string } = { 
            name: "",
            password: "",
            terms: "",
          };
    
        // Password validation
        const passwordError = getPasswordError(data.password as string);
    
        if (passwordError) {
          newErrors.password = passwordError;
        }
    
        // Username validation
        if (data.name === "admin") {
          newErrors.name = "Nice try! Choose a different username";
        }
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
    
          return;
        }
    
        if (data.terms !== "true") {
          setErrors((prev) => ({...prev, terms: "Please accept the terms"}));
    
          return;
        }
    
        // Clear errors and submit
        setErrors({ 
          name: "",
          password: "",
          terms: "",
        });
        setSubmitted(data);
    };

    return (
        <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (<>
                    <ModalHeader className="flex flex-col gap-1 items-center">Log In</ModalHeader>
                    <ModalBody>
                        <Form
                            className={`${styles.form}`}
                            validationErrors={errors}
                            onReset={() => setSubmitted(null)}
                            onSubmit={onSubmit}
                            autoComplete="off"
                        >
                            <div className="flex flex-col gap-4 w-[100%]">
                                <Input
                                    isRequired
                                    errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your email";
                                    }
                                    if (validationDetails.typeMismatch) {
                                        return "Please enter a valid email address";
                                    }
                                    }}
                                    label="Email"
                                    labelPlacement="outside"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <Input
                                    isRequired
                                    errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your password";
                                    }
                                    }}
                                    // isInvalid={getPasswordError(password) !== null}
                                    label="Password"
                                    labelPlacement="outside"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <div>
                                    <label className="text-xs">Forgot password? </label>
                                    <Link
                                    key="forgot-password"
                                    href="/forgot-password"
                                    className="text-xs hover:text-yellow-500"
                                    >
                                    reset
                                    </Link>
                                </div>

                                {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

                                <div className="flex gap-4">
                                    <Button type="reset" variant="bordered">
                                    Reset
                                    </Button>
                                    <Button className="w-full" color="primary" type="submit">
                                    Submit
                                    </Button>
                                </div>
                            </div>

                            {submitted && (
                            <div className="text-small text-default-500 mt-4">
                                Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                            </div>
                            )}
                        </Form>
                    </ModalBody>
                    <ModalFooter />
                </>)}
            </ModalContent>
        </Modal>
    );
}
 
export default LoginModal;