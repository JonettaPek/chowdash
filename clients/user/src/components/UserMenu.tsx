'use client'

import styles from "../utils/styles";
import { useState } from "react";
import LoginButton from "./LoginButton";
import ProfileDropdown from "./ProfileDropdown";



const UserMenu = () => {
  
  const [signedIn, setSignedIn] = useState<boolean>(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <div className={`${styles.userMenu}`}>
      {!signedIn && <LoginButton />}
      {signedIn && <ProfileDropdown />}
    </div>
  );
}
 
export default UserMenu;