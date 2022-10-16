import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Avatar, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import styles from './NewFeatureRequestModal.module.scss';
import ludoPhoto from '../../../photos/ludoImg.jpg';
import { useState } from 'react';

export default function TransitionsModal(props: { modalIsOpen: boolean; handleCloseModal: () => void;}) {

  const [status, setStatus] = useState('');
  const handleChangeStatus = (e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <div className={styles.modalContentContainer}>
            <div className={styles.votersSection}>
              <div>
                Voters:
              </div>
              <div className={styles.votersPicsContainer}>
                <Avatar alt="Voters pic" src={ludoPhoto} />
                <Avatar alt="Voters pic" src={ludoPhoto} />
              </div>
            </div>
            <div>
              Status:
              <Select
                labelId="status"
                id="status"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value='assigned'>Assigned</MenuItem>
                <MenuItem value='unassigned'>Unassigned</MenuItem>
                <MenuItem value='done'>Done</MenuItem>
              </Select>
            </div>
            <TextField
              label="Titre"
              variant="filled"
            />
            <TextField
              label="Description"
              variant="filled"
            />
            <div className={styles.submitButtonContainer}>
              <Button variant="contained">Add request</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}