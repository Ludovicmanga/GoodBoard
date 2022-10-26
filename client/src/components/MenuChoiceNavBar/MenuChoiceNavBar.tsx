import React from 'react';
import styles from './MenuChoiceNavBar.module.scss';
import { Button, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

type Props = {

}

const MenuChoiceNavBar = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <NavLink to='/'>
            <Button className={styles.button} variant="contained">
              <div className={styles.btnText}>
                Vos idées
              </div>
            </Button>
          </NavLink>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink to='/'>
            <Button className={styles.button} variant="contained">
              <div className={styles.btnText}>
                Nos idées
              </div>
            </Button>
          </NavLink>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink to='/roadmap'>
            <Button className={styles.button} variant="contained">
              <div className={styles.btnText}>
                  Roadmap
              </div>
            </Button>
          </NavLink>
        </div>
    </div>
  )
}

export default MenuChoiceNavBar