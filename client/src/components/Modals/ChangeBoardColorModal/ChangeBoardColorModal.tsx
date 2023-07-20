import { Backdrop, Fade, Modal, Paper } from "@mui/material";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import styles from "./ChangeBoardColorModal.module.scss";
import React from 'react';

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ChangeBoardColorModal = (props: Props) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={styles.modalContentContainer}>
            <ChooseBoardColor mode="update" />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangeBoardColorModal;
