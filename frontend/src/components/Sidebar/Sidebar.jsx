'use client'
import useHttp from '@/hooks/useHttp'
import React, { useEffect, useState } from 'react'

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
        <div className=''>
            <h2>Users contributing</h2>
            <ul>
                {users.length > 0 && renderUsers()}
            </ul>
        </div>
    )
}
