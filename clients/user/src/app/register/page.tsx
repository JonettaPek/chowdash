'use client'

import RegisterModal from "@/src/components/RegisterModal";
import { useDisclosure } from "@heroui/react";

const RegisterPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (<RegisterModal onOpenChange={onOpenChange} />);
}
 
export default RegisterPage;