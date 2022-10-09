import React from 'react';
import styles from './MenuChoiceNavBar.module.scss';
import { Button, styled } from '@mui/material';

type Props = {

}

const MenuChoiceNavBar = (props: Props) => {
  return (
    <div className={styles.container}>
        <Button variant="contained">
          Vos idées
        </Button>
        <Button variant="contained">
            Nos idées
        </Button>
        <Button variant="contained">
            Roadmap
        </Button>
    </div>
  )
}

export default MenuChoiceNavBar