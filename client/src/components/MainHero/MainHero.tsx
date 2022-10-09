import React from 'react';
import styles from './MainHero.module.scss';

type Props = {}

const MainHero = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.text}>
            DOTOS
        </div>
    </div>
  )
}

export default MainHero