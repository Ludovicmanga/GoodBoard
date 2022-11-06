import { Fab } from '@mui/material';
import React from 'react';
import styles from './NewFeatureRequestsButton.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import FeatureRequestModal from '../../Modals/FeatureRequestModal/FeatureRequestModal';
import { FeatureRequestModalMode } from '../../../helpers/types';

type Props = {}

function NewFeatureRequestsButton({}: Props) {
    const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] = useState(false);
    const handleOpenNewFeatureRequestModal = () => {
        setNewFeatureRequestsModalOpen(true);
    }

    const handleCloseModal = () => {
        setNewFeatureRequestsModalOpen(false);
    }

  return (
    <>
      <div onClick={handleOpenNewFeatureRequestModal} className={styles.newFeatureRequestButtonContainer}>
        <Fab color="primary" variant="extended">
          <AddIcon sx={{ mr: 1 }} />
          New feature request
        </Fab>
      </div>
      <FeatureRequestModal modalMode={FeatureRequestModalMode.creation} modalIsOpen={newFeatureRequestsModalOpen} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default NewFeatureRequestsButton