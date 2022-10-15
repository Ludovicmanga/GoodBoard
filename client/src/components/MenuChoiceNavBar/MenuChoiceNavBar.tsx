import React from 'react';
import styles from './MenuChoiceNavBar.module.scss';
import { Button, styled } from '@mui/material';

type Props = {

}

const MenuChoiceNavBar = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} variant="contained">
            <div className={styles.btnText}>
              Vos idées
            </div>
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} variant="contained">
            <div className={styles.btnText}>
                Nos idées
            </div>
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} variant="contained">
            <div className={styles.btnText}>
                Roadmap
            </div>
          </Button>
        </div>
    </div>
  )
}

export default MenuChoiceNavBar