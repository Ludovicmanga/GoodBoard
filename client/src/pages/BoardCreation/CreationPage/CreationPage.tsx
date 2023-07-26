import React from 'react';
import styles from './CreationPage.module.scss';
import { IconButton } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateBoardModal from '../../../components/CreateBoardModal/CreateBoardModal';

type CreationModalProps = {
    setMode: React.Dispatch<React.SetStateAction<"selection" | "creation">>;
  };
  
  export const CreationPage = (props: CreationModalProps) => {
    return (
      <div className={styles.container}>
        <div className={styles.stepBackContainer}>
          <IconButton
            onClick={() => props.setMode("selection")}
            className={styles.stepBackIcon}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <CreateBoardModal />
      </div>
    );
  };