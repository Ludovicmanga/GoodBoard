import { Backdrop, Button, Fade, Modal, Paper } from "@mui/material";
import styles from "./CannotMakeActionAsGuestModal.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logInImg } from "../../../helpers/constants";
import ModalTemplate from "../ModalTemplate/ModalTemplate";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const CannotMakeActionAsGuestModal = (props: Props) => {
  const navigate = useNavigate();
  const handleGoToLoginPage = () => {
    navigate("/login");
    props.handleClose();
  };
  return (
    <ModalTemplate {...props}>
      <div className={styles.imgContainer}>
        <img alt="cannot do action img" src={logInImg} height="170px" />
      </div>
      <div className={styles.infoTextContainer}>
        <div className={styles.infoTextTitle}>Log In to see more</div>
        <p className={styles.infoTextDetails}>
          You need to log in to be able to create, vote, or view the details of
          a feature request
        </p>
        <Button variant="outlined" onClick={handleGoToLoginPage}>
          Log in
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default CannotMakeActionAsGuestModal;
