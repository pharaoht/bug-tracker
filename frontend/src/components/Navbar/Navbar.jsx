'use client'
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import Searchbar from '../Searchbar/Searchbar';

export const Navbar = () => {

    const currentPath = usePathname();

    const isLogin = false;

    const renderLinks = () => {

        const links = [
            { label: 'Home', href: '/', },
            { label: 'Dashboard', href: '/dashboard', },
            { label: 'Profile', href: '/profile' },
            { label: 'Login', href: '/login' },
            { label: 'Logout', href: '/logout' }
        ]

        return links.map((itm, idx) => {
            const cssName = currentPath === itm.href ? styles.active : styles.reg;
            return (
                <React.Fragment key={itm.href}>
                    <Link href={itm.href} key={itm.href}>
                        <li className={`${styles.listItem} ${cssName}`}>{itm.label}</li>
                    </Link>
                </React.Fragment>
            )
        })
    }

    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <AiFillBug />
                </Link>
                <div className={styles['logo-container']}>
                    <h4>Bug Tracker</h4>
                </div>
            </div>
            <Searchbar />
            <ul className={styles.ulist}>
                {renderLinks()}
            </ul>
        </nav>
    )
}
