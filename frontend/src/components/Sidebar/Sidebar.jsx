'use client'
import useHttp from '@/hooks/useHttp'
import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css';

export const Sidebar = () => {

    const [users, setUsers] = useState([]);

    const { sendRequest, error, isLoading } = useHttp();

    const config = {
        method: 'GET',
        url: 'http://localhost:8000/api/users',
    }

    const fetchUsers = async () => await sendRequest(config, setUsers);

    const renderUsers = () => {
        return (
            users.map((itm, idx) => {

                return (
                    <li key={itm.id}>
                        <span>{itm.name}</span>
                    </li>
                )
            })
        )
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2 className={styles.headerText}>Users Contributing</h2>
            </div>

            {isLoading ? <>Loading...</> :
                <ul>
                    {users.length > 0 && renderUsers()}
                </ul>
            }

        </div>
    )
}
