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
  
  const [signedIn, setSignedIn] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  return (
    <div className={`${styles.profileDropdown}`}>
      {!signedIn && 
        <>
          <LoginButton onOpen={onOpen}/>
          <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
      }
      {signedIn && <ProfileDropdown />}
    </div>
  );
}
 
export default UserMenu;