import {
  Backdrop,
  Button,
  Fade,
  Modal,
  Paper,
  useMediaQuery,
} from "@mui/material";
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
  const bigscreen = useMediaQuery("(min-width: 40rem)");

  return (
    <ModalTemplate {...props}>
      <div className={styles.infoTextContainer}>
        <div className={styles.infoTextTitle}>Connecte-toi pour voir plus</div>
        <div className={styles.textDetailsWithImg}>
          {bigscreen && (
            <div className={styles.imgContainer}>
              <img alt="cannot do action img" src={logInImg} height="170px" />
            </div>
          )}
          <p className={styles.infoTextDetails}>
            Connecte-toi pour pouvoir créer, voter ou consulter les détails
            d'une idée
          </p>
        </div>

        <Button variant="contained" onClick={handleGoToLoginPage}>
          Se connecter
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default CannotMakeActionAsGuestModal;
