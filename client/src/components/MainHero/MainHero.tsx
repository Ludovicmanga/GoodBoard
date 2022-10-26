import { Avatar } from '@mui/material';
import React from 'react';
import styles from './MainHero.module.scss';
import asianGirl from '../../photos/asian_girl.jpg';

type Props = {}

const MainHero = (props: Props) => {
  return (
    <div className={styles.container}>
        <Avatar alt="Company logo pic" src={asianGirl} />
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