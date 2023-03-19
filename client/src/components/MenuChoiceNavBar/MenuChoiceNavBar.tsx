import React from 'react';
import styles from './MenuChoiceNavBar.module.scss';
import { Button, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MenuSelected } from '../../helpers/types';
import { setGeneralProperties } from '../../redux/features/generalPropertiesSlice';

type Props = {

}

const MenuChoiceNavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const generalPropertiesState = useAppSelector(state => state.generalProperties);

  return (
    <Paper className={styles.container}>
        <div className={styles.buttonContainer}>
          <NavLink to='/user-feature-requests'>
            <Button
              onClick={() => dispatch(setGeneralProperties({
                menuSelected: MenuSelected.yourIdeas,
              }))}
              className={styles.button}
              variant="contained"
              sx={generalPropertiesState.menuSelected === MenuSelected.yourIdeas ? { backgroundColor: '#0C0454' } : {}}
            >
              <div className={styles.btnText}>
                Your ideas
              </div>
            </Button>
          </NavLink>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink to='/company-feature-requests'>
            <Button
              onClick={() => dispatch(setGeneralProperties({
                menuSelected: MenuSelected.ourIdeas,
              }))}
              className={styles.button}
              variant="contained"
              sx={generalPropertiesState.menuSelected === MenuSelected.ourIdeas ? { backgroundColor: '#0C0454' } : {}}
            >
              <div className={styles.btnText}>
                Our ideas
              </div>
            </Button>
          </NavLink>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink to='/roadmap'>
            <Button
              onClick={() => dispatch(setGeneralProperties({
                menuSelected: MenuSelected.roadmap,
              }))}
              className={styles.button}
              variant="contained"
              sx={generalPropertiesState.menuSelected === MenuSelected.roadmap ? { backgroundColor: '#0C0454' } : {}}
            >
              <div className={styles.btnText}>
                  Roadmap
              </div>
            </Button>
          </NavLink>
        </div>
    </Paper>
  )
}

export default MenuChoiceNavBar