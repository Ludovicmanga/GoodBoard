import React from 'react';
import styles from './MainHero.module.scss';

type Props = {}

const MainHero = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
        </div>
        <div className={styles.text}>
            Nom de l'entreprise
        </div>
        <div className={styles.text}>
            Déscription de l'entreprise
        </div>
    </div>
  )
}

export default MainHero