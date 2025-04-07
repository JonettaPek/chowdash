// '@heroui/react' for CSR and '@heroui/<component>' for SSR

import styles from '@/src/utils/styles';
import * as React from 'react';
import NavItems from '../NavItems';
import UserMenu from '../UserMenu';


const Header = () => {
    return ( 
        <header className={`${styles.header}`}>
            <h1 className={`${styles.logo}`}>ChowDash</h1>
            <NavItems />
            <UserMenu />
        </header>    
    );
}
 
export default Header;