'use client'
import React from 'react';
import styles from './searchbar.module.css';

const Searchbar = () => {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search current issues"
                className={styles.searchInput}
            />
            <button className={styles.searchButton}>&#128269;</button>
        </div>
    )
}

export default Searchbar;
