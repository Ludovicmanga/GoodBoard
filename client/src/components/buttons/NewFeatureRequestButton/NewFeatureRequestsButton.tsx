import { Fab } from '@mui/material';
import React from 'react';
import styles from './NewFeatureRequestsButton.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TransitionsModal from '../../Modals/NewFeatureRequestModal/NewFeatureRequestModal';
import { useEffect } from 'react';

type Props = {}

function NewFeatureRequestsButton({}: Props) {
    const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] = useState(false);
    const handleOpenNewFeatureRequestModal = () => {
        setNewFeatureRequestsModalOpen(true);
    }

    const handleCloseModal = () => {
        setNewFeatureRequestsModalOpen(false);
    }

    useEffect(() => {
      console.log(newFeatureRequestsModalOpen, ' is the open state')
    }, [newFeatureRequestsModalOpen])

  return (
    <>
      <div onClick={handleOpenNewFeatureRequestModal} className={styles.newFeatureRequestButtonContainer}>
        <Fab color="primary" variant="extended">
          <AddIcon sx={{ mr: 1 }} />
          New feature request
        </Fab>
      </div>
      <TransitionsModal modalIsOpen={newFeatureRequestsModalOpen} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default NewFeatureRequestsButton