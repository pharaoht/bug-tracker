import styles from './issueticket.module.css';

const Ticket = ({ title, desc, date, status }) => {

    return (
        <div className={styles.container}>
            <div className={styles.ticketContainer}>
                <div className={styles.ticket}>
                    <h3>{title}</h3>
                    <span>{date} Status: {status}</span>
                    <p>{desc}</p>
                </div>
                <div className={styles.corner}></div>
                <div className={styles.corners}></div>
            </div>
        </div>
    )
};

export default Ticket;