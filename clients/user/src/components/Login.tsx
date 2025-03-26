'use client'

import { 
  Avatar, 
  Button, 
  Checkbox, 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownSection, 
  DropdownTrigger, 
  Form, 
  Input, 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  useDisclosure 
} from "@heroui/react";
import styles from "../utils/styles";
import { FormEvent, useState } from "react";

const items = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "settings",
    label: "Settings",
  },
  {
    key: "orders",
    label: "Orders",
  },
];

const Login = () => {
  
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<{name: string, email:string, password: string, terms: string} | null>(null);
  const [errors, setErrors] = useState<{name?: string, password?: string, terms?: string}>({});

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
    const data = Object.fromEntries(new FormData(e.currentTarget)) as {name: string, email:string, password: string, terms: string};

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
    <div className={`${styles.profileDropdown}`}>
      {!signedIn && 
        <>
          <Button
            className={`${styles.login}`}
            radius="full"
            onPress={onOpen}
          >
            Log In
          </Button>
          <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 items-center">Log In</ModalHeader>
                  <ModalBody>
                    <Form
                      className={`${styles.form}`}
                      validationErrors={errors}
                      onReset={() => setSubmitted({ 
                        name: "",
                        email: "",
                        password: "",
                        terms: "",
                      })}
                      onSubmit={onSubmit}
                    >
                      <div className="flex flex-col gap-4 max-w-md">
                        <Input
                          isRequired
                          errorMessage={({validationDetails}) => {
                            if (validationDetails.valueMissing) {
                              return "Please enter your name";
                            }

                            return errors.name;
                          }}
                          label="Name"
                          labelPlacement="outside"
                          name="name"
                          placeholder="Enter your name"
                        />

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
                          errorMessage={getPasswordError(password)}
                          isInvalid={getPasswordError(password) !== null}
                          label="Password"
                          labelPlacement="outside"
                          name="password"
                          placeholder="Enter your password"
                          type="password"
                          value={password}
                          onValueChange={setPassword}
                        />
                        <Checkbox
                          isRequired
                          classNames={{
                            label: "text-small",
                          }}
                          isInvalid={!!errors.terms}
                          name="terms"
                          validationBehavior="aria"
                          value="true"
                          onValueChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
                        >
                          I agree to the terms and conditions
                        </Checkbox>

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
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      }
      {signedIn && 
        <Dropdown>
          <DropdownTrigger>
            <Avatar 
              as="button"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"  
              showFallback  
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="light">
            <DropdownSection showDivider items={items}>
              {(item) =>  (
                <DropdownItem
                  key={item.key}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key="logout"
                className={"text-danger"}
              >
                {"Log Out"}
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      }
    </div>
  );
}
 
export default Login;