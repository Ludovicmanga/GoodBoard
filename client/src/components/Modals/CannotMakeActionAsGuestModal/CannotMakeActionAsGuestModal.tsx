import { Backdrop, Button, Fade, Modal, Paper } from "@mui/material";
import styles from "./CannotMakeActionAsGuestModal.module.scss";
import React from "react";
import logInImg from "../../../icons/undraw_Join_re_w1lh.png";
import { useNavigate } from "react-router-dom";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const CannotMakeActionAsGuestModal = (props: Props) => {
  const navigate = useNavigate();
  const handleGoToLoginPage = () => {
    navigate('/login');
    props.handleClose();
  }
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
            <div className={styles.imgContainer}>
              <img alt="cannot do action img" src={logInImg} height="170px" />
            </div>
            <div className={styles.infoTextContainer}>
              <div className={styles.infoTextTitle}>Log In to see more</div>
              <p className={styles.infoTextDetails}>
                You need to log in to be able to create, vote, or view the
                details of a feature request
              </p>
              <Button variant='outlined' onClick={handleGoToLoginPage}>Log in</Button>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default CannotMakeActionAsGuestModal;
