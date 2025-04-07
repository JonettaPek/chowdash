import Link from "next/link";
import styles from "../utils/styles";

const navItems = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'About Us',
        url: '/about',
    },
    {
        title: 'Restaurants',
        url: '/restaurants',
    },
    {
        title: 'Popular Foods',
        url: '/foods',
    },
    {
        title: 'Contact Us',
        url: '/contact',
    },
]

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
    return (<div className={`${styles.navItems}`}>
        {navItems.map((item, index) =>(
            <Link
                key={item.url}
                href={item.url}
                className={`${styles.navItem} ${activeItem === index && 'text-yellow-500' }`}
            >
                {item.title}
            </Link>
        ))}
    </div>);
}
 
export default NavItems;