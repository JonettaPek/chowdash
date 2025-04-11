'use client'

import LoginModal from "@/src/components/LoginModal";
import { useDisclosure } from "@heroui/react";
import { useEffect } from "react";

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (<LoginModal isOpen={isOpen} onClose={onClose}/>);
}
 
export default Login;