import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AiOutlineMail, AiFillBank } from "react-icons/ai";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { setEmail as setEmailRedux } from "../../redux/features/loggedUserSlice";
import { validateEmail } from "../../helpers/utils";
import styles from "./SettingsModal.module.scss";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

export const SettingsModal = (props: Props) => {
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const [email, setEmail] = useState(loggedUser?.user?.email);
  const [wrongFormatEmail, setWrongFormatEmail] = useState<boolean>(false);
  const [emailErrorHelperText, setEmailErrorHelperText] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChangeUserEmail = async () => {
    if (email) {
      if (validateEmail(email)) {
        console.log(email, " is validated");
        const updatedEmailResponse = await axios({
          method: "post",
          url: `${websiteUrl}/api/users/update-email`,
          data: {
            updatedEmail: email,
          },
          withCredentials: true,
        });
        if (updatedEmailResponse.data.updatedEmail) {
          if (email) {
            dispatch(setEmailRedux(email));
          }
          dispatch(
            setGeneralProperties({
              mainSnackBar: {
                isOpen: true,
                message: `Email successfully updated`,
              },
            })
          );
        }
      } else {
        setWrongFormatEmail(true);
        setEmailErrorHelperText("Wrong email format");

        setTimeout(() => {
          setWrongFormatEmail(false);
          setEmailErrorHelperText("");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (props.modalIsOpen) {
      setEmail(loggedUser?.user?.email);
    }
  }, [props.modalIsOpen]);

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
          <Box className={styles.modalContentContainer}>
            <div className={styles.settingSection}>
              <Card className={styles.settingIllustrationContainer}>
                <div className={styles.iconContainer}>
                  <AiOutlineMail />
                </div>
                <div className={styles.iconSubtext}>Email</div>
              </Card>
              <TextField
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={wrongFormatEmail}
                helperText={emailErrorHelperText}
              />
            </div>
            <div className={styles.settingSection}>
              <Card className={styles.settingIllustrationContainer}>
                <div className={styles.iconContainer}>
                  <AiFillBank />
                </div>
                <div className={styles.iconSubtext}>Company</div>
              </Card>
              <TextField
                disabled
                value="Apple"
              />
            </div>
            <Button
              className={styles.submitButton}
              onClick={handleChangeUserEmail}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
