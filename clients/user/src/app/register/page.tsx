'use client'

import RegisterModal from "@/src/components/RegisterModal";
import { useDisclosure } from "@heroui/react";
import { useEffect } from "react";

const RegisterPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [])

    return (<RegisterModal isOpen={isOpen} onClose={onClose} />);
}
 
export default RegisterPage;