import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import styles from './NewFeatureRequestModal.module.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props: { modalIsOpen: boolean; handleCloseModal: () => void;}) {
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
          <Box sx={style}>
            <div>Voters: </div>
            <div>Status: </div>
            <TextField id="outlined-basic" variant="outlined" />
            <TextField id="outlined-basic" variant="outlined" />
            <div className={styles.submitButtonContainer}>
              <Button variant="contained">Add request</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}