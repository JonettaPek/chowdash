'use client'

import {
  useDisclosure 
} from "@heroui/react";
import styles from "../utils/styles";
import { useState } from "react";
import LoginModal from "./LoginModal";
import LoginButton from "./LoginButton";
import ProfileDropdown from "./ProfileDropdown";



const UserMenu = () => {
  
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <div className={`${styles.userMenu}`}>
      {!signedIn && 
        <>
          <LoginButton onOpen={onOpen}/>
          <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
      }
      {signedIn && <ProfileDropdown />}
    </div>
  );
}
 
export default UserMenu;