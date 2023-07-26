import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from './SwitchBoardModal.module.scss';
import { Paper } from "@mui/material";
import BoardCreation from "../../../../pages/BoardCreation/BoardCreation";

type Props = {
    modalIsOpen: boolean;
    handleClose: () => void;
  };

const SwitchBoardModal = (props: Props) => {
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
                <BoardCreation pageMode='modal' />
              </Paper>
            </Fade>
          </Modal>
        </div>
      );
}

export default SwitchBoardModal