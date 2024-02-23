'use client'
import useHttp from '@/hooks/useHttp';
import React, { useEffect, useState } from 'react';
import Ticket from '../IssueTicket/IssueTIcket';
import styles from './main.module.css';

const Main = () => {

    const [issues, setIssues] = useState([]);

    const { sendRequest, error, isLoading } = useHttp();

    const config = {
        method: 'GET',
        url: 'http://localhost:8000/api/issues?skip=1&limit=10'
    }

    const fetchIssues = async () => await sendRequest(config, setIssues);

    const renderIssues = () => {

        return (

            issues.map((itm, idx) => {

                return (
                    <li key={itm.id}>
                        <Ticket
                            title={itm.title}
                            date={itm.createdAt}
                            status={itm.status}
                            desc={itm.description}
                        />
                    </li>
                )
            })
        )
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2>Current issues</h2>
            </div>
            <ul className={styles.ulContainer}>
                {
                    isLoading ? <>Loading...</> :
                        issues.length > 0 && renderIssues()
                }
            </ul>
        </div>
    )
};

export default Main;
