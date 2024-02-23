import { Sidebar } from '@/components/Sidebar/Sidebar';
import Main from '@/components/Main/Main';
import styles from './page.module.css'

const Home = () => {

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Sidebar />
      </div>
      <div className={styles.rightSide}>
        <Main/>
      </div>
    </div>
  )
}

export default Home;