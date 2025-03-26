// '@heroui/react' for CSR and '@heroui/<component>' for SSR

import styles from '@/src/utils/styles';
import * as React from 'react';
import NavItems from '../NavItems';
import Login from '../Login';


const Header = () => {
    return ( 
        <header className={`${styles.header}`}>
            <h1 className={`${styles.logo}`}>ChowDash</h1>
            <NavItems />
            <Login />
        </header>    
    );
}
 
export default Header;